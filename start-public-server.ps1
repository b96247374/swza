# سكريبت تشغيل السيرفر للوصول من خارج الشبكة
# نظام التقارير اليومية

Write-Host "=== نظام التقارير اليومية - طريقة سهلة ===" -ForegroundColor Green
Write-Host "تشغيل السيرفر للوصول من الإنترنت (طريقة مُحسنة)..." -ForegroundColor Yellow

Write-Host ""
Write-Host "الطريقة الجديدة والأسهل:" -ForegroundColor Cyan
Write-Host "npm run public" -ForegroundColor White
Write-Host ""
Write-Host "هل تريد استخدام الطريقة الجديدة؟ (مُوصى بها)" -ForegroundColor Yellow
$useNew = Read-Host "(y/n)"

if ($useNew -eq "y" -or $useNew -eq "Y") {
    Write-Host "تشغيل الطريقة الجديدة..." -ForegroundColor Green
    npm run public
    exit 0
}

Write-Host "استكمال الطريقة القديمة..." -ForegroundColor Yellow

# التحقق من وجود ngrok
try {
    $ngrokVersion = ngrok version 2>$null
    if (-not $ngrokVersion) {
        throw "ngrok not found"
    }
} catch {
    Write-Host "ngrok غير مثبت. جارٍ التثبيت..." -ForegroundColor Yellow
    npm install -g ngrok
    if ($LASTEXITCODE -ne 0) {
        Write-Host "فشل في تثبيت ngrok. يرجى تثبيته يدوياً من: https://ngrok.com/" -ForegroundColor Red
        Read-Host "اضغط Enter للمتابعة..."
        exit 1
    }
}

Write-Host ""
Write-Host "تعليمات مهمة:" -ForegroundColor Red
Write-Host "1. هذا الوضع يجعل موقعك متاحاً على الإنترنت للجميع" -ForegroundColor Yellow
Write-Host "2. تأكد من أن البيانات الحساسة محمية" -ForegroundColor Yellow
Write-Host "3. لا تشارك الرابط مع أشخاص غير موثوقين" -ForegroundColor Yellow
Write-Host ""

$confirmation = Read-Host "هل تريد المتابعة؟ (y/n)"
if ($confirmation -ne "y" -and $confirmation -ne "Y" -and $confirmation -ne "yes") {
    Write-Host "تم إلغاء العملية." -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "بدء تشغيل السيرفر المحلي..." -ForegroundColor Cyan

# تشغيل الخادم المحلي في الخلفية
$serverJob = Start-Job -ScriptBlock {
    Set-Location "c:/نظام التقارير اليومية"
    npm run dev 2>&1
}

# انتظار بدء الخادم
Start-Sleep -Seconds 10

Write-Host "تشغيل ngrok..." -ForegroundColor Cyan

# تشغيل ngrok
$ngrokJob = Start-Job -ScriptBlock {
    ngrok http 3000 --log=stdout
}

# انتظار تشغيل ngrok
Start-Sleep -Seconds 5

try {
    # الحصول على رابط ngrok
    $ngrokApi = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -Method Get
    $publicUrl = $ngrokApi.tunnels[0].public_url
    
    if ($publicUrl) {
        Write-Host ""
        Write-Host "===== الموقع جاهز ومتاح على الإنترنت! =====" -ForegroundColor Green
        Write-Host ""
        Write-Host "الرابط العام: $publicUrl" -ForegroundColor White -BackgroundColor DarkGreen
        Write-Host ""
        Write-Host "يمكن الوصول للموقع من أي مكان في العالم باستخدام هذا الرابط" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "للإيقاف: اضغط Ctrl+C" -ForegroundColor Yellow
        Write-Host ""
        
        # نسخ الرابط للحافظة
        try {
            $publicUrl | Set-Clipboard
            Write-Host "تم نسخ الرابط للحافظة تلقائياً!" -ForegroundColor Green
        } catch {
            Write-Host "لم يتم نسخ الرابط للحافظة." -ForegroundColor Yellow
        }
    } else {
        Write-Host "لم يتم العثور على رابط ngrok. تحقق من التشغيل." -ForegroundColor Red
    }
} catch {
    Write-Host "خطأ في الحصول على رابط ngrok: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "تحقق من تشغيل ngrok يدوياً." -ForegroundColor Yellow
}

# انتظار إيقاف المستخدم
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host ""
    Write-Host "إيقاف الخوادم..." -ForegroundColor Yellow
    
    # إيقاف ngrok
    if ($ngrokJob) {
        Stop-Job -Job $ngrokJob -Force
        Remove-Job -Job $ngrokJob -Force
    }
    
    # إيقاف الخادم المحلي
    if ($serverJob) {
        Stop-Job -Job $serverJob -Force  
        Remove-Job -Job $serverJob -Force
    }
    
    Write-Host "تم إيقاف جميع الخوادم." -ForegroundColor Red
}