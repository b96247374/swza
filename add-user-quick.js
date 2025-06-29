// سكريبت سريع لإضافة مستخدم جديد
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

async function addUser() {
  try {
    console.log('جاري إضافة المستخدم...');
    const docRef = await addDoc(collection(db, 'users'), newUser);
    console.log('✅ تم إضافة المستخدم بنجاح!');
    console.log('ID:', docRef.id);
    console.log('اسم المستخدم:', newUser.username);
    console.log('كلمة المرور:', newUser.password);
    console.log('الدور:', newUser.role);
  } catch (error) {
    console.error('❌ خطأ في إضافة المستخدم:', error.message);
    console.error('كود الخطأ:', error.code);
    
    if (error.code === 'permission-denied') {
      console.log('💡 الحل: تأكد من قواعد Firestore في Firebase Console');
    }
  }
}

addUser(); 