import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function addDocument(document) {
  await addDoc(collection(db, "documents"), document);
}

export async function getAllDocuments() {
  const snapshot = await getDocs(collection(db, "documents"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateDocument(documentId, data) {
  await updateDoc(doc(db, "documents", documentId), data);
}

export async function deleteDocument(documentId) {
  await deleteDoc(doc(db, "documents", documentId));
} 