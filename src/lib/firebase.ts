import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwTqR9v4YlWv-OEyBhGIp69bXzh97c-co",
  authDomain:"grammitra-a60ec.firebaseapp.com",
  projectId:"grammitra-a60ec",
  storageBucket: "grammitra-a60ec.firebasestorage.app",
  messagingSenderId:"1017703922151",
  appId:"1:1017703922151:web:c30ae9ae4c6f897674e542",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

