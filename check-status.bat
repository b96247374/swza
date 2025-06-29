@echo off
chcp 65001 >nul
color 0B

echo ===============================================
echo            فحص حالة المشروع
echo ===============================================
echo.

echo التحقق من المنفذ 5173...
netstat -ano | findstr :5173
if %errorlevel% == 0 (
    echo ✅ المشروع يعمل على المنفذ 5173
) else (
    echo ❌ المشروع لا يعمل على المنفذ 5173
)

echo.
echo التحقق من عمليات ngrok...
tasklist | findstr ngrok.exe
if %errorlevel% == 0 (
    echo ✅ ngrok يعمل
) else (
    echo ❌ ngrok لا يعمل
)

echo.
echo عنوان IP المحلي:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do echo %%a

echo.
echo الروابط المتاحة:
echo المحلي: http://localhost:5173
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do echo الشبكة: http://%%a:5173

echo.
pause