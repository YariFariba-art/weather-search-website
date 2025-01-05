function showTemp (response){
    let temperatureElement = document.querySelector("#weather-degree");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#currentCity"); 
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#speed");
    let timeElement = document.querySelector("#current-date");
    let date = new Date(response.data.time*1000);
    let iconElement = document.querySelector("#emoji");

cityElement.innerHTML =  response.data.city;
timeElement.innerHTML = formatDate(date);
   descriptionElement.innerHTML= response.data.condition.description;
   humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
   speedElement.innerHTML= `${response.data.wind.speed}km/h`;
   temperatureElement.innerHTML= Math.round(temperature);
   iconElement.innerHTML =`<img src="${response.data.condition.icon_url}" class="iconImage"/>`;
   console.log(response.data);
   getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    if (minutes < 10) { minutes = `0${minutes}`; }
    return `${day} ${hours}:${minutes}`;
}


function findCity (city){
    let apiKey = "ef6e0a4b30090aob6a88ad3faec013at";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemp);
}

function searchCity (event) {
    event.preventDefault ();
    let cityInputElement = document.querySelector("#search");
    findCity(cityInputElement.value.trim());
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function getForecast(city) {
  let apikey ="ef6e0a4b30090aob6a88ad3faec013at";
  let apiurl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
  axios(apiurl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) { 
    if (index < 5)
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

 let searchFormElement= document.querySelector("#city");
searchFormElement.addEventListener("submit", searchCity);

findCity("Kabul");
displayForecast();

