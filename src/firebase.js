import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBym_p4uWFfqwVGdeq9AW7-Qs9BbRfNlc8",
  authDomain: "authentication-a2e5b.firebaseapp.com",
  projectId: "authentication-a2e5b",
  storageBucket: "authentication-a2e5b.appspot.com",
  messagingSenderId: "10636588503",
  appId: "1:10636588503:web:796fe87b39fe0d7e020792",
  measurementId: "G-LY97LMZ7BZ"
};  
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();  
export const db = getFirestore(app);
export const storage = getStorage(app);