from rest_framework import serializers
from .models import WorkerProfile, WorkerCategory, WorkExperience, WorkGalleryImage
from apps.authentication.serializers import UserSerializer

class WorkerCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkerCategory
        fields = '__all__'

class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = '__all__'

class WorkGalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkGalleryImage
        fields = '__all__'

class WorkerProfileListSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    avatar = serializers.ImageField(source='user.profile_picture', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = WorkerProfile
        fields = [
            'id', 'user_id', 'name', 'avatar', 'category_name',
            'headline', 'hourly_rate', 'is_price_negotiable',
            'experience_years', 'rating', 'review_count', 'skills',
            'city', 'state', 'latitude', 'longitude',
            'availability_status', 'verification_status', 'elo_rating'
        ]

class WorkerProfileDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    category = WorkerCategorySerializer(read_only=True)
    experiences = WorkExperienceSerializer(many=True, read_only=True)
    gallery_images = WorkGalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = WorkerProfile
        fields = '__all__'
