import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://personal-website-9f744-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const workSamplesInDB = ref(database, "work-samples")
const skillsInDB = ref(database, "skills")


// Variables
const now = new Date()
const minutesFromBeginningOfDay = now.getMinutes() + now.getHours() * 60
const cardSecEl = document.getElementById("cards-sec")
const skillsSecEl = document.querySelector(".skills")

// Functions
function getWeatherData() {
  // Fetch and display Weather info based on the user's ip location
  fetch("https://ipinfo.io/json?token=d17fe0b7b78f1e")
  .then(response => response.json()) 
  .then(data => {

    // Get city name from IP data
    const city = data.city

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

  if (hour < 10) {
    hour = "0" + hour
  }
  if (minute < 10) {
    minute = "0" + minute
  }

  document.getElementById("time").textContent = `${hour}:${minute}`
  
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
  console.log(details[1])
  // Append the new element to the skills section
  skillsSecEl.innerHTML += `<div class="skill">
                              <h3>${details[0]}</h3>
                              <div class="barBg"><div id="${details[0]}-bar" class="bar"></div></div>
                              <span class="percent" data-value="${details[1]}">0</span>
                            </div>`
  // Get the newly added element with the class of percent
  const percent = skillsSecEl.querySelector(".percent:last-child")

  // Set the starting value as text
  percent.textContent = startValue

  // Observe the element
  observer.observe(percent)
}

onValue(skillsInDB, function(snapshot) {
  let skillsArray = Object.entries(snapshot.val())
  for (let i = 0; i < skillsArray.length; i++) {
    addSkillsToTheList(skillsArray[i])
  }
})

// Define the starting value
const startValue = 0

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
});



function placeDetailsInCard(details) {
  cardSecEl.innerHTML += `<div id="card">
                              <img src="${details[2][1]}">
                              <h3>${details[0][1]}</h3>
                              <p>${details[1][1]}</p>
                            </div>`
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
  console.log("Third Condition")
}

// Fetching data from database
onValue(workSamplesInDB, function(snapshot) {
  let workSamplesArray = Object.values(snapshot.val())
  for (let i = 0; i < workSamplesArray.length; i++) {
    const projectDetails = Object.entries(workSamplesArray[i])
    placeDetailsInCard(projectDetails)
  }
})

timeUpdate()
checkReveals()
checkBars()
window.addEventListener("scroll", checkReveals)
window.addEventListener("scroll", checkBars)