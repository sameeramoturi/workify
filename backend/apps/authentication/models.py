from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    class Role(models.TextChoices):
        CUSTOMER = 'CUSTOMER', 'Customer'
        WORKER = 'WORKER', 'Worker'
        ADMIN = 'ADMIN', 'Admin'

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CUSTOMER)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    city = models.CharField(max_length=100, default="Rajahmundry")
    latitude = models.FloatField(blank=True, null=True, default=17.0005)
    longitude = models.FloatField(blank=True, null=True, default=81.8040)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    elo_rating = models.FloatField(default=1500.0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.email} ({self.role})"
