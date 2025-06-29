// سكريبت لإضافة عدة مستخدمين دفعة واحدة
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

// قائمة المستخدمين للإضافة
const usersToAdd = [
  {
    name: 'محمد أحمد',
    rank: 'عريف',
    username: 'mohamed',
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
    }
  },
  {
    name: 'علي حسن',
    rank: 'رقيب',
    username: 'ali',
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
    }
  },
  {
    name: 'أحمد علي',
    rank: 'عريف أول',
    username: 'ahmed2',
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
    }
  },
  {
    name: 'قائد النظام',
    rank: 'ملازم',
    username: 'commander',
    password: '123456',
    role: 'commander',
    permissions: {
      canManageUsers: true,
      canSubmitReports: true,
      canReview: true,
      canDeleteReports: true,
      canManageLeaves: true,
      canViewLeaves: true,
      canRequestExcuse: true
    }
  }
];

async function addUsersBatch() {
  console.log('🚀 بدء إضافة المستخدمين...');
  console.log(`📝 عدد المستخدمين للإضافة: ${usersToAdd.length}`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < usersToAdd.length; i++) {
    const user = usersToAdd[i];
    try {
      console.log(`\n📋 إضافة المستخدم ${i + 1}/${usersToAdd.length}: ${user.name}`);
      
      const userData = {
        ...user,
        createdAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, 'users'), userData);
      console.log(`✅ تم إضافة ${user.name} بنجاح! ID: ${docRef.id}`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ فشل في إضافة ${user.name}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\n📊 ملخص العملية:');
  console.log(`✅ تمت الإضافة بنجاح: ${successCount}`);
  console.log(`❌ فشلت الإضافة: ${errorCount}`);
  console.log(`📝 إجمالي المحاولات: ${usersToAdd.length}`);
  
  if (errorCount > 0) {
    console.log('\n💡 إذا فشلت الإضافة، تأكد من:');
    console.log('1. قواعد Firestore في Firebase Console');
    console.log('2. اتصال الإنترنت');
    console.log('3. إعدادات Firebase');
  }
}

addUsersBatch(); 