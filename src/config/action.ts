import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
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
    const subCollection = (await getDocs(lists)).docs.map((item) => {
      return { id: item.id };
    });
    const merged = response.map((item, index) => ({
      id: subCollection[index].id,
      MovieId: item.MovieId,
      displayName: item.displayName,
      uid: item.uid,
      photoURL: item.photoURL,
      comment: item.comment,
      create_at: item.create_at,
      update_at: item.update_at,
    }));
    const data = merged.filter((item) => item.MovieId === MovieId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCommentTvShows = async (TvId: string) => {
  try {
    const lists = collection(db, "commentTvShows");
    const response = (await getDocs(lists)).docs.map((item) => item.data());
    const subCollection = (await getDocs(lists)).docs.map((item) => {
      return { id: item.id };
    });
    const merged = response.map((item, index) => ({
      id: subCollection[index].id,
      TvId: item.TvId,
      displayName: item.displayName,
      uid: item.uid,
      photoURL: item.photoURL,
      comment: item.comment,
      create_at: item.create_at,
      update_at: item.update_at,
    }));
    const data = merged.filter((item) => item.TvId === TvId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (
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

export const deleteComment = async (id: string) => {
  try {
    const docRef = doc(db, "comments", id);
    const response = await deleteDoc(docRef);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editComment = async (id: string, comment: any, update_at: any) => {
  try {
    const docRef = doc(db, "comments", id);
    const response = await updateDoc(docRef, {
      comment: comment,
      update_at: update_at,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addCommentTvShow = async (
  TvId: any,
  uid: any,
  displayName: string,
  photoURL: string,
  comment: string
) => {
  try {
    const data = {
      TvId: TvId,
      uid: uid,
      displayName: displayName,
      photoURL: photoURL,
      comment: comment,
      create_at: new Date().toLocaleString(),
    };
    const response = await addDoc(collection(db, "commentTvShows"), data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentTvShow = async (id: string) => {
  try {
    const docRef = doc(db, "commentTvShows", id);
    const response = await deleteDoc(docRef);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editCommentTvShow = async (
  id: string,
  comment: any,
  update_at: any
) => {
  try {
    const docRef = doc(db, "commentTvShows", id);

    const response = await updateDoc(docRef, {
      comment: comment,
      update_at: update_at,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
