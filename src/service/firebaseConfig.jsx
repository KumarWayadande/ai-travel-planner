// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD97gUespwRrsJXEsizTDYSrH0ApFB8J_k",
  authDomain: "redux-dbdc0.firebaseapp.com",
  databaseURL: "https://redux-dbdc0-default-rtdb.firebaseio.com",
  projectId: "redux-dbdc0",
  storageBucket: "redux-dbdc0.firebasestorage.app",
  messagingSenderId: "866721506549",
  appId: "1:866721506549:web:0900995eaac11da6bc91bc",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
