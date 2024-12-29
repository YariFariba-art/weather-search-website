function searchCity (event) {
    event.preventDefault ();
    let cityInputElement = document.querySelector("#search");
    let cityElement = document.querySelector("#currentCity"); 
    cityElement.innerHTML = cityInputElement.value.trim();
}

let searchFormElement= document.querySelector("#city");
searchFormElement.addEventListener("submit", searchCity);

