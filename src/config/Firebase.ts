import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAePz-dC8BK3bV6qyKe4S4nnkpTqD_a2q4",
  authDomain: "anime-web-app-28d2f.firebaseapp.com",
  projectId: "anime-web-app-28d2f",
  storageBucket: "anime-web-app-28d2f.firebasestorage.app",
  messagingSenderId: "588836988372",
  appId: "1:588836988372:web:ea7637d51ecd5ca9946241",
  measurementId: "G-2BQM8V66XP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()