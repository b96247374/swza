// سكريبت لاختبار الاتصال بـ Firestore وتشخيص مشكلة إضافة المستخدمين
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvYVlgiUyNJWDMe2lwrsrptY4YPemNGrw",
  authDomain: "daily-receiving-report-system.firebaseapp.com",
  projectId: "daily-receiving-report-system",
  storageBucket: "daily-receiving-report-system.firebasestorage.app",
  messagingSenderId: "874923227867",
  appId: "1:874923227867:web:a9a6bfedd863b0bf2aaafe",
  measurementId: "G-3MZC43FT7S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testFirestoreConnection() {
  console.log('🔍 بدء اختبار الاتصال بـ Firestore...\n');
  
  try {
    // اختبار 1: قراءة المستخدمين الحاليين
    console.log('📖 اختبار قراءة المستخدمين الحاليين...');
    const usersSnapshot = await getDocs(collection(db, 'users'));
    console.log(`✅ تم قراءة ${usersSnapshot.size} مستخدم بنجاح`);
    
    if (usersSnapshot.size > 0) {
      console.log('📋 المستخدمين الحاليين:');
      usersSnapshot.forEach((doc) => {
        const user = doc.data();
        console.log(`  - ${user.name} (${user.username}) - ${user.role}`);
      });
    }
    
    // اختبار 2: محاولة إضافة مستخدم تجريبي
    console.log('\n📝 اختبار إضافة مستخدم تجريبي...');
    const testUser = {
      name: 'مستخدم تجريبي',
      rank: 'عريف',
      username: 'test_' + Date.now(),
      password: '123456',
      role: 'user',
      permissions: {
        canSubmitReports: true,
        canRequestExcuse: true
      },
      createdAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, 'users'), testUser);
    console.log(`✅ تم إضافة المستخدم التجريبي بنجاح! ID: ${docRef.id}`);
    
    // اختبار 3: حذف المستخدم التجريبي
    console.log('\n🗑️ حذف المستخدم التجريبي...');
    await deleteDoc(doc(db, 'users', docRef.id));
    console.log('✅ تم حذف المستخدم التجريبي بنجاح');
    
    console.log('\n🎉 جميع الاختبارات نجحت! Firestore يعمل بشكل صحيح.');
    console.log('\n💡 إذا كانت إضافة المستخدمين لا تعمل في الواجهة، المشكلة في:');
    console.log('1. قواعد Firestore (تحقق من Firebase Console)');
    console.log('2. كود الواجهة (تحقق من Console المتصفح)');
    console.log('3. صلاحيات المستخدم الحالي');
    
  } catch (error) {
    console.error('\n❌ فشل في اختبار Firestore:', error);
    console.error('كود الخطأ:', error.code);
    console.error('رسالة الخطأ:', error.message);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔧 الحل: تعديل قواعد Firestore');
      console.log('1. اذهب إلى Firebase Console');
      console.log('2. اختر مشروعك: daily-receiving-report-system');
      console.log('3. اذهب إلى Firestore Database > Rules');
      console.log('4. استبدل القواعد بـ:');
      console.log(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
      `);
      console.log('5. اضغط Publish');
    } else if (error.code === 'unavailable') {
      console.log('\n🌐 الحل: تحقق من اتصال الإنترنت');
    } else {
      console.log('\n🔍 الحل: تحقق من إعدادات Firebase');
    }
  }
}

// تشغيل الاختبار
testFirestoreConnection(); 