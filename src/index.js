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
  let apiKey = "f4b9b3c3f140t6ca1b114f1eo5df8045"
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2 , "0");
  let day = days[date.getDay()];
  return `Last updated:${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {

  let apiKey = "f4b9b3c3f140t6ca1b114f1eo5df8045"
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.city;
  let temperatureElement= (document.querySelector("#current-temp").innerHTML =
  Math.round(response.data.temperature.current) + "ºC");
  let iconElement= document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description").innerHTML = response.data.condition.description;
  let dateElement = document.querySelector("#current-date");
  let windElement = document.querySelector("#wind-condition").innerHTML= "wind speed:" + Math.round(response.data.wind.speed) + " km/h";
  dateElement.innerHTML= formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
  
  getForecast(response.data.coordinates);

}


function displayForecast() {
  let forecastElement= document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastDays = ["Thu","Fri","Sat", "Sun", "Mon"];
  forecast.forEach(function(forecastDay){
    forecastHtml=  forecastHtml + `
    <div class="col">
        <div class="weather-forecast-date"> 
            ${forecastDay.data.time}
        </div>
            <img src="https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_11-256.png" alt="" width="40px"/>
        <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">18&deg;</span> 
            <span class="weather-forecast-temperature-min">12&deg;</span> 
        </div>
  </div>`;

  }) 

forecastHtml= forecastHtml + `</div>`;
forecastElement.innerHTML= forecastHtml;

}



function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
 
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit" , handleSubmit);


search("New York");




































  