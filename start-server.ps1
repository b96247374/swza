# سكريبت تشغيل السيرفر بشكل دائم
# نظام التقارير اليومية

Write-Host "=== نظام التقارير اليومية ===" -ForegroundColor Green
Write-Host "تشغيل السيرفر..." -ForegroundColor Yellow

# الحصول على عنوان IP المحلي
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi" | Where-Object {$_.IPAddress -like "192.168.*"}).IPAddress
if (-not $ipAddress) {
    $ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*" -or $_.IPAddress -like "172.*"}).IPAddress | Select-Object -First 1
}
if (-not $ipAddress) {
    $ipAddress = "localhost"
}

Write-Host ""
Write-Host "السيرفر سيعمل على العناوين التالية:" -ForegroundColor Cyan
Write-Host "للكمبيوتر: http://localhost:5173" -ForegroundColor White
Write-Host "للجوال: http://$ipAddress`:5173" -ForegroundColor White
Write-Host ""
Write-Host "تعليمات الاستخدام:" -ForegroundColor Yellow
Write-Host "1. تأكد من اتصال الجوال والكمبيوتر بنفس الشبكة" -ForegroundColor White
Write-Host "2. افتح المتصفح على الجوال واكتب العنوان أعلاه" -ForegroundColor White
Write-Host "3. يمكنك إضافة الموقع للشاشة الرئيسية كتطبيق" -ForegroundColor White
Write-Host ""

# تشغيل السيرفر
npm run dev

# في حالة إيقاف السيرفر
Write-Host ""
Write-Host "تم إيقاف السيرفر" -ForegroundColor Red
Write-Host "اضغط أي مفتاح للخروج..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")