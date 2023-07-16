// Variables
const now = new Date()
const minutesFromBeginningOfDay = now.getMinutes() + now.getHours() * 60

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

  console.log(minute)

  document.getElementById("time").textContent = `${hour}:${minute}`
  
  let timeout = (60 - now.getSeconds()) * 1000

  setTimeout(timeUpdate, timeout)

}

// Main body
if (localStorage.getItem("temp") != null) {
  if (minutesFromBeginningOfDay - Number(localStorage.getItem("lastUpdate")) > 60) {
    getWeatherData()
  } else if (minutesFromBeginningOfDay - Number(localStorage.getItem("lastUpdate")) <= 60) {
    displayWeatherData()
  }
} else {
  getWeatherData()
}

timeUpdate()
