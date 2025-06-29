@echo off
chcp 65001 >nul
color 0A

echo ===============================================
echo            تثبيت متطلبات المشروع
echo ===============================================
echo.

echo التحقق من Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js غير مثبت
    echo يرجى تثبيت Node.js من: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✅ Node.js مثبت
    node --version
)

echo.
echo التحقق من npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm غير متاح
    pause
    exit /b 1
) else (
    echo ✅ npm متاح
    npm --version
)

echo.
echo تثبيت dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ فشل في تثبيت dependencies
    pause
    exit /b 1
) else (
    echo ✅ تم تثبيت dependencies بنجاح
)

echo.
echo تثبيت ngrok (للوصول العام)...
npm install -g ngrok

if %errorlevel% neq 0 (
    echo ⚠️  فشل في تثبيت ngrok
    echo يمكنك تثبيته لاحقاً من: https://ngrok.com/
) else (
    echo ✅ تم تثبيت ngrok بنجاح
)

echo.
echo ===============================================
echo          🎉 تم الانتهاء من التثبيت!
echo ===============================================
echo.
echo يمكنك الآن تشغيل المشروع باستخدام:
echo - start-server.bat (تشغيل محلي)
echo - start-public-easy.bat (تشغيل عام)
echo.
pause