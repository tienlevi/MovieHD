import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export const getUser = async () => {
  try {
    const userRef = collection(db, "users");
    const response = await getDocs(userRef);
    const user = response.docs.map((item) => item.data());
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (user: any) => {
  try {
    const userRef = await addDoc(collection(db, "users"), user);
    return userRef;
  } catch (error) {
    console.log(error);
  }
};
