import { spawn } from 'child_process';
import ngrok from 'ngrok';

console.log('🚀 تشغيل الموقع للوصول العام...');
console.log('انتظر قليلاً للحصول على الرابط...');
console.log('');

// تشغيل خادم Vite
const server = spawn('npm', ['run', 'dev'], {
  stdio: 'pipe',
  shell: true
});

let serverReady = false;

server.stdout.on('data', (data) => {
  const output = data.toString();
  
  // التحقق من جاهزية الخادم
  if (output.includes('Local:') && !serverReady) {
    serverReady = true;
    startNgrok();
  }
});

server.stderr.on('data', (data) => {
  console.error(`خطأ: ${data}`);
});

async function startNgrok() {
  try {
    console.log('🌐 إنشاء الرابط العام...');
    
    const url = await ngrok.connect({
      port: 5173,
      region: 'us'
    });

    console.log('');
    console.log('🎉 الموقع جاهز!');
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
    console.log('⚡ للإيقاف: اضغط Ctrl+C');
    console.log('');

    // نسخ الرابط للحافظة
    try {
      const { spawn } = require('child_process');
      const proc = spawn('clip', [], { stdio: 'pipe' });
      proc.stdin.write(url);
      proc.stdin.end();
      console.log('📋 تم نسخ الرابط للحافظة!');
    } catch (error) {
      console.log('');
    }

    // حفظ الرابط في ملف
    const fs = await import('fs');
    const linkInfo = `رابط الموقع العام: ${url}\nتم الإنشاء: ${new Date().toLocaleString('ar-SA')}\n`;
    fs.writeFileSync('public-link.txt', linkInfo, 'utf8');
    console.log('💾 تم حفظ الرابط في ملف: public-link.txt');
    console.log('');

  } catch (error) {
    console.error('❌ خطأ في إنشاء الرابط العام:', error.message);
    
    if (error.message.includes('authtoken')) {
      console.log('');
      console.log('🔑 تحتاج لإعداد ngrok:');
      console.log('1. اذهب إلى: https://ngrok.com/');
      console.log('2. أنشئ حساب مجاني');
      console.log('3. انسخ الـ authtoken');
      console.log('4. شغل: ngrok authtoken YOUR_TOKEN');
    }
  }
}

// التعامل مع إيقاف البرنامج
process.on('SIGINT', async () => {
  console.log('');
  console.log('🛑 إيقاف الخوادم...');
  
  try {
    await ngrok.kill();
  } catch (error) {
    // تجاهل الأخطاء
  }
  
  server.kill('SIGTERM');
  process.exit(0);
});