import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function addDecision(decision) {
  await addDoc(collection(db, "decisions"), decision);
}

export async function getAllDecisions() {
  const snapshot = await getDocs(collection(db, "decisions"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateDecision(decisionId, data) {
  await updateDoc(doc(db, "decisions", decisionId), data);
}

export async function deleteDecision(decisionId) {
  await deleteDoc(doc(db, "decisions", decisionId));
} 