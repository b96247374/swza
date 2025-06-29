@echo off
chcp 65001 >nul
color 0A

echo ===============================================
echo     🌍 تشغيل الموقع للوصول العام
echo ===============================================
echo.

echo ⚠️  سيتم فتح نافذتين:
echo 1. نافذة الخادم المحلي
echo 2. نافذة ngrok مع الرابط العام
echo.

echo 🚀 بدء التشغيل...
echo.

REM تشغيل الخادم المحلي في نافذة منفصلة
start "خادم المشروع" cmd /c "cd /d \"%~dp0\" && npm run dev"

echo انتظار 15 ثانية لبدء الخادم...
timeout /t 15 /nobreak

echo.
echo 🌐 تشغيل ngrok لإنشاء الرابط العام...
echo ابحث عن السطر الذي يحتوي على: https://....ngrok.io
echo هذا هو رابطك العام!
echo.

ngrok http 5173

echo.
echo تم إيقاف الخدمة
pause