from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import JobPost, Booking
from .serializers import JobPostSerializer, BookingSerializer

class JobPostListCreateView(generics.ListCreateAPIView):
    serializer_class = JobPostSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = JobPost.objects.all().order_by('-created_at')
        category = self.request.query_params.get('category')
        city = self.request.query_params.get('city')
        if category:
            queryset = queryset.filter(category__iexact=category)
        if city:
            queryset = queryset.filter(city__iexact=city)
        return queryset

    def perform_create(self, serializer):
        # In real production, assign request.user if authenticated
        if self.request.user.is_authenticated:
            serializer.save(customer=self.request.user)
        else:
            # Fallback to first available user for dev/testing
            from apps.authentication.models import User
            user = User.objects.first()
            serializer.save(customer=user)

class JobPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobPost.objects.all()
    serializer_class = JobPostSerializer
    permission_classes = [permissions.AllowAny]

class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Booking.objects.all().order_by('-created_at')
        if self.request.user.is_authenticated:
            if self.request.user.role == 'WORKER' and hasattr(self.request.user, 'worker_profile'):
                queryset = queryset.filter(worker=self.request.user.worker_profile)
            else:
                queryset = queryset.filter(customer=self.request.user)
        return queryset

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(customer=self.request.user)
        else:
            from apps.authentication.models import User
            user = User.objects.first()
            serializer.save(customer=user)

class UpdateBookingStatusView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, pk):
        try:
            booking = Booking.objects.get(pk=pk)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get("status")
        if new_status not in [c[0] for c in Booking.Status.choices]:
            return Response({"error": f"Invalid status: {new_status}"}, status=status.HTTP_400_BAD_REQUEST)

        booking.status = new_status
        booking.save()
        return Response(BookingSerializer(booking).data)
