// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0BxcI8YwOjx8An2axUG9UaTFxHk4KB0w",
  authDomain: "personal-website-9f744.firebaseapp.com",
  databaseURL: "https://personal-website-9f744-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "personal-website-9f744",
  storageBucket: "personal-website-9f744.appspot.com",
  messagingSenderId: "311221710863",
  appId: "1:311221710863:web:6ebcb133e44b399422f37a",
  measurementId: "G-33LZ4NXWGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

function register() {
    let email = document.getElementById("email-reg").value
    let pass = document.getElementById("pass-reg").value
    console.log(email)
    console.log(pass)
}

console.log("Hello")

document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById("signup-btn")
    signupBtn.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        let email = document.getElementById("email-reg").value
        let pass = document.getElementById("pass-reg").value
        console.log(email)
        console.log(pass)
    })
  });
