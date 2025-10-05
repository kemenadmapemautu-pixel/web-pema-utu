@echo off
echo ========================================
echo Push Project ke GitHub
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git belum terinstall!
    echo Silakan download dan install Git dari: https://git-scm.com/download/win
    echo Setelah install, restart terminal dan jalankan script ini lagi.
    pause
    exit /b 1
)

echo [1/5] Initializing git repository...
git init

echo.
echo [2/5] Adding all files...
git add .

echo.
echo [3/5] Creating first commit...
git commit -m "Initial commit: PEMA UTU website"

echo.
echo [4/5] Adding remote repository...
git remote add origin https://github.com/khavibadrian26/web-interaktif-asyik-.git

echo.
echo [5/5] Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo SUCCESS! Project berhasil di-push ke GitHub
echo Repository: https://github.com/khavibadrian26/web-interaktif-asyik-
echo ========================================
pause
