from django.urls import path
from .views import (
    WorkerCategoryListView,
    WorkerListView,
    WorkerDetailView,
    ToggleAvailabilityView,
    RecommendWorkersView,
    GenerateS3UploadUrlView
)

urlpatterns = [
    path('categories/', WorkerCategoryListView.as_view(), name='worker_categories'),
    path('', WorkerListView.as_view(), name='worker_list'),
    path('<int:pk>/', WorkerDetailView.as_view(), name='worker_detail'),
    path('toggle-availability/', ToggleAvailabilityView.as_view(), name='toggle_availability'),
    path('recommend/', RecommendWorkersView.as_view(), name='recommend_workers'),
    path('s3-upload-url/', GenerateS3UploadUrlView.as_view(), name='s3_upload_url'),
]
