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

    class JobType(models.TextChoices):
        ONE_TIME = 'ONE_TIME', 'One-time Task'
        RECURRING = 'RECURRING', 'Recurring / Subscription'

    class RecurrencePattern(models.TextChoices):
        NONE = 'NONE', 'None'
        DAILY = 'DAILY', 'Daily (7 Days/Week)'
        WEEKDAYS = 'WEEKDAYS', 'Weekdays (Mon-Fri)'
        ALTERNATE_DAYS = 'ALTERNATE_DAYS', 'Alternate Days'
        WEEKLY = 'WEEKLY', 'Weekly (1 Day/Week)'
        MONTHLY = 'MONTHLY', 'Monthly Contract'

    class BillingCycle(models.TextChoices):
        PER_VISIT = 'PER_VISIT', 'Per Visit / Daily'
        WEEKLY = 'WEEKLY', 'Weekly'
        MONTHLY = 'MONTHLY', 'Monthly Lump-sum'

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
    
    # Recurring / Subscription fields
    job_type = models.CharField(max_length=20, choices=JobType.choices, default=JobType.ONE_TIME)
    recurrence_pattern = models.CharField(max_length=20, choices=RecurrencePattern.choices, default=RecurrencePattern.NONE)
    end_date = models.DateField(null=True, blank=True, help_text="End date for recurring schedule/subscription")
    billing_cycle = models.CharField(max_length=20, choices=BillingCycle.choices, default=BillingCycle.PER_VISIT)

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
    
    # Recurrence & Subscription fields
    is_recurring = models.BooleanField(default=False)
    recurrence_pattern = models.CharField(max_length=50, blank=True, default='')
    end_date = models.DateField(null=True, blank=True, help_text="Subscription end date")
    billing_cycle = models.CharField(max_length=50, blank=True, default='')

    # Waiting-time prediction & lifecycle timestamps
    accepted_at = models.DateTimeField(null=True, blank=True, help_text="Timestamp when worker accepts the booking")
    started_at = models.DateTimeField(null=True, blank=True, help_text="Timestamp when service starts at doorstep")
    completed_at = models.DateTimeField(null=True, blank=True, help_text="Timestamp when service is marked completed")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        from django.utils import timezone
        now = timezone.now()
        if self.status == self.Status.ACCEPTED and not self.accepted_at:
            self.accepted_at = now
        elif self.status == self.Status.IN_PROGRESS and not self.started_at:
            self.started_at = now
        elif self.status == self.Status.COMPLETED and not self.completed_at:
            self.completed_at = now
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Booking #{self.id}: {self.customer.username} -> {self.worker.user.username} ({self.status})"
