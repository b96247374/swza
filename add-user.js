import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

async function addUser() {
  try {
    await addDoc(collection(db, "users"), {
      username: "1126754280",
      password: "1126754280",
      role: "user"
    });
    console.log("تمت إضافة المستخدم 1126754280 بنجاح");
  } catch (e) {
    console.error("خطأ أثناء إضافة المستخدم: ", e);
  }
}

addUser(); 