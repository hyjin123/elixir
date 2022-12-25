// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS3ZiabQVv3IrWG4V4yVppeBktZg1d_vs",
  authDomain: "elixir-709ea.firebaseapp.com",
  projectId: "elixir-709ea",
  storageBucket: "elixir-709ea.appspot.com",
  messagingSenderId: "110020515444",
  appId: "1:110020515444:web:eb7038e370a968f888a321",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { auth, db };
