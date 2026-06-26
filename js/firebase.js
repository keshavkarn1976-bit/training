import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

// Initialize Authentication
const auth = getAuth(app);

// Export auth so other files can use it
export { auth };
