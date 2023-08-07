import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
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
const db = getDatabase()

const itemsSecEl = document.getElementById("items-sec")
const doneItemsEl = document.getElementById("done-items")
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

const userBtn = document.getElementById("user-sec")
const loginRegisterPopup = document.getElementById("login-register-popup")
loginRegisterPopup.style.display = "none"

if (localStorage.getItem("userId")) {
  userBtn.innerText = `${localStorage.getItem("username")}'s Todo List`
}

// Add an event listener to the button
userBtn.addEventListener("click", function () {
  // Toggle the popup display
  if (loginRegisterPopup.style.display === "none") {
    if (localStorage.getItem("userId")) {
      loggedInUserSecStyling()
    } else {
      fetch("../../modules/signinup/signinup.html")
        .then(response => response.text())
        .then(html => {
          document.getElementById("login-register-popup").innerHTML = html
          document.querySelector("#signupModal").style.display = "none"
          document.querySelector("form").style.width = "78%"
          loginRegisterPopup.style.display = "flex"
      
          document.getElementById("signin-form").addEventListener("submit", (e) => {
            e.preventDefault()
            var email = document.getElementById("email-login").value
            var password = document.getElementById("password-login").value
            logIn(email, password)
          })
      
          document.getElementById("signupq-btn").addEventListener("click", () => {
            document.querySelector("#loginModal").style.display = "none"
            document.querySelector("#signupModal").style.display = "flex"
      
            document.getElementById("signup-form").addEventListener("submit", (e) => {
              e.preventDefault()
              var name = document.getElementById("name-reg").value
              var email = document.getElementById("email-reg").value
              var password = document.getElementById("pass-reg").value
              signUp(name, email, password)
            })
            
            document.getElementById("signinq-btn").addEventListener("click", () => {
              document.querySelector("#loginModal").style.display = "flex"
              document.querySelector("#signupModal").style.display = "none"
              })
            })
        })
        setTimeout(() => {
          document.addEventListener("click", (e) => {
            if(e.target.closest('#login-register-popup')) {
              e.stopPropagation();
              return;
            }
            loginRegisterPopup.style.display = "none"
          })
        }, 500)
    }} else {
    loginRegisterPopup.style.display = "none"
  }
})

function loggedInUserSecStyling() {
  loginRegisterPopup.style.display = "flex"
  loginRegisterPopup.style.width = "200px"
  loginRegisterPopup.style.height = "200px"
  loginRegisterPopup.style.left = "45.8%"
  userBtn.textContent = `${localStorage.getItem("username")}'s Todo List`
  loginRegisterPopup.innerHTML = `
  <div>Hello ${localStorage.getItem("username")}</div>
  <button id="logout-btn">Logout</button>`
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    location.reload()
  })
}

function logIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      localStorage.setItem("userId", user.uid)
      let userRef = ref(db, `users/${user.uid}`)
      return get(userRef)
    })
    .then((snapshot) => {
      const username = snapshot.val().username
      localStorage.setItem("username", username)
    })
    .then(() => {
      loggedInUserSecStyling()
    })
    .catch((error) => {
      console.log(error)
    })
}

function signUp(name, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user
    localStorage.setItem("userId", user.uid)
    set(ref(db, `users/${user.uid}`), {
      username: name
    })
    logIn(email, password)
  })
  .catch((error) => {
    console.log(error)
  })
}

const addPopup = document.getElementById("add-popup")
addPopup.style.display = "none"

addBtnEl.addEventListener("click", () => {
  if (addPopup.style.display === "none") {
    addPopup.style.display = "flex"
  } else {
    addPopup.style.display = "none"
  }
})

document.addEventListener("click", (e) => {
  if (!e.target.closest("#add-popup") && e.target !== addBtnEl) {
    addPopup.style.display = "none"
  }
})

const todayCheckbox = document.getElementById("today-checkbox")
const shoppingCheckbox = document.getElementById("shopping-checkbox")
const ideasCheckbox = document.getElementById("ideas-checkbox")

document.getElementById("add-form").addEventListener("submit", (e) => {
  e.preventDefault()
  const title = document.getElementById("todo-title-input").value
  const description = document.getElementById("todo-desc-input").value

  let tags = []

  if (todayCheckbox.checked) {
    tags.push("today")
  }
  if (shoppingCheckbox.checked) {
    tags.push("shopping")
  }
  if (ideasCheckbox.checked) {
    tags.push("ideas")
  }

  saveTodo(title, description, tags)
})

function saveTodo(title, desc, tags) {

  if (localStorage.getItem("userId")) {
    var userTodoRef = ref(db, `users/${localStorage.getItem("userId")}/todos/${title}`)
  }

  set(userTodoRef, {
    desc,
    tags,
    status: "undone"
  })

  getAndAppendTodosInHtml()
}

function getTodos() {

  const userTodosRef = ref(db, `users/${localStorage.getItem("userId")}/todos`)

  return get(userTodosRef).then(snapshot => {

    let todos = []

    snapshot.forEach(childSnapshot => {
      todos.push({
        id: childSnapshot.key,  
        ...childSnapshot.val()
      })
    })

    return todos

  })

}

function getAndAppendTodosInHtml() {
  getTodos().then(todos => {
  
    let undoneHtml = ''
    let doneHtml = ''
  
    todos.forEach(todo => {
      if (todo.status === "undone") {
        undoneHtml += `<span class="todo-item" id="${todo.id.replace(/\s/g, "-")}-hole" data-tags="${todo.tags}">
                  <label class="check-box">
                      <input type="checkbox" class="items-checkbox" id="${todo.id.replace(/\s/g, "%10")}">
                      <span></span>
                      ${todo.id}
                  </label>
                  ${todo.desc}
              </span>`
      } else {
        doneHtml += `<span class="todo-item" id="${todo.id.replace(/\s/g, "-")}-hole" data-tags="${todo.tags}">
                  <label class="check-box">
                      <input type="checkbox" class="items-checkbox" id="${todo.id.replace(/\s/g, "%10")}" checked>
                      <span></span>
                      ${todo.id}
                  </label>
                  ${todo.desc}
              </span>`
      }
    })
  
    itemsSecEl.innerHTML = undoneHtml
    doneItemsEl.innerHTML = doneHtml
  
    attachCheckListeners()
  
  })
}

getAndAppendTodosInHtml()

function attachCheckListeners() {
  const checkboxes = document.querySelectorAll('.items-checkbox')
  const doneItemsEl = document.getElementById('done-items')

  checkboxes.forEach(box => {
    box.addEventListener('change', (event) => {
      if (event.target.checked) {
        const userTodosRef = ref(db, `users/${localStorage.getItem("userId")}/todos/${box.id.replace(/%10/g, " ")}`)
        const todoItem = event.target.closest('.todo-item')
        doneItemsEl.appendChild(todoItem)
        event.target.checked = true
        
        update(userTodosRef, {
          status: "done"
        })
        attachCheckListeners()
      } else if (!event.target.checked) {
        const userTodosRef = ref(db, `users/${localStorage.getItem("userId")}/todos/${box.id.replace(/%10/g, " ")}`)
        const todoItem = event.target.closest('.todo-item')
        itemsSecEl.appendChild(todoItem)
        event.target.checked = false
        update(userTodosRef, {
          status: "undone"
        })
      }
    })
  })
}

const todayTag = document.getElementById("today")
const shoppingTag = document.getElementById("shop")
const ideasTag = document.getElementById("ideas")

function filterItems(tag, section) {

  const itemsArray = Array.from(section)

  const filteredItems = itemsArray.filter(item => {
    return item.dataset.tags.includes(tag)
  })

  return filteredItems

}

todayTag.addEventListener("click", () => {

  const tag = "today"
  
  // Get undone and done items arrays
  const undoneItems = Array.from(itemsSecEl.children)
  const doneItems = Array.from(doneItemsEl.children)

  // Filter both arrays
  const filteredUndone = filterItems(tag, undoneItems)
  const filteredDone = filterItems(tag, doneItems)

  // Clear and update DOM
  itemsSecEl.innerHTML = ""
  doneItemsEl.innerHTML = ""

  filteredUndone.forEach(item => itemsSecEl.appendChild(item))
  filteredDone.forEach(item => doneItemsEl.appendChild(item))
  
})


shoppingTag.addEventListener("click", () => {
  const tag = "shopping"
})

ideasTag.addEventListener("click", () => {
  const tag = "ideas"
})