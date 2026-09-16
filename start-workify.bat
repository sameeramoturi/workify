@echo off
REM ========================================================
REM       WORKIFY 1-CLICK LAUNCHER FOR WINDOWS
REM ========================================================
echo Starting Workify Backend & Frontend Servers...

cd /d "%~dp0"

REM 1. Start Backend in a new window
start "Workify Backend API (Port 8000)" cmd /k "cd backend && venv\Scripts\activate && python manage.py runserver 0.0.0.0:8000"

REM 2. Start Frontend in a new window
start "Workify Frontend UI (Port 3000)" cmd /k "cd frontend && npm run dev"

echo ========================================================
echo Both servers have been launched!
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000/api/
echo ========================================================
timeout /t 5
start http://localhost:3000
