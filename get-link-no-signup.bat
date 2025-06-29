@echo off
chcp 65001 >nul
color 0E

echo ===============================================
echo    🌍 رابط عام بدون تسجيل - Serveo
echo ===============================================
echo.

echo 📝 هذه الطريقة لا تحتاج تسجيل حساب
echo 🚀 ستحصل على رابط عام فوراً
echo.

echo ⚠️  ستحتاج إلى:
echo 1. تشغيل المشروع
echo 2. تشغيل serveo في نافذة أخرى
echo.

set /p confirm="هل تريد المتابعة؟ (y/n): "
if /i not "%confirm%"=="y" (
    echo تم إلغاء العملية.
    pause
    exit /b
)

echo.
echo 🚀 بدء تشغيل المشروع...
start "خادم المشروع" cmd /c "cd /d \"%~dp0\" && npm run dev"

echo.
echo انتظار 10 ثواني لبدء الخادم...
timeout /t 10 /nobreak

echo.
echo 🌐 إنشاء الرابط العام...
echo.
echo ابحث عن السطر الذي يحتوي على:
echo "Forwarding https://....serveo.net"
echo.

ssh -R 80:localhost:5173 serveo.net

echo.
echo تم إيقاف الخدمة
pause