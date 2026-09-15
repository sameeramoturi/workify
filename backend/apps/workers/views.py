import requests
from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from .models import WorkerProfile, WorkerCategory
from .serializers import (
    WorkerProfileListSerializer,
    WorkerProfileDetailSerializer,
    WorkerCategorySerializer
)

class WorkerCategoryListView(generics.ListCreateAPIView):
    queryset = WorkerCategory.objects.all()
    serializer_class = WorkerCategorySerializer
    permission_classes = [permissions.AllowAny]

class WorkerListView(generics.ListAPIView):
    serializer_class = WorkerProfileListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = WorkerProfile.objects.all()
        category = self.request.query_params.get('category')
        city = self.request.query_params.get('city')
        status_param = self.request.query_params.get('status')
        min_rating = self.request.query_params.get('min_rating')
        max_rate = self.request.query_params.get('max_rate')

        if category:
            queryset = queryset.filter(category__name__iexact=category)
        if city:
            queryset = queryset.filter(city__iexact=city)
        if status_param:
            queryset = queryset.filter(availability_status=status_param.upper())
        if min_rating:
            queryset = queryset.filter(rating__gte=float(min_rating))
        if max_rate:
            queryset = queryset.filter(hourly_rate__lte=float(max_rate))

        return queryset

class WorkerDetailView(generics.RetrieveUpdateAPIView):
    queryset = WorkerProfile.objects.all()
    serializer_class = WorkerProfileDetailSerializer
    permission_classes = [permissions.AllowAny]

class ToggleAvailabilityView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            profile = request.user.worker_profile
        except WorkerProfile.DoesNotExist:
            return Response({"error": "Only workers can toggle availability"}, status=status.HTTP_403_FORBIDDEN)

        new_status = request.data.get("status")
        if new_status not in [choice[0] for choice in WorkerProfile.AvailabilityStatus.choices]:
            return Response({"error": "Invalid status. Must be AVAILABLE, BUSY, or OFFLINE"}, status=status.HTTP_400_BAD_REQUEST)

        profile.availability_status = new_status
        profile.save()
        return Response({
            "message": f"Status updated to {new_status}",
            "availability_status": profile.availability_status
        })

class RecommendWorkersView(APIView):
    """
    Calls the isolated ML Service (FastAPI) to filter workers by 10km radius
    and rank them using Elo rating + composite multi-factor scoring.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        customer_lat = request.data.get("latitude", 17.0005) # Default Rajahmundry
        customer_lon = request.data.get("longitude", 81.8040)
        category_name = request.data.get("category", "")
        required_skill = request.data.get("skill", "")

        # Fetch candidate workers from database
        workers_qs = WorkerProfile.objects.all()
        if category_name:
            workers_qs = workers_qs.filter(category__name__iexact=category_name)

        candidates = []
        for w in workers_qs:
            candidates.append({
                "id": w.id,
                "name": w.user.get_full_name() or w.user.username,
                "category": w.category.name if w.category else "General",
                "skills": w.skills,
                "latitude": w.latitude,
                "longitude": w.longitude,
                "rating": w.rating,
                "review_count": w.review_count,
                "experience_years": w.experience_years,
                "hourly_rate": float(w.hourly_rate),
                "elo_rating": w.elo_rating,
                "availability_status": w.availability_status,
                "is_verified": (w.verification_status == WorkerProfile.VerificationStatus.VERIFIED)
            })

        # Try contacting ML Service
        ml_url = f"{settings.ML_SERVICE_URL}/recommend"
        try:
            resp = requests.post(ml_url, json={
                "customer_latitude": customer_lat,
                "customer_longitude": customer_lon,
                "service_category": category_name,
                "required_skill": required_skill,
                "max_radius_km": 10.0,
                "candidate_workers": candidates
            }, timeout=3)

            if resp.status_code == 200:
                return Response(resp.json())
        except Exception:
            pass # Fallback to local response if ML service unreachable

        # Graceful fallback: return unranked candidates
        return Response({
            "count": len(candidates),
            "workers": candidates,
            "source": "fallback_local"
        })

class GenerateS3UploadUrlView(APIView):
    """
    AWS S3 Pre-signed URL Generator:
    Allows Frontend (React) to upload worker KYC identity documents,
    profile pictures, and gallery images directly to Amazon S3.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        file_name = request.data.get("file_name")
        file_type = request.data.get("file_type", "image/jpeg")
        is_kyc = request.data.get("is_kyc", False)

        if not file_name:
            return Response({"error": "file_name is required"}, status=status.HTTP_400_BAD_REQUEST)

        from core.aws_s3_utils import create_presigned_upload_url
        folder = "media/private/kyc" if is_kyc else "media/public"
        
        result = create_presigned_upload_url(file_name=file_name, file_type=file_type, folder=folder)
        return Response(result)
