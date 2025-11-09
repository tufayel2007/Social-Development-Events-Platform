// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUVnPwwQuy9c0xdJpLLHhPhe-w2P5tuLk",
  authDomain: "social-development-409d8.firebaseapp.com",
  projectId: "social-development-409d8",
  storageBucket: "social-development-409d8.firebasestorage.app",
  messagingSenderId: "410698669295",
  appId: "1:410698669295:web:38faff3a0e5e0cb2750f1a",
  measurementId: "G-7KY72JK5HX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // এটাই সব জায়গায় ব্যবহার করবো
export default { app, auth };
