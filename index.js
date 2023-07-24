import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://personal-website-9f744-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const workSamplesInDB = ref(database, "work-samples")
const skillsInDB = ref(database, "skills")
const certificatesInDB = ref(database, "Certificates")
let cityLoc = localStorage.getItem("location")
document.getElementById("loc").textContent = `${cityLoc}`


// Variables
const now = new Date()
const minutesFromBeginningOfDay = now.getMinutes() + now.getHours() * 60
const cardSecEl = document.getElementById("cards-sec")
const skillsSecEl = document.querySelector(".skills")
const weatherBtnEl = document.querySelector("#weather-btn")
const hamburgerBtnEl = document.querySelector("#hamburger-btn")
const slashEl = document.getElementById("slash")
const eastereggEl = document.getElementById("easteregg")
const eastereggBtn = document.getElementById("easteregg-btn")
const greatLessEl = document.querySelectorAll(".greatLessSymbols")
const certificatesSecEl = document.getElementById("certificates-sec")

// Functions
function getWeatherData() {
  // Fetch and display Weather info based on the user's ip location
  fetch("https://ipinfo.io/json?token=d17fe0b7b78f1e")
  .then(response => response.json()) 
  .then(data => {

    // Get city name from IP data
    const city = data.city
    cityLoc = city
    document.getElementById("loc").textContent = `${cityLoc}`

    // Create Open Weather URL based on the city name
    const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=88eec158e75ca5e56926713d90f24003`
    
    // Fetch weather data
    fetch(openWeatherURL)
      .then(response => response.json())
      .then(data => {
    
        // Get current tempreture and icon
        const temp = data.main.temp
        const icon = data.weather[0].icon

        localStorage.setItem("temp", temp)
        localStorage.setItem("weather-icon", icon)
        localStorage.setItem("lastUpdate", minutesFromBeginningOfDay)
        localStorage.setItem("location", city)
    
        // Display data
        document.getElementById("weather-icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" />`
        document.getElementById("temp").textContent = Math.floor(temp) + " ℃"
    
      })
      .catch(error => console.error(error))
  })
}

function displayWeatherData() {
  document.getElementById("weather-icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${localStorage.getItem("weather-icon")}.png" />`
  document.getElementById("temp").textContent = Math.floor(Number(localStorage.getItem("temp"))) + " ℃"
}

function timeUpdate() {
  let currentTime = new Date()
  let hour = currentTime.getHours()
  let minute = currentTime.getMinutes()
  let day = currentTime.getDate()
  let month = currentTime.getMonth()
  let year = currentTime.getFullYear()

  if (hour < 10) {
    hour = "0" + hour
  }
  if (minute < 10) {
    minute = "0" + minute
  }

  document.getElementById("time").textContent = `${hour}:${minute}`
  document.getElementById("date").textContent = `${day}/${month}/${year}`
  
  let timeout = (60 - now.getSeconds()) * 1000
  setTimeout(timeUpdate, timeout)
}

function isInView(element) {
  const position = element.getBoundingClientRect().top
  return position <= window.innerHeight
}

function checkReveals() {
  const reveals = document.querySelectorAll(".reveal")
  for (let i = 0; i < reveals.length; i++) {
    const element = reveals[i]
    if (isInView(element)) {
      element.classList.add("active")
    } else {
      element.classList.remove("active")
    }
  }
}

function checkBars() {
  const bars = document.querySelectorAll(".bar")
  for (let i = 0; i < bars.length; i++) {
    const element = bars[i]
    if (isInView(element)) {
      element.classList.add("active")
    } else {
      element.classList.remove("active")
    }
  }
}

function addSkillsToTheList(details) {
  const id = details[0].replace(/\s/g, "-")
  // Append the new element to the skills section
  skillsSecEl.innerHTML += `<div class="skill">
                              <h3>${details[0]}</h3>
                              <div class="barBg"><div id="${id}-bar" class="bar"></div></div>
                              <span class="percent" id="${id}" data-value="${details[1]}">0</span>
                            </div>`
}

// Create an intersection observer
const observer = new IntersectionObserver((entries) => {
  // Loop through the entries
  for (const entry of entries) {
    // Check if the element is intersecting with the viewport
    if (entry.isIntersecting) {
      // Start the animation
      animateNumber(entry.target)
    }
  }
})


let skillsArrayForAnimate = []

// Define a callback function that takes an array as an argument
function logSkills(array) {
  for (let i = 0; i < array.length; i++) {
    const id = array[i][0].replace(/\s/g, "-")
    const obj = document.querySelector(`#${id}`)
    const barObj = document.querySelector(`#${id}-bar`)
    barObj.style.maxWidth = `${array[i][1]}%`
    observer.observe(obj)
  }
}

// const percent = skillsSecEl.querySelector(`#${id}`)

// Define a function that animates the number
function animateNumber(element) {
  // Get the current value of the element
  let currentValue = parseInt(element.textContent)

  // Get the ending value from the data-value attribute
  let endValue = parseInt(element.dataset.value)

  // Check if the animation is done
  if (currentValue === endValue) {
    // Cancel the animation
    return
  }

  // Increment the value by one
  currentValue++

  // Update the element's text
  element.textContent = currentValue + "%"

  // Request another animation frame
  requestAnimationFrame(() => animateNumber(element))
}

function placeDetailsInCard(details) {
  cardSecEl.innerHTML += `<div id="card">
                              <img src="${details[2][1]}">
                              <h3>${details[0][1]}</h3>
                              <p>${details[1][1]}</p>
                            </div>`
}

function placeCertificatesInCards(details) {
  certificatesSecEl.innerHTML += `<div id="card">
                                    <img src="${details[0][1]}">
                                    <h3>${details[1][1]}</h3>
                                  </div>`
}

function scrollabilityForCardsInPCScreens(elementsArray) {
  let isDown = false
  let startX
  let scrollLeft
  
  for (let i = 0; i < elementsArray.length; i++) {
    elementsArray[i].addEventListener("mousedown", (e) => { 
      isDown = true
      startX = e.pageX - elementsArray[i].offsetLeft
      scrollLeft = elementsArray[i].scrollLeft
    })
    elementsArray[i].addEventListener("mouseleave", () => {
      isDown = false
    })
    elementsArray[i].addEventListener("mouseup", () => {
      isDown = false
    })
    elementsArray[i].addEventListener("mousemove", (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - elementsArray[i].offsetLeft
      const walk = (x - startX) * 3
      elementsArray[i].scrollLeft = scrollLeft - walk
    })
  }
}

// Getting ip location and weather data
if (localStorage.getItem("temp") != null) {
  if (minutesFromBeginningOfDay - Number(localStorage.getItem("lastUpdate")) > 60) {
    getWeatherData()
  } else if (minutesFromBeginningOfDay - Number(localStorage.getItem("lastUpdate")) <= 60) {
    displayWeatherData()
  }
} else {
  getWeatherData()
}

let weatherExpanded  = false
let hamburgerExpanded = false

// Weather Button Handlers
weatherBtnEl.addEventListener("touchstart", (e) => {

  if(!weatherExpanded) {
    // Expand weather button
    document.querySelector("#hamburger-menu").style.display = "none"
    weatherBtnEl.classList.add("tapped")
    weatherBtnEl.style.width = (window.innerWidth - 20) + "px"
    weatherExpanded = true

  } else {
    // Shrink weather button 
    e.preventDefault()
    e.stopPropagation()
    document.querySelector("#hamburger-menu").removeAttribute("style")
    weatherBtnEl.classList.remove("tapped")
    weatherBtnEl.removeAttribute("style")
    weatherExpanded = false
  }

})

weatherBtnEl.addEventListener("touchend", (e) => {
  e.preventDefault()
})

hamburgerBtnEl.addEventListener("touchstart", (e) => {
  // Check if the target element is an <a> tag
  if (e.target.tagName === "A" && e.target.id !== "shrinker") {
    // Allow the default behavior and propagation
    return
  }

  if(!hamburgerExpanded) {
    // Expand hamburger button
    document.querySelector("#weather-time-sec").style.display = "none"
    hamburgerBtnEl.classList.add("tapped")
    hamburgerBtnEl.style.width = (window.innerWidth - 50) + "px"
    document.querySelector("#header").style.justifyContent = "end"
    // document.querySelector(".menu-items").style.display = "flex"
    hamburgerExpanded = true
  } else {
    // Shrink hamburger button
    e.preventDefault()
    e.stopPropagation()
    document.querySelector("#weather-time-sec").removeAttribute("style")
    hamburgerBtnEl.classList.remove("tapped")
    hamburgerBtnEl.removeAttribute("style")
    setTimeout(() => {
      document.querySelector("#header").removeAttribute("style")
    }, 250)
    hamburgerExpanded = false
  }
})

let easterRevealed = false

eastereggEl.addEventListener("click", () => {
  if (!easterRevealed) {
    slashEl.style.display = "none"
    eastereggBtn.style.display = "flex"
    easterRevealed = true
    setTimeout(() => {
      eastereggBtn.addEventListener("click", () => {
        window.location.href = "https://github.com/Amirhossein77-98"
      })
    }, 250)
    
  }
})

for (let element of greatLessEl) {
  element.addEventListener("click", () => {
    if (easterRevealed) {
      eastereggBtn.style.animationName = "ButtonShrinker"
      eastereggBtn.style.animationDuration = "0.5s"
      setTimeout(() => {
        eastereggBtn.style.display = "none"
        slashEl.removeAttribute("style")
      }, 300)
    }
  })
}

// Fetching data from database

onValue(skillsInDB, function(snapshot) {
  let skillsArray = Object.entries(snapshot.val())
  for (let i = 0; i < skillsArray.length; i++) {
    addSkillsToTheList(skillsArray[i])
    skillsArrayForAnimate.push(skillsArray[i])
  }
  // Call the callback function and pass the skillsArrayForAnimate array to it
  logSkills(skillsArrayForAnimate)
})
// Fetching data from database
onValue(workSamplesInDB, function(snapshot) {
  let workSamplesArray = Object.values(snapshot.val())
  for (let i = 0; i < workSamplesArray.length; i++) {
    const projectDetails = Object.entries(workSamplesArray[i])
    placeDetailsInCard(projectDetails)
  }
})

onValue(certificatesInDB, (snapshot) => {
  let certificatesArray = Object.values(snapshot.val())
  for (let i = 0; i < certificatesArray.length; i++) {
    const certificatesDetails = Object.entries(certificatesArray[i])
    placeCertificatesInCards(certificatesDetails)
  }
})

timeUpdate()
checkReveals()
checkBars()
scrollabilityForCardsInPCScreens([cardSecEl, certificatesSecEl])
window.addEventListener("scroll", checkReveals)
window.addEventListener("scroll", checkBars)
