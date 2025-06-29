import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function addLetter(letter) {
  await addDoc(collection(db, "appreciationLetters"), letter);
}

export async function getAllLetters() {
  const snapshot = await getDocs(collection(db, "appreciationLetters"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateLetter(letterId, data) {
  await updateDoc(doc(db, "appreciationLetters", letterId), data);
}

export async function deleteLetter(letterId) {
  await deleteDoc(doc(db, "appreciationLetters", letterId));
} 