import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function addLeave(leave) {
  await addDoc(collection(db, "leaves"), leave);
}

export async function getAllLeaves() {
  const snapshot = await getDocs(collection(db, "leaves"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateLeave(leaveId, data) {
  await updateDoc(doc(db, "leaves", leaveId), data);
}

export async function deleteLeave(leaveId) {
  await deleteDoc(doc(db, "leaves", leaveId));
} 