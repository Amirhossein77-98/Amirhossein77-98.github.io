
// document.addEventListener('DOMContentLoaded', () => {
//     const signupBtn = document.getElementById("signup-btn")
//     signupBtn.addEventListener("click", (e) => {
//         e.preventDefault()
//         e.stopPropagation()
//         let email = document.getElementById("email-reg").value
//         let pass = document.getElementById("pass-reg").value
//         console.log(email)
//         console.log(pass)
//     })
//   });

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistance, browserLocalPersistance } from "firebase/auth"

const auth = getAuth()

document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault()
  var email = document.getElementById("email-reg").value
  var password = document.getElementById("pass-reg").value
  signUp(email, password)
})

setPersistance(auth, browserLocalPersistance)
  .then(() => {
    logIn(email, password)
  })
  .catch((error) => {
    const errorCode = error.errorCode
    const errorMessage = error.errorMessage
    console.log(errorMessage)
  })

  function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
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
    })
    .catch((error) => {
      const errorCode = error.errorCode
      const errorMessage = error.errorMessage
      console.log(errorMessage)
    })
  }