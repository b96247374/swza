import { useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AddUserOnce() {
  useEffect(() => {
    async function addUserIfNotExists() {
      const q = query(collection(db, "users"), where("username", "==", "admin"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        await addDoc(collection(db, "users"), {
          username: "admin",
          password: "123456",
          role: "admin"
        });
        alert("تمت إضافة المستخدم admin بنجاح");
      }
    }
    addUserIfNotExists();
  }, []);
  return null;
} 