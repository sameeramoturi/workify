from django.db import models
from django.conf import settings
from apps.workers.models import WorkerProfile
from apps.jobs.models import Booking

class Review(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='review')
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='given_reviews')
    worker = models.ForeignKey(WorkerProfile, on_delete=models.CASCADE, related_name='received_reviews')
    
    # 1 - 5 star rating
    rating = models.PositiveSmallIntegerField(default=5)
    comment = models.TextField()

    # SES & CBS Scores for Elo engine (0.0 to 1.0)
    ses_score = models.FloatField(default=0.9, help_text="Servicer Effort Score (Customer to Worker)")
    cbs_score = models.FloatField(default=0.9, help_text="Customer Behaviour Score (Worker to Customer)")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.customer.username} for {self.worker.user.username} ({self.rating} stars)"
