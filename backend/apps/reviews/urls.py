from django.urls import path
from .views import ReviewListCreateView

urlpatterns = [
    path('', ReviewListCreateView.as_view(), name='reviews_list_create'),
]
