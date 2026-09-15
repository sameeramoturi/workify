#!/usr/bin/env bash
# Workify Local Development Quickstart Script
set -e

echo "=== 1. Checking Environment File ==="
if [ ! -f "../../.env" ]; then
    echo "Creating .env from .env.example..."
    cp ../../.env.example ../../.env
fi

echo "=== 2. Building & Starting Containers with Docker Compose ==="
cd ../..
docker compose up -d --build

echo "=== 3. Waiting for Database to be Ready ==="
sleep 8

echo "=== 4. Running Migrations & Seeding Data ==="
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py seed_data

echo "=== 5. System Ready! ==="
echo "Frontend:  http://localhost:3000"
echo "Backend:   http://localhost:8000/api/"
echo "ML Docs:   http://localhost:5001/docs"
