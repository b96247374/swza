@echo off
chcp 65001 >nul
color 0A

echo ================================================
echo         نظام التقارير اليومية - الوصول العام
echo ================================================
echo.

echo تحذير مهم:
echo هذا الوضع يجعل موقعك متاحاً على الإنترنت للجميع
echo تأكد من أن البيانات الحساسة محمية
echo لا تشارك الرابط مع أشخاص غير موثوقين
echo.

set /p confirm="هل تريد المتابعة؟ (y/n): "
if /i not "%confirm%"=="y" (
    echo تم إلغاء العملية.
    pause
    exit /b
)

echo.
echo بدء تشغيل السيرفر...
echo.

echo تشغيل الخادم المحلي...
start /b npm run dev

echo انتظار 10 ثواني لبدء الخادم...
timeout /t 10 /nobreak >nul

echo تشغيل ngrok...
echo.
echo ملاحظة: سيتم فتح نافذة جديدة لـ ngrok
echo ابحث عن الرابط الذي يبدأ بـ https://...ngrok.io
echo.

start ngrok http 3000

echo.
echo الخوادم تعمل الآن!
echo للإيقاف: أغلق هذه النافذة ونافذة ngrok
echo.

pause