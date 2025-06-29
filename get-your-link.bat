@echo off
chcp 65001 >nul
color 0A

echo ===============================================
echo        🎉 إنشاء رابطك العام الآن!
echo ===============================================
echo.

echo 🚀 تشغيل المشروع على المنفذ 8080...
start "خادم المشروع" cmd /k "cd /d \"%~dp0\" && npm run dev"

echo.
echo ⏳ انتظار 15 ثانية لبدء الخادم...
timeout /t 15 /nobreak

echo.
echo 🌐 إنشاء الرابط العام باستخدام ngrok...
echo.
echo 👀 ابحث عن السطر الذي يحتوي على:
echo "Forwarding    https://xxxxxxxx.ngrok.io"
echo.
echo 🎯 هذا هو رابطك العام الذي يعمل من أي مكان!
echo.

ngrok http 8080

echo.
echo تم إيقاف الخدمة
pause