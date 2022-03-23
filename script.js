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

let now = new Date();
let hour = now.toLocaleTimeString();
let day = weekdays[now.getDay()];
let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = `${day} ${hour}`;

function showCityWeather(response) {
  console.log(response.data.main);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#changeTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `humidity:${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind:${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].main}`;
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
