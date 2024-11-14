// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGZFPiemXQsuL3_kgxC_CSSF9jRLnlDiU",
  authDomain: "loginemail-3f84f.firebaseapp.com",
  projectId: "loginemail-3f84f",
  storageBucket: "loginemail-3f84f.appspot.com",
  messagingSenderId: "990756600870",
  appId: "1:990756600870:web:056da9ff6b4e6a4f0dbae7",
  measurementId: "G-QQ6DDYTW41"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };

