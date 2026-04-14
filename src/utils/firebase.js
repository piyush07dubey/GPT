import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDH8IHxWxrbd0NVpTYRWkKPMcuff4d4iC8",
  authDomain: "netflix-gpt-98d59.firebaseapp.com",
  projectId: "netflix-gpt-98d59",
  storageBucket: "netflix-gpt-98d59.firebasestorage.app",
  messagingSenderId: "628306011078",
  appId: "1:628306011078:web:bc162c44c22dfa84b588c7",
  measurementId: "G-8QECEW8HFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth=getAuth(app);