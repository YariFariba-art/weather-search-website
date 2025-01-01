function showTemp (response){
    let temperatureElement = document.querySelector("#weather-degree");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#currentCity"); 
    cityElement.innerHTML =  response.data.city;
   temperatureElement.innerHTML= Math.round(temperature);
   let descriptionElement = document.querySelector("#description"); 
   descriptionElement.innerHTML= response.data.condition.description;
   let humidityElement = document.querySelector("#humidity"); 
   humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
   let speedElement = document.querySelector("#speed"); 
   speedElement.innerHTML= `${response.data.wind.speed}km/h`;
   let timeElement = document.querySelector("#current-date"); 
   let date = new Date(response.data.time * 1000);
   timeElement.innerHTML = formatDate(date);
   let iconElement = document.querySelector("#emoji"); 
   iconElement.innerHTML =`<img src="${response.data.condition.icon_url}" class="iconImage"/>`;
}

function formatDate(date){
    let minutes =date.getMinutes();
    let hours =date.getHours();
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
    if (minutes<10){minutes =`0${minutes}`}
    return `${day} ${hours}:${minutes}`
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

let searchFormElement= document.querySelector("#city");
searchFormElement.addEventListener("submit", searchCity);
findCity("Kabul");
