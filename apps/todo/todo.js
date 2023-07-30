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

    document.getElementById("signupq-btn").addEventListener("click", () => {
      document.querySelector("#loginModal").style.display = "none"
      document.querySelector("#signupModal").style.display = "flex"
      
      document.getElementById("signup-btn").addEventListener("click", (e) => {
          e.preventDefault()
          e.stopPropagation()
          let email = document.getElementById("email-reg").value
          let pass = document.getElementById("pass-reg").value
          console.log(email)
          console.log(pass)
      })
      
      document.getElementById("signinq-btn").addEventListener("click", () => {
        document.querySelector("#loginModal").style.display = "flex"
        document.querySelector("#signupModal").style.display = "none"
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