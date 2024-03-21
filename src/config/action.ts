import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
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

export const getComments = async (MovieId: string) => {
  try {
    const lists = collection(db, "comments");
    const response = (await getDocs(lists)).docs.map((item) => item.data());
    const data = response.filter((item) => item.MovieId === MovieId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (
  MovieId: any,
  uid: any,
  displayName: string,
  photoURL: string,
  comment: string
) => {
  try {
    const data = {
      MovieId: MovieId,
      uid: uid,
      displayName: displayName,
      photoURL: photoURL,
      comment: comment,
      create_at: new Date().toLocaleString(),
    };
    const response = await addDoc(collection(db, "comments"), data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
