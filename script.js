// Chave da api de https://openweathermap.org/, favor, não usar a mesma abaixo!
const apiKey = "115cf55217dcae968551a03574f39fd5";
const apiCountryURL = "https://countryflagsapi.com/png/"

// Seleção de Elementos
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const countryElement = document.querySelector("#country");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data")

//Funções
const showWeatherData =async (city) => {
    const data = await getWeatherData(city)
    
    cityElement.innerHTML = data.name;
    tempElement.innerHTML = parseInt(data.main.temp);
    descElement.innerHTML = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerHTML = `${data.main.humidity}%`;
    windElement.innerHTML = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
};

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}

//Eventos
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value

    showWeatherData(city);
})