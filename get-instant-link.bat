@echo off
chcp 65001 >nul
color 0A

echo ===============================================
echo    ⚡ رابط فوري بدون تسجيل - LocalTunnel
echo ===============================================
echo.

echo 🚀 هذه الطريقة:
echo ✅ لا تحتاج تسجيل حساب
echo ✅ تعطيك رابط فوراً
echo ✅ يعمل من أي مكان في العالم
echo.

echo 📦 تثبيت localtunnel...
npm install -g localtunnel

if %errorlevel% neq 0 (
    echo ❌ فشل في تثبيت localtunnel
    echo جرب تشغيل هذا الملف كـ Administrator
    pause
    exit /b 1
)

echo.
echo ✅ تم تثبيت localtunnel بنجاح
echo.

echo 🚀 تشغيل المشروع...
start "خادم المشروع" cmd /k "cd /d \"%~dp0\" && npm run dev"

echo.
echo انتظار 15 ثانية لبدء الخادم...
timeout /t 15 /nobreak

echo.
echo 🌐 إنشاء الرابط العام...
echo ابحث عن السطر: "your url is: https://..."
echo هذا هو رابطك العام!
echo.

lt --port 5173

echo.
echo تم إيقاف الخدمة
pause