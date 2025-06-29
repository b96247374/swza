#!/usr/bin/env node

import { spawn } from 'child_process';
import ngrok from 'ngrok';
import os from 'os';
import readline from 'readline';

console.log('🚀 نظام التقارير اليومية - الوصول العام');
console.log('=' .repeat(50));
console.log('');

console.log('⚠️  تحذير مهم:');
console.log('• هذا الوضع يجعل موقعك متاحاً على الإنترنت للجميع');
console.log('• تأكد من أن البيانات الحساسة محمية');
console.log('• لا تشارك الرابط مع أشخاص غير موثوقين');
console.log('');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('هل تريد المتابعة؟ (y/n): ', async (answer) => {
  if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
    console.log('❌ تم إلغاء العملية.');
    rl.close();
    process.exit(0);
  }

  rl.close();
  
  console.log('');
  console.log('🔄 بدء تشغيل الخادم المحلي...');
  
  // تشغيل خادم Vite
  const server = spawn('npm', ['run', 'dev'], {
    stdio: 'pipe',
    shell: true
  });

  let serverReady = false;
  
  server.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);
    
    // التحقق من جاهزية الخادم
    if (output.includes('Local:') && !serverReady) {
      serverReady = true;
      startNgrok();
    }
  });

  server.stderr.on('data', (data) => {
    console.error(`خطأ في الخادم: ${data}`);
  });

  server.on('close', (code) => {
    console.log(`🛑 تم إيقاف الخادم (كود: ${code})`);
    process.exit(code);
  });

  async function startNgrok() {
    try {
      console.log('');
      console.log('🌐 تشغيل ngrok...');
      
      // البحث عن المنفذ المستخدم
      const port = await findUsedPort();
      
      const url = await ngrok.connect({
        port: port,
        region: 'us' // يمكن تغييرها حسب الموقع الجغرافي
      });

      console.log('');
      console.log('🎉 الموقع جاهز ومتاح على الإنترنت!');
      console.log('=' .repeat(50));
      console.log('');
      console.log(`🌍 الرابط العام: ${url}`);
      console.log(`🏠 الرابط المحلي: http://localhost:${port}`);
      console.log('');
      console.log('📱 يمكن الوصول للموقع من أي مكان في العالم!');
      console.log('');
      console.log('⚡ للإيقاف: اضغط Ctrl+C');
      console.log('');

      // نسخ الرابط للحافظة (Windows فقط)
      if (os.platform() === 'win32') {
        try {
          const proc = spawn('clip', [], { stdio: 'pipe' });
          proc.stdin.write(url);
          proc.stdin.end();
          console.log('📋 تم نسخ الرابط للحافظة!');
        } catch (error) {
          console.log('⚠️  لم يتم نسخ الرابط للحافظة');
        }
      }

    } catch (error) {
      console.error('❌ خطأ في تشغيل ngrok:', error.message);
      
      if (error.message.includes('authtoken')) {
        console.log('');
        console.log('🔑 يبدو أنك تحتاج لإعداد ngrok:');
        console.log('1. اذهب إلى https://ngrok.com/');
        console.log('2. أنشئ حساب مجاني');
        console.log('3. انسخ الـ authtoken');
        console.log('4. شغل الأمر: ngrok authtoken YOUR_TOKEN');
      }
    }
  }

  async function findUsedPort() {
    // البحث عن المنفذ المستخدم من خلال إخراج الخادم
    return new Promise((resolve) => {
      server.stdout.on('data', (data) => {
        const output = data.toString();
        const portMatch = output.match(/localhost:(\d+)/);
        if (portMatch) {
          resolve(parseInt(portMatch[1]));
        }
      });
      
      // افتراضي في حال عدم العثور على المنفذ
      setTimeout(() => resolve(5173), 5000);
    });
  }

  // التعامل مع إيقاف البرنامج
  process.on('SIGINT', async () => {
    console.log('');
    console.log('🛑 إيقاف الخوادم...');
    
    try {
      await ngrok.kill();
    } catch (error) {
      console.log('⚠️  خطأ في إيقاف ngrok');
    }
    
    server.kill('SIGTERM');
    process.exit(0);
  });
});