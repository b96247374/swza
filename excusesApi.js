import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function addExcuse(excuse) {
  await addDoc(collection(db, "excuses"), excuse);
}

export async function getAllExcuses() {
  const snapshot = await getDocs(collection(db, "excuses"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateExcuse(excuseId, data) {
  await updateDoc(doc(db, "excuses", excuseId), data);
}

export async function deleteExcuse(excuseId) {
  await deleteDoc(doc(db, "excuses", excuseId));
} 