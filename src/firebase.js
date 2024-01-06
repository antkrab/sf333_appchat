import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFZftyz1wFbmIJGemhG9dYCFs23neqLAc",
  authDomain: "chat-app-d2e83.firebaseapp.com",
  projectId: "chat-app-d2e83",
  storageBucket: "chat-app-d2e83.appspot.com",
  messagingSenderId: "762278921376",
  appId: "1:762278921376:web:89fae73a8225085bbdf5c5",
  measurementId: "G-46ZX7VQFQ6"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);