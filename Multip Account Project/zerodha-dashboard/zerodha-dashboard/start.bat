@echo off
setlocal
title Zerodha Multi-Account Dashboard

echo ==========================================
echo  Zerodha Multi-Account Portfolio Dashboard
echo ==========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed.
  echo Please install it from https://nodejs.org and try again.
  pause
  exit /b 1
)

echo Opening dashboard in your browser...
start "" "%~dp0index.html"

echo.
echo Starting backend proxy on http://localhost:3001 ...
echo (Keep this window open while using the dashboard)
echo.
node "%~dp0proxy.js"
pause
