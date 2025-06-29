@echo off
chcp 65001 >nul
color 0C

echo ===============================================
echo            إيقاف جميع خوادم المشروع
echo ===============================================
echo.

echo إيقاف العمليات على المنفذ 5173...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do (
    echo إيقاف العملية: %%a
    taskkill /F /PID %%a 2>nul
)

echo.
echo إيقاف العمليات على المنفذ 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo إيقاف العملية: %%a
    taskkill /F /PID %%a 2>nul
)

echo.
echo إيقاف عمليات ngrok...
taskkill /F /IM ngrok.exe 2>nul

echo.
echo إيقاف عمليات Node.js المتعلقة بالمشروع...
for /f "tokens=2" %%a in ('tasklist ^| findstr "node.exe"') do (
    taskkill /F /PID %%a 2>nul
)

echo.
echo تم إيقاف جميع العمليات!
echo يمكنك الآن تشغيل المشروع من جديد.
pause