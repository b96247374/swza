import { spawn } from 'child_process';
import ngrok from 'ngrok';

console.log('🚀 إنشاء رابط عام للموقع...');
console.log('');

// تشغيل خادم Vite
console.log('📡 تشغيل الخادم المحلي...');
const server = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  detached: true
});

// انتظار بدء الخادم
console.log('⏳ انتظار 10 ثواني لبدء الخادم...');
await new Promise(resolve => setTimeout(resolve, 10000));

try {
  console.log('🌐 إنشاء الرابط العام باستخدام ngrok...');
  
  const url = await ngrok.connect({
    port: 8080,
    region: 'us'
  });

  console.log('');
  console.log('🎉 تم إنشاء الرابط بنجاح!');
  console.log('='.repeat(60));
  console.log('');
  console.log(`🌍 الرابط العام: ${url}`);
  console.log('');
  console.log('📱 يمكن استخدام هذا الرابط من:');
  console.log('• أي جوال في العالم');
  console.log('• أي كمبيوتر في العالم'); 
  console.log('• أي مكان متصل بالإنترنت');
  console.log('');
  console.log('🔒 الرابط آمن ومشفر (HTTPS)');
  console.log('');
  
  // حفظ الرابط في ملف
  const fs = await import('fs');
  const linkInfo = `🌍 رابط الموقع العام: ${url}\n📅 تم الإنشاء: ${new Date().toLocaleString('ar-SA')}\n📱 يعمل من أي مكان في العالم!\n`;
  fs.writeFileSync('PUBLIC-LINK.txt', linkInfo, 'utf8');
  console.log('💾 تم حفظ الرابط في ملف: PUBLIC-LINK.txt');
  console.log('');
  console.log('⚡ للإيقاف: اضغط Ctrl+C');
  
  // نسخ للحافظة (Windows)
  try {
    const proc = spawn('clip', [], { stdio: 'pipe' });
    proc.stdin.write(url);
    proc.stdin.end();
    console.log('📋 تم نسخ الرابط للحافظة!');
  } catch (error) {
    // تجاهل خطأ النسخ
  }

  // انتظار إيقاف يدوي
  process.stdin.resume();
  
} catch (error) {
  console.error('❌ خطأ في إنشاء الرابط:', error.message);
  process.exit(1);
}

// التعامل مع إيقاف البرنامج
process.on('SIGINT', async () => {
  console.log('');
  console.log('🛑 إيقاف الخوادم...');
  
  try {
    await ngrok.kill();
    console.log('✅ تم إيقاف ngrok');
  } catch (error) {
    console.log('⚠️ خطأ في إيقاف ngrok');
  }
  
  try {
    server.kill('SIGTERM');
    console.log('✅ تم إيقاف الخادم المحلي');
  } catch (error) {
    console.log('⚠️ خطأ في إيقاف الخادم');
  }
  
  console.log('👋 تم إيقاف جميع الخوادم');
  process.exit(0);
});