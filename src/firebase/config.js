// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9BZXVQUliYrsRBGxng8_38ey-7XSyF-0",
  authDomain: "react-clases-2026-2c.firebaseapp.com",
  projectId: "react-clases-2026-2c",
  storageBucket: "react-clases-2026-2c.firebasestorage.app",
  messagingSenderId: "845030042394",
  appId: "1:845030042394:web:d6d48368afd7e131eadaa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
