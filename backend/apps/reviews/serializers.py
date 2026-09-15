from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.get_full_name', read_only=True)
    customer_avatar = serializers.ImageField(source='customer.profile_picture', read_only=True)

    class Meta:
        model = Review
        fields = [
            'id', 'booking', 'customer', 'customer_name', 'customer_avatar',
            'worker', 'rating', 'comment', 'ses_score', 'cbs_score', 'created_at'
        ]
        read_only_fields = ['customer', 'created_at']
