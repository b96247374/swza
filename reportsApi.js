import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function addReport(report) {
  await addDoc(collection(db, "reports"), report);
}

export async function getAllReports() {
  const snapshot = await getDocs(collection(db, "reports"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateReport(reportId, data) {
  await updateDoc(doc(db, "reports", reportId), data);
}

export async function deleteReport(reportId) {
  await deleteDoc(doc(db, "reports", reportId));
} 