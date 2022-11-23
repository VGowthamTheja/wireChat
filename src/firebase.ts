import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBv8oEIBP6tvCuWlIPRzfNI26YyQlbtFFU",
  authDomain: "mychat-d8878.firebaseapp.com",
  projectId: "mychat-d8878",
  storageBucket: "mychat-d8878.appspot.com",
  messagingSenderId: "144018301939",
  appId: "1:144018301939:web:edd678b06ede1589fae886",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()