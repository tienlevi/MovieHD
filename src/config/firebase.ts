// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb-B4NbIBoMaS5oDuMm0EacSuOgiXSAlc",
  authDomain: "moviehd-27efe.firebaseapp.com",
  projectId: "moviehd-27efe",
  storageBucket: "moviehd-27efe.appspot.com",
  messagingSenderId: "250894868259",
  appId: "1:250894868259:web:607e3221f0c9a89543b696",
  measurementId: "G-22BCVNYLQY",
};

// function userData(id: any, name: any, email: any, imageUrl: any) {
//   const db = getDatabase();
//   const reference = ref(db, "/profile/" + id);
//   set(reference, { username: name, email: email, imageUrl: imageUrl });
// }
// userData("", "tien", "nguyentreachtien2401@gmail.com", "1");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
