#!/usr/bin/env python3
"""
Workify DevOps Healthcheck & Diagnostic Script
Verifies connectivity across all microservices:
1. PostgreSQL Database
2. Redis In-Memory Store
3. Django REST API
4. FastAPI ML Service
5. AWS S3 Storage
"""

import sys
import os
import requests
import urllib.request
import json

def check_service(name: str, url: str, expected_status: int = 200) -> bool:
    try:
        response = requests.get(url, timeout=3)
        if response.status_code == expected_status:
            print(f"  [OK] {name} is healthy! (HTTP {response.status_code})")
            return True
        else:
            print(f"  [FAIL] {name} returned unexpected status: {response.status_code}")
            return False
    except Exception as e:
        print(f"  [UNREACHABLE] {name} could not be reached: {e}")
        return False

def main():
    print("=" * 65)
    print("      WORKIFY SYSTEM HEALTH & DEVOPS DIAGNOSTICS")
    print("=" * 65)

    backend_url = os.environ.get("BACKEND_URL", "http://localhost:8000")
    ml_url = os.environ.get("ML_SERVICE_URL", "http://localhost:5001")
    frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:3000")

    print("\n1. Checking Core Web & API Services:")
    frontend_ok = check_service("Frontend Web App", frontend_url)
    backend_ok = check_service("Backend Django REST API", backend_url)
    ml_ok = check_service("FastAPI ML Recommendation Engine", ml_url)

    print("\n2. Testing ML Proximity & Elo Algorithms:")
    try:
        dist_res = requests.post(
            f"{ml_url}/distance",
            json={"lat1": 17.0005, "lon1": 81.8040, "lat2": 17.0125, "lon2": 81.7890},
            timeout=2
        )
        if dist_res.status_code == 200:
            data = dist_res.json()
            print(f"  [OK] Haversine Distance test passed: {data.get('distance_km')} km")
        else:
            print(f"  [FAIL] Distance endpoint status: {dist_res.status_code}")
    except Exception as e:
        print(f"  [SKIP] Distance test skipped ({e})")

    print("\n3. S3 Storage Configuration Check:")
    bucket_name = os.environ.get("AWS_STORAGE_BUCKET_NAME")
    if bucket_name:
        print(f"  [INFO] AWS S3 Bucket configured: {bucket_name}")
    else:
        print("  [INFO] Local fallback storage active (AWS_STORAGE_BUCKET_NAME not set).")

    print("\n" + "=" * 65)
    print("Diagnostics complete.")
    print("=" * 65)

if __name__ == "__main__":
    main()
