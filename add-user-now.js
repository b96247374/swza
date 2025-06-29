// سكريبت سريع لإضافة مستخدم بعد تعديل قواعد Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

// بيانات المستخدم الجديد
const newUser = {
  name: 'أحمد محمد',
  rank: 'رقيب',
  username: 'ahmed',
  password: '123456',
  role: 'user',
  permissions: {
    canManageUsers: false,
    canSubmitReports: true,
    canReview: false,
    canDeleteReports: false,
    canManageLeaves: false,
    canViewLeaves: false,
    canRequestExcuse: true
  },
  createdAt: new Date().toISOString()
};

async function addUserNow() {
  console.log('🚀 محاولة إضافة مستخدم جديد...');
  console.log('📋 بيانات المستخدم:', newUser.name, `(${newUser.username})`);
  
  try {
    const docRef = await addDoc(collection(db, 'users'), newUser);
    
    console.log('\n✅ تم إضافة المستخدم بنجاح!');
    console.log('📝 تفاصيل المستخدم:');
    console.log(`   الاسم: ${newUser.name}`);
    console.log(`   الرتبة: ${newUser.rank}`);
    console.log(`   اسم المستخدم: ${newUser.username}`);
    console.log(`   كلمة المرور: ${newUser.password}`);
    console.log(`   الدور: ${newUser.role}`);
    console.log(`   ID: ${docRef.id}`);
    
    console.log('\n🎉 يمكنك الآن تسجيل الدخول بهذا المستخدم!');
    console.log('🌐 اذهب إلى النظام وجرب تسجيل الدخول');
    
  } catch (error) {
    console.error('\n❌ فشل في إضافة المستخدم:', error.message);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔧 المشكلة: قواعد Firestore لا تسمح بالكتابة');
      console.log('📖 الحل: اتبع الإرشادات في ملف FIX-FIRESTORE-RULES.md');
      console.log('1. اذهب إلى Firebase Console');
      console.log('2. عدّل قواعد Firestore');
      console.log('3. شغل السكريبت مرة أخرى');
    } else {
      console.log('\n🔍 مشكلة أخرى. تحقق من:');
      console.log('- اتصال الإنترنت');
      console.log('- إعدادات Firebase');
      console.log('- رسالة الخطأ الكاملة');
    }
  }
}

// تشغيل السكريبت
addUserNow(); 