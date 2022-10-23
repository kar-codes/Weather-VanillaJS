let current = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedsneday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[current.getDay()];
let currentHour = current.getHours();
let currentMinutes = current.getMinutes();

let dateNow = document.querySelector("#current-date");
dateNow.innerHTML = ` ${currentDay} ${currentHour}:${currentMinutes}`;


function search(city) {
  let apiKey = "d78c12116349bac4b6411dc36c6b602c"
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;
  let temp= (document.querySelector("#current-temp").innerHTML =
  Math.round(response.data.main.temp) + "ºC");
  let description = document.querySelector("#description").innerHTML = response.data.weather[0].main;
  
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
 
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit" , handleSubmit);


search("New York");





































  