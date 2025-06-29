@echo off
echo ========================================
echo تنظيف مشروع نظام التقارير اليومية
echo ========================================
echo.

echo 1. إيقاف جميع عمليات Node.js...
taskkill /f /im node.exe 2>nul
if %errorlevel% equ 0 (
    echo    ✓ تم إيقاف عمليات Node.js
) else (
    echo    - لا توجد عمليات Node.js نشطة
)

echo.
echo 2. حذف مجلد node_modules...
if exist node_modules (
    rmdir /s /q node_modules
    echo    ✓ تم حذف node_modules
) else (
    echo    - مجلد node_modules غير موجود
)

echo.
echo 3. حذف ملفات التبعيات...
if exist package-lock.json (
    del package-lock.json
    echo    ✓ تم حذف package-lock.json
)
if exist yarn.lock (
    del yarn.lock
    echo    ✓ تم حذف yarn.lock
)

echo.
echo 4. حذف مجلد dist...
if exist dist (
    rmdir /s /q dist
    echo    ✓ تم حذف مجلد dist
) else (
    echo    - مجلد dist غير موجود
)

echo.
echo 5. حذف ملفات Firebase...
if exist .firebase (
    rmdir /s /q .firebase
    echo    ✓ تم حذف ملفات Firebase المحلية
)
if exist firebase-debug.log (
    del firebase-debug.log
    echo    ✓ تم حذف سجل Firebase
)

echo.
echo ========================================
echo تم تنظيف المشروع المحلي بنجاح!
echo ========================================
echo.
echo ملاحظات مهمة:
echo - لم يتم حذف الكود المصدري
echo - لم يتم حذف ملفات الإعدادات
echo - لم يتم حذف مشروع Firebase من السحابة
echo.
echo لحذف مشروع Firebase من السحابة:
echo 1. اذهب إلى Firebase Console
echo 2. اتبع الإرشادات في DELETE-FIREBASE-PROJECT.md
echo.
pause 