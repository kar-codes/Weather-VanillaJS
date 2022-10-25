let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedsneday",
  "Thursday",
  "Friday",
  "Saturday"
];

function search(city) {
  let apiKey = "d78c12116349bac4b6411dc36c6b602c"
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2 , "0");
  let day = days[date.getDay()];
  return `Last updated:${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;
  let temperatureElement= (document.querySelector("#current-temp").innerHTML =
  Math.round(response.data.main.temp) + "ºC");
  let descriptionElement = document.querySelector("#description").innerHTML = response.data.weather[0].main;
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML= formatDate(response.data.dt * 1000);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
 
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit" , handleSubmit);


search("New York");





































  