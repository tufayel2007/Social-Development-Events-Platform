// src/firebase/firebaseConfig.js  (ফোল্ডার নাম ছোট হাতের অক্ষরে রাখো)
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUVnPwwQuy9c0xdJpLLHhPhe-w2P5tuLk",
  authDomain: "social-development-409d8.firebaseapp.com",
  projectId: "social-development-409d8",
  storageBucket: "social-development-409d8.firebasestorage.app",
  messagingSenderId: "410698669295",
  appId: "1:410698669295:web:38faff3a0e5e0cb2750f1a",
  measurementId: "G-7KY72JK5HX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Named Exports (এগুলো দিয়ে সব জায়গায় ইম্পোর্ট করবো)
export { auth, onAuthStateChanged };

// Optional: Default export (যদি কেউ এভাবে ইম্পোর্ট করতে চায়)
export default { app, auth };
