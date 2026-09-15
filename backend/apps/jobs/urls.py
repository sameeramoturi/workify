from django.urls import path
from .views import (
    JobPostListCreateView,
    JobPostDetailView,
    BookingListCreateView,
    UpdateBookingStatusView
)

urlpatterns = [
    path('posts/', JobPostListCreateView.as_view(), name='job_posts_list_create'),
    path('posts/<int:pk>/', JobPostDetailView.as_view(), name='job_posts_detail'),
    path('bookings/', BookingListCreateView.as_view(), name='bookings_list_create'),
    path('bookings/<int:pk>/status/', UpdateBookingStatusView.as_view(), name='booking_update_status'),
]
