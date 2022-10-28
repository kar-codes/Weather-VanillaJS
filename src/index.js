let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function search(city) {
  let apiKey = "f4b9b3c3f140t6ca1b114f1eo5df8045"
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let day = days[date.getDay()];
  return `Last updated:${day} ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "f4b9b3c3f140t6ca1b114f1eo5df8045"
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  const city = response.data.city;

  document.querySelector("#current-city").innerHTML = city;
  document.querySelector("#current-temp").innerHTML = `${Math.round(response.data.temperature.current)} ºC`;
  document.querySelector("#description").innerHTML = response.data.condition.description;

  document.querySelector("#wind-condition").innerHTML = `wind speed: ${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#icon").innerHTML = formatDate(response.data.time * 1000);
  document.querySelector("#icon").setAttribute("src", `${response.data.condition.icon_url}`);

  getForecast(city);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHtml = '<div class="row">';

  forecast.shift();
  forecast.pop();

  forecast.forEach(function (forecastDay) {
    const date = new Date(forecastDay.time * 1000);
    const formattedDate = moment(date).format('ddd');

    const icon = forecastDay.condition.icon;
    const minimum = forecastDay.temperature.minimum;
    const maximum = forecastDay.temperature.maximum;

    forecastHtml += `
    <div class="col">
        <div class="weather-forecast-date"> 
            ${formattedDate}
        </div>
        <img src="${icon}" alt="" width="40px"/>
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">${minimum}&deg;</span> 
          <span class="weather-forecast-temperature-min">${maximum}&deg;</span> 
        </div>
    </div>`;
  });

  forecastHtml += `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", handleSubmit);

search("New York");




































