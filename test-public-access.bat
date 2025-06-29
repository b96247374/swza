@echo off
chcp 65001 >nul
color 0E

echo ================================================
echo     اختبار الوصول العام للموقع
echo ================================================
echo.

echo 🌍 هذا الاختبار سيجعل الموقع متاحاً من أي مكان في العالم
echo.
echo ⚠️  تحذير أمني:
echo - الموقع سيكون متاحاً على الإنترنت للجميع
echo - تأكد من أن البيانات الحساسة محمية
echo - لا تشارك الرابط مع أشخاص غير موثوقين
echo.

set /p confirm="هل تريد المتابعة؟ (y/n): "
if /i not "%confirm%"=="y" (
    echo تم إلغاء العملية.
    pause
    exit /b
)

echo.
echo 🚀 بدء تشغيل الخادم العام...
echo.

start /b npm run dev

echo انتظار 10 ثواني لبدء الخادم المحلي...
timeout /t 10 /nobreak >nul

echo.
echo 🌐 تشغيل ngrok للوصول العام...
echo.

ngrok http 5173

echo.
echo تم إيقاف الخدمة
pause