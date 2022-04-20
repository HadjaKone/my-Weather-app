function formartDate(timestamp) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    ,
  ];

  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = weekdays[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastdays = response.data.daily;
  let weatherF = document.querySelector("#forecast");

  let forcastHtml = `<div class="row"> `;
  forecastdays.forEach(function (forecastDay, index) {
    if (index < 6) {
      forcastHtml =
        forcastHtml +
        ` <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="36"
              />
              <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}&deg;</span>
                  <span class="weather-forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}&deg; </span>
              </div>
          </div>`;
    }
  });

  forcastHtml = forcastHtml + `</div>`;
  weatherF.innerHTML = forcastHtml;
}

function getForecast(coordinates) {
  let apikey = "5f06a1bf391e643a7da238959ea0baa6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showCityWeather(response) {
  celsiusTemperature = response.data.main.temp;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  let date = document.querySelector("#currentDate");
  date.innerHTML = formartDate(response.data.dt * 1000);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#changeTemp").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(
    "#humidity"
  ).innerHTML = `humidity:${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind:${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].main}`;

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();

  let apikey = "5f06a1bf391e643a7da238959ea0baa6";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  axios.get(apiUrl).then(showCityWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
//part 2
function showCurrentpositionTemp(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let Ctemp = document.querySelector("#changeTemp");
  Ctemp.innerHTML = `${currentTemp}`;
}

function currentTemperature(position) {
  let apikey = "5f06a1bf391e643a7da238959ea0baa6";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;

  axios.get(geoApi).then(showCurrentpositionTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentTemperature);
}
navigator.geolocation.getCurrentPosition(currentTemperature);
let currentSearch = document.querySelector("#current-location-button");
currentSearch.addEventListener("click", getPosition);

function FahrenheitToCelsus(event) {
  event.preventDefault();
  //remove the active class the celsius link
  fahTemp.classList.remove("active");
  celsusTemp.classList.add("active");
  document.querySelector("#changeTemp").innerHTML =
    Math.round(celsiusTemperature);
}

function celsusToFahrenheit(event) {
  event.preventDefault();
  celsusTemp.classList.remove("active");
  fahTemp.classList.add("active");
  let temperatureElement = document.querySelector("#changeTemp");
  let ftemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(ftemp);
}

let celsiusTemperature = null;
let fahTemp = document.querySelector("#fahrenheit-link");
fahTemp.addEventListener("click", celsusToFahrenheit);

let celsusTemp = document.querySelector("#celsus-link");
celsusTemp.addEventListener("click", FahrenheitToCelsus);
