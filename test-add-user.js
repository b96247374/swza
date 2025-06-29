// سكريبت لاختبار إضافة مستخدم جديد
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvYVlgiUyNJWDMe2lwrsrptY4YPemNGrw",
  authDomain: "daily-receiving-report-system.firebaseapp.com",
  projectId: "daily-receiving-report-system",
  storageBucket: "daily-receiving-report-system.firebasestorage.app",
  messagingSenderId: "874923227867",
  appId: "1:874923227867:web:a9a6bfedd863b0bf2aaafe",
  measurementId: "G-3MZC43FT7S"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testAddUser() {
  try {
    console.log('بدء اختبار إضافة مستخدم...');
    
    // بيانات المستخدم التجريبي
    const testUser = {
      name: 'مستخدم تجريبي',
      rank: 'عريف',
      username: 'testuser',
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

    // محاولة إضافة المستخدم
    const docRef = await addDoc(collection(db, 'users'), testUser);
    console.log('تم إضافة المستخدم بنجاح! ID:', docRef.id);
    
    // التحقق من وجود المستخدم
    const querySnapshot = await getDocs(collection(db, 'users'));
    console.log('عدد المستخدمين في قاعدة البيانات:', querySnapshot.size);
    
    querySnapshot.forEach((doc) => {
      console.log('مستخدم:', doc.id, '=>', doc.data());
    });
    
  } catch (error) {
    console.error('خطأ في إضافة المستخدم:', error);
    console.error('تفاصيل الخطأ:', error.message);
    console.error('كود الخطأ:', error.code);
  }
}

// تشغيل الاختبار
testAddUser(); 