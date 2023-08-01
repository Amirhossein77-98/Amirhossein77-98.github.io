import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0BxcI8YwOjx8An2axUG9UaTFxHk4KB0w",
  authDomain: "personal-website-9f744.firebaseapp.com",
  databaseURL: "https://personal-website-9f744-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "personal-website-9f744",
  storageBucket: "personal-website-9f744.appspot.com",
  messagingSenderId: "311221710863",
  appId: "1:311221710863:web:86ae837e0292369722f37a",
  measurementId: "G-T681TL06WT"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth()


const itemsSecEl = document.getElementById("right-panel")
const addBtnEl = document.getElementById("add")
const todayBtnEl = document.getElementById("today")
const shoppingBtnEl = document.getElementById("shop")
const ideasBtnEl = document.getElementById("ideas")


function leftPanelItemsIconChange() {
    addBtnEl.innerHTML = "<ion-icon name='add-circle-outline'></ion-icon>"
    addBtnEl.style.justifyContent = "center"

    todayBtnEl.innerHTML = "<ion-icon name='today-outline'></ion-icon>"
    todayBtnEl.style.justifyContent = "center"

    shoppingBtnEl.innerHTML = "<ion-icon name='cart-outline'></ion-icon>"
    shoppingBtnEl.style.justifyContent = "center"

    ideasBtnEl.innerHTML = "<ion-icon name='flash-outline'></ion-icon>"
    ideasBtnEl.style.justifyContent = "center"
}

if (window.innerWidth < 650) {
    leftPanelItemsIconChange()
}

window.addEventListener("resize", ()=> {
    if (window.innerWidth < 600) {
        leftPanelItemsIconChange()
    } else {
        addBtnEl.innerHTML = "<ion-icon name='add-circle-outline'></ion-icon>Add"
        addBtnEl.removeAttribute("style")

        todayBtnEl.innerHTML = "<ion-icon name='today-outline'></ion-icon>Today"
        todayBtnEl.removeAttribute("style")

        shoppingBtnEl.innerHTML = "<ion-icon name='cart-outline'></ion-icon>shopping List"
        shoppingBtnEl.removeAttribute("style")
        
        ideasBtnEl.innerHTML = "<ion-icon name='flash-outline'></ion-icon>Ideas"
        ideasBtnEl.removeAttribute("style")
    }
})

const menuBtn = document.getElementById("menu-btn")
const menuPopup = document.getElementById("menu")


menuPopup.style.display = "none";

// Add an event listener to the button
menuBtn.addEventListener("click", function () {
  // Toggle the popup display
  if (menuPopup.style.display === "none") {
    fetch("../../modules/signinup/signinup.html")
      .then(response => response.text())
      .then(html => {
    document.getElementById("menu").innerHTML = html
    document.querySelector("#signupModal").style.display = "none"
    document.querySelector("form").style.width = "78%"
    menuPopup.style.display = "flex";

    document.getElementById("signin-form").addEventListener("submit", (e) => {
      e.preventDefault()
      var email = document.getElementById("email-login").value
      var password = document.getElementById("password-login").value
      logIn(email, password)

    document.getElementById("signupq-btn").addEventListener("click", () => {
      document.querySelector("#loginModal").style.display = "none"
      document.querySelector("#signupModal").style.display = "flex"

      document.getElementById("signup-form").addEventListener("submit", (e) => {
        e.preventDefault()
        var email = document.getElementById("email-reg").value
        var password = document.getElementById("pass-reg").value
        signUp(email, password)
      })
      
      document.getElementById("signinq-btn").addEventListener("click", () => {
        document.querySelector("#loginModal").style.display = "flex"
        document.querySelector("#signupModal").style.display = "none"
        })
      })
    })
  })
    setTimeout(() => {
      document.addEventListener("click", (e) => {
        if(e.target.closest('#menu')) {
          e.stopPropagation();
          return;
        }
        menuPopup.style.display = "none";
      })
    }, 500)
  } else {
    menuPopup.style.display = "none";
  }
});

function logIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user
    alert(`User ${user.uid} logged in successfully`)
  })
  .catch((error) => {
    const errorCode = error.errorCode
    const errorMessage = error.errorMessage
    console.log(errorMessage)
  })
}

function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user
    alert(`User registered successfully`)
  })
  .catch((error) => {
    const errorCode = error.errorCode
    const errorMessage = error.errorMessage
    console.log(errorCode)
    console.log(errorMessage)
  })
}