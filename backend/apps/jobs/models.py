from django.db import models
from django.conf import settings
from apps.workers.models import WorkerProfile

class JobPost(models.Model):
    class Priority(models.TextChoices):
        LOW = 'LOW', 'Low'
        NORMAL = 'NORMAL', 'Normal'
        HIGH = 'HIGH', 'High'

    class Status(models.TextChoices):
        OPEN = 'OPEN', 'Open'
        ASSIGNED = 'ASSIGNED', 'Assigned'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        COMPLETED = 'COMPLETED', 'Completed'
        CANCELLED = 'CANCELLED', 'Cancelled'

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posted_jobs')
    category = models.CharField(max_length=100) # e.g. Plumber
    subcategory = models.CharField(max_length=100, blank=True) # e.g. Pipe Repair
    description = models.TextField()
    
    # Location
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100, default='Rajahmundry')
    latitude = models.FloatField(default=17.0005)
    longitude = models.FloatField(default=81.8040)
    
    # Schedule & Budget
    preferred_date = models.DateField()
    preferred_time = models.CharField(max_length=50, default='10:00 AM - 12:00 PM')
    budget_min = models.DecimalField(max_digits=10, decimal_places=2, default=500.00)
    budget_max = models.DecimalField(max_digits=10, decimal_places=2, default=800.00)
    
    priority = models.CharField(max_length=10, choices=Priority.choices, default=Priority.NORMAL)
    attachment = models.ImageField(upload_to='job_attachments/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.OPEN)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.category} ({self.subcategory}) - {self.city} by {self.customer.username}"

class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        ACCEPTED = 'ACCEPTED', 'Accepted'
        REJECTED = 'REJECTED', 'Rejected'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        COMPLETED = 'COMPLETED', 'Completed'
        CANCELLED = 'CANCELLED', 'Cancelled'

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='customer_bookings')
    worker = models.ForeignKey(WorkerProfile, on_delete=models.CASCADE, related_name='worker_bookings')
    job_post = models.ForeignKey(JobPost, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    
    service_title = models.CharField(max_length=200, default='General Service')
    scheduled_date = models.DateField()
    scheduled_time = models.CharField(max_length=50, default='10:00 AM - 12:00 PM')
    agreed_price = models.DecimalField(max_digits=10, decimal_places=2, default=500.00)
    notes = models.TextField(blank=True)
    
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Booking #{self.id}: {self.customer.username} -> {self.worker.user.username} ({self.status})"
