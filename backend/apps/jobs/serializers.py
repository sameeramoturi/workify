from rest_framework import serializers
from .models import JobPost, Booking
from apps.workers.serializers import WorkerProfileListSerializer
from apps.authentication.serializers import UserSerializer

class JobPostSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.get_full_name', read_only=True)

    class Meta:
        model = JobPost
        fields = '__all__'
        read_only_fields = ['customer', 'created_at', 'updated_at']

class BookingSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.get_full_name', read_only=True)
    worker_name = serializers.CharField(source='worker.user.get_full_name', read_only=True)
    worker_category = serializers.CharField(source='worker.category.name', read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['customer', 'created_at', 'updated_at']
