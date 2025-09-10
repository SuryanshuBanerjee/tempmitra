@echo off
echo Starting MITRA Mental Health Platform...
echo.

echo Starting Backend (Flask)...
start "MITRA Backend" cmd /k "cd backend && python app.py"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend (Next.js)...
start "MITRA Frontend" cmd /k "npm run dev"

echo.
echo Both services are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to continue...
pause > nul