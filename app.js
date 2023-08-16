const currentDate = new Date();

const date = "currentDate";
const dateElement = document.getElementById(date);

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const dayOfWeek = daysOfWeek[currentDate.getDay()];
const hours = String(currentDate.getHours()).padStart(2, "0");
const minutes = String(currentDate.getMinutes()).padStart(2, "0");
const currentTime = `${dayOfWeek} ${hours}:${minutes}`;
console.log(currentTime);
dateElement.textContent = `${currentTime}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ];


  return days[day];

}

function dispalyForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  const forecastElement = document.querySelector("#forecast");

  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        
        <img 
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" 
          alt="" 
          width="42" 
        />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max"> 
          ${Math.round(forecastDay.temp.max)}° </span>
          <span class="weather-forecast-temperature-min"> 
          ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>  
   
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}
function displayTemperature(response) {
  console.log(response.data);
  const temperatureElement = document.getElementById("temperature");
  const cityElement = document.getElementById("city");
  const descriptionElement = document.getElementById("desciption");
  const humidityElement = document.getElementById("humidity");
  const windElement = document.getElementById("wind");
  const iconElement = document.getElementById("icon");

  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  const apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  const cityInputElement = document.getElementById("city-input");
  console.log(cityInputElement.value);
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  const fahrenheitTemperature = Math.round((19 * 9) / 5 + 32 + 32);
  const temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  const temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
const form = document.getElementById("search-form");
form.addEventListener("submit", handleSubmit);

const fahrenheitLink = document.getElementById("fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

const celsiusLink = document.getElementById("celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Abuja");