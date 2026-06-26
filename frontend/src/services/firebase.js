import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6EunIJTllSycPeRoYWLDGKv6_nmFZ7qo",
  authDomain: "ideabridge-d5350.firebaseapp.com",
  projectId: "ideabridge-d5350",
  storageBucket: "ideabridge-d5350.firebasestorage.app",
  messagingSenderId: "652719410667",
  appId: "1:652719410667:web:0511aae4297e55215a5dae",
  measurementId: "G-PFGPV4FMXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { app, auth, googleProvider, githubProvider };