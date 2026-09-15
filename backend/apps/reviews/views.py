import requests
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.conf import settings
from django.db.models import Avg
from .models import Review
from .serializers import ReviewSerializer
from apps.workers.models import WorkerProfile

class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Review.objects.all().order_by('-created_at')
        worker_id = self.request.query_params.get('worker_id')
        if worker_id:
            queryset = queryset.filter(worker_id=worker_id)
        return queryset

    def perform_create(self, serializer):
        customer_user = self.request.user if self.request.user.is_authenticated else None
        if not customer_user:
            from apps.authentication.models import User
            customer_user = User.objects.first()

        review = serializer.save(customer=customer_user)

        # 1. Recalculate Worker's average rating & review count
        worker = review.worker
        reviews_for_worker = Review.objects.filter(worker=worker)
        avg_rating = reviews_for_worker.aggregate(Avg('rating'))['rating__avg'] or 5.0
        worker.rating = round(avg_rating, 1)
        worker.review_count = reviews_for_worker.count()

        # 2. Trigger Elo rating update via ML microservice
        try:
            ml_elo_url = f"{settings.ML_SERVICE_URL}/elo/update"
            elo_resp = requests.post(ml_elo_url, json={
                "worker_elo": worker.elo_rating,
                "customer_elo": customer_user.elo_rating if customer_user else 1500.0,
                "ses_score": review.ses_score,
                "cbs_score": review.cbs_score
            }, timeout=2)

            if elo_resp.status_code == 200:
                data = elo_resp.json()
                worker.elo_rating = data.get("new_worker_elo", worker.elo_rating)
                if customer_user:
                    customer_user.elo_rating = data.get("new_customer_elo", customer_user.elo_rating)
                    customer_user.save()
        except Exception:
            pass # Fallback: keep existing Elo if ML service is unreachable

        worker.save()
