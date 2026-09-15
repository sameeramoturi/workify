from django.db import models
from django.conf import settings

class WorkerCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    icon_name = models.CharField(max_length=50, default='Wrench')
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class WorkerProfile(models.Model):
    class AvailabilityStatus(models.TextChoices):
        AVAILABLE = 'AVAILABLE', 'Available'
        BUSY = 'BUSY', 'Busy'
        OFFLINE = 'OFFLINE', 'Offline'

    class VerificationStatus(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        VERIFIED = 'VERIFIED', 'Verified'
        REJECTED = 'REJECTED', 'Rejected'

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='worker_profile')
    category = models.ForeignKey(WorkerCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='workers')
    headline = models.CharField(max_length=255, default='Professional Service Provider')
    about_me = models.TextField(blank=True)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, default=500.00)
    is_price_negotiable = models.BooleanField(default=True)
    
    experience_years = models.PositiveIntegerField(default=1)
    education = models.CharField(max_length=255, blank=True, default='ITI / Diploma')
    languages = models.JSONField(default=list, blank=True) # ['English', 'Telugu', 'Hindi']
    skills = models.JSONField(default=list, blank=True) # ['Pipe Repair', 'Leak Fixing']
    
    # Geolocation (Default to Rajahmundry coordinates as seen in UI mockup)
    city = models.CharField(max_length=100, default='Rajahmundry')
    state = models.CharField(max_length=100, default='Andhra Pradesh')
    service_radius_km = models.FloatField(default=10.0)
    latitude = models.FloatField(default=17.0005)
    longitude = models.FloatField(default=81.8040)
    
    # Real-time Availability Toggle
    availability_status = models.CharField(
        max_length=20,
        choices=AvailabilityStatus.choices,
        default=AvailabilityStatus.AVAILABLE
    )
    available_days = models.JSONField(default=list, blank=True) # ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    working_hours = models.CharField(max_length=100, default='10:00 AM - 6:00 PM')
    
    # Ratings and Metrics
    rating = models.FloatField(default=4.5)
    review_count = models.PositiveIntegerField(default=0)
    elo_rating = models.FloatField(default=1500.0)
    verification_status = models.CharField(
        max_length=20,
        choices=VerificationStatus.choices,
        default=VerificationStatus.VERIFIED
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} - {self.category.name if self.category else 'Worker'}"

class WorkExperience(models.Model):
    worker = models.ForeignKey(WorkerProfile, on_delete=models.CASCADE, related_name='experiences')
    job_title = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200, blank=True)
    start_year = models.CharField(max_length=20)
    end_year = models.CharField(max_length=20, default='Present')
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"

class WorkGalleryImage(models.Model):
    worker = models.ForeignKey(WorkerProfile, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='worker_gallery/')
    caption = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Gallery image for {self.worker.user.username}"
