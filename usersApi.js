import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

// إضافة مستخدم
export async function addUser(user) {
  await addDoc(collection(db, "users"), user);
}

// جلب جميع المستخدمين
export async function getAllUsers() {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// تحديث مستخدم
export async function updateUser(userId, data) {
  await updateDoc(doc(db, "users", userId), data);
}

// حذف مستخدم
export async function deleteUser(userId) {
  await deleteDoc(doc(db, "users", userId));
} 