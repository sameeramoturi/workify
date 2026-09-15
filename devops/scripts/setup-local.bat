@echo off
REM Workify Windows Quickstart Script
echo ========================================================
echo         WORKIFY LOCAL DEVELOPMENT INITIALIZATION
echo ========================================================

cd /d "%~dp0..\.."

if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
)

echo Starting Docker Compose containers...
docker compose up -d --build

echo Waiting for database initialization (10 seconds)...
timeout /t 10 /nobreak >nul

echo Applying Database Migrations...
docker compose exec backend python manage.py migrate

echo Seeding initial workers and categories...
docker compose exec backend python manage.py seed_data

echo ========================================================
echo Workify stack is up and running!
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000/api/
echo ML Docs:  http://localhost:5001/docs
echo ========================================================
pause
