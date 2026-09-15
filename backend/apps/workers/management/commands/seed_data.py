from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.workers.models import WorkerCategory, WorkerProfile, WorkExperience
from apps.jobs.models import JobPost
import datetime

User = get_user_model()

class Command(BaseCommand):
    help = "Seed database with initial Workify categories, workers, and sample customers"

    def handle(self, *args, **options):
        self.stdout.write("Seeding Workify data...")

        # 1. Create Default Categories
        categories_data = [
            ("Plumber", "Wrench", "Plumbing, bathroom fittings, pipe repair, leak fixing"),
            ("Electrician", "Zap", "Wiring, switches, fuse, inverter repair"),
            ("Carpenter", "Hammer", "Furniture repair, wood work, polishing"),
            ("Painter", "Paintbrush", "Interior painting, exterior painting, wall design"),
            ("AC Technician", "Snowflake", "AC installation, repair, gas filling"),
            ("Cleaner", "Sparkles", "Deep house cleaning, bathroom cleaning"),
            ("Mechanic", "Settings", "Bike repair, car repair, engine service"),
        ]

        cat_objs = {}
        for name, icon, desc in categories_data:
            cat, _ = WorkerCategory.objects.get_or_create(
                name=name,
                defaults={"icon_name": icon, "description": desc}
            )
            cat_objs[name] = cat

        # 2. Create Sample Customer "Sameera"
        customer, _ = User.objects.get_or_create(
            email="sameera@example.com",
            defaults={
                "username": "sameera",
                "first_name": "Sameera",
                "last_name": "Rao",
                "role": User.Role.CUSTOMER,
                "city": "Rajahmundry",
                "phone_number": "+91 98765 00000",
                "latitude": 17.0005,
                "longitude": 81.8040,
                "elo_rating": 1520.0
            }
        )
        if not customer.has_usable_password():
            customer.set_password("password123")
            customer.save()

        # 3. Create Sample Workers from the Workify UI Mockups
        workers_data = [
            {
                "username": "ramesh_das",
                "email": "ramesh.das@gmail.com",
                "first_name": "Ramesh",
                "last_name": "Das",
                "category": "Plumber",
                "headline": "Experienced and certified plumber with 7 years of experience",
                "about_me": "I am a professional plumber with over 7 years of experience in all types of plumbing services including bathroom fittings, pipe repairs, water tank installation, leak fixing and more. Available for both residential and commercial projects.",
                "hourly_rate": 450.00,
                "rating": 4.8,
                "review_count": 124,
                "experience_years": 7,
                "education": "ITI (Plumbing), Government Industrial Training Institute, Rajahmundry",
                "languages": ["English", "Telugu", "Hindi"],
                "skills": ["Bathroom Plumbing", "Pipe Repair", "Leak Fixing", "Water Heater Installation", "Drain Cleaning", "Installation"],
                "lat": 17.0125,
                "lon": 81.7890,
                "elo": 1680.0,
            },
            {
                "username": "amit_verma",
                "email": "amit.verma@example.com",
                "first_name": "Amit",
                "last_name": "Verma",
                "category": "Electrician",
                "headline": "Licensed Electrician with expertise in residential wiring",
                "about_me": "Expert in household wiring, switchboard fixing, short circuit repair, and inverter setup.",
                "hourly_rate": 400.00,
                "rating": 4.7,
                "review_count": 98,
                "experience_years": 6,
                "education": "Diploma in Electrical Engineering",
                "languages": ["English", "Telugu", "Hindi"],
                "skills": ["Electrical Wiring", "AC Repair", "Switch Board", "Inverter Setup", "MCB Tripping"],
                "lat": 17.0250,
                "lon": 81.8100,
                "elo": 1610.0,
            },
            {
                "username": "suresh_yadav",
                "email": "suresh.yadav@example.com",
                "first_name": "Suresh",
                "last_name": "Yadav",
                "category": "Carpenter",
                "headline": "Master Craftsman & Custom Wood Furniture Maker",
                "about_me": "Specialized in furniture assembly, door hinge repair, polishing, and custom wooden cabinetry.",
                "hourly_rate": 380.00,
                "rating": 4.6,
                "review_count": 76,
                "experience_years": 7,
                "education": "Vocational Carpentry Certification",
                "languages": ["Telugu", "Hindi"],
                "skills": ["Wood Work", "Furniture Repair", "Polishing", "Door Locks", "Cabinet Making"],
                "lat": 17.0350,
                "lon": 81.7950,
                "elo": 1590.0,
            },
            {
                "username": "pankaj_mehta",
                "email": "pankaj.mehta@example.com",
                "first_name": "Pankaj",
                "last_name": "Mehta",
                "category": "Painter",
                "headline": "Interior & Exterior Wall Decorator",
                "about_me": "Waterproof wall priming, texture painting, stencil designs, and clean finish guaranteed.",
                "hourly_rate": 350.00,
                "rating": 4.5,
                "review_count": 64,
                "experience_years": 5,
                "education": "ITI Trade Apprentice",
                "languages": ["Telugu", "Hindi"],
                "skills": ["Interior Painting", "Exterior Painting", "Wall Design", "Waterproofing", "Texture"],
                "lat": 16.9850,
                "lon": 81.8200,
                "elo": 1540.0,
            },
            {
                "username": "vikas_sharma",
                "email": "vikas.sharma@example.com",
                "first_name": "Vikas",
                "last_name": "Sharma",
                "category": "AC Technician",
                "headline": "Certified HVAC & Split/Window AC Specialist",
                "about_me": "AC installation, cooling coil cleaning, compressor gas charging, and seasonal servicing.",
                "hourly_rate": 420.00,
                "rating": 4.7,
                "review_count": 88,
                "experience_years": 6,
                "education": "Refrigeration & AC Certification",
                "languages": ["English", "Telugu", "Hindi"],
                "skills": ["AC Installation", "AC Repair", "Gas Filling", "Cooling Coil Service"],
                "lat": 16.9920,
                "lon": 81.8350,
                "elo": 1625.0,
            },
            {
                "username": "mahesh_kumar",
                "email": "mahesh.kumar@example.com",
                "first_name": "Mahesh",
                "last_name": "Kumar",
                "category": "Mechanic",
                "headline": "Automotive Technician for 2-Wheelers & 4-Wheelers",
                "about_me": "On-demand roadside assistance, engine tuning, brake overhaul, and periodic maintenance.",
                "hourly_rate": 400.00,
                "rating": 4.4,
                "review_count": 52,
                "experience_years": 5,
                "education": "Automobile Engineering Diploma",
                "languages": ["Telugu", "Hindi"],
                "skills": ["Bike Repair", "Car Repair", "Engine Service", "Brake Overhaul", "Battery Jump"],
                "lat": 17.0420,
                "lon": 81.7750,
                "elo": 1510.0,
            }
        ]

        for w_data in workers_data:
            user, _ = User.objects.get_or_create(
                email=w_data["email"],
                defaults={
                    "username": w_data["username"],
                    "first_name": w_data["first_name"],
                    "last_name": w_data["last_name"],
                    "role": User.Role.WORKER,
                    "city": "Rajahmundry",
                    "latitude": w_data["lat"],
                    "longitude": w_data["lon"],
                    "elo_rating": w_data["elo"]
                }
            )
            if not user.has_usable_password():
                user.set_password("password123")
                user.save()

            profile, _ = WorkerProfile.objects.get_or_create(
                user=user,
                defaults={
                    "category": cat_objs.get(w_data["category"]),
                    "headline": w_data["headline"],
                    "about_me": w_data["about_me"],
                    "hourly_rate": w_data["hourly_rate"],
                    "rating": w_data["rating"],
                    "review_count": w_data["review_count"],
                    "experience_years": w_data["experience_years"],
                    "education": w_data["education"],
                    "languages": w_data["languages"],
                    "skills": w_data["skills"],
                    "latitude": w_data["lat"],
                    "longitude": w_data["lon"],
                    "elo_rating": w_data["elo"],
                    "availability_status": WorkerProfile.AvailabilityStatus.AVAILABLE,
                    "verification_status": WorkerProfile.VerificationStatus.VERIFIED
                }
            )

        self.stdout.write(self.style.SUCCESS("Successfully seeded Workify database!"))
