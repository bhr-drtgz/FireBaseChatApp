// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmXXEBunAMoJX38TRzaTu4PMa2UwvIp6Q",
    authDomain: "chatroombahri.firebaseapp.com",
    projectId: "chatroombahri",
    storageBucket: "chatroombahri.appspot.com",
    messagingSenderId: "806926116368",
    appId: "1:806926116368:web:d14a31b3f9b3c7252b8c95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);