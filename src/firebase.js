// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_KEY,
  authDomain: "todolist-2db9d.firebaseapp.com",
  projectId: "todolist-2db9d",
  storageBucket: "todolist-2db9d.appspot.com",
  messagingSenderId: "1012630592647",
  appId: "1:1012630592647:web:0af1112cfc4424b067ec22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)