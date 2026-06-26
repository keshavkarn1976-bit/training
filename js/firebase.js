// Import Firebase modules directly from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjklUxCpV17OajmV3UnAHqoVsNU9Q9-EM",
  authDomain: "github-training-portal.firebaseapp.com",
  projectId: "github-training-portal",
  storageBucket: "github-training-portal.firebasestorage.app",
  messagingSenderId: "1094939591410",
  appId: "1:1094939591410:web:1b9139420d5c9b6562466b",
  measurementId: "G-BQ4S0B91LN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Make auth available globally
window.auth = auth;

console.log("✅ Firebase initialized successfully");
