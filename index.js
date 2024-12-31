function showTemp (response){
    let temperatureElement = document.querySelector("#weather-degree");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#currentCity"); 
    cityElement.innerHTML =  response.data.city;
   temperatureElement.innerHTML= Math.round(temperature);

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

