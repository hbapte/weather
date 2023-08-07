const apiKey = 'a751938be2934e3fad4224511230708';
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

async function getWeatherData(location) {
    const response = await fetch(`${apiUrl}?key=${apiKey}&q=${location}`);
    const data = await response.json();
    return data;
}

const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const location = locationInput.value;
    if (location.trim() === '') return;

    try {
        const weatherData = await getWeatherData(location);
        displayWeatherInfo(weatherData);
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

function displayWeatherInfo(data) {
    const location = data.location.name;
    const temperatureC = data.current.temp_c;
    const temperatureF = data.current.temp_f;
    const conditionText = data.current.condition.text;
    const iconUrl = `http:${data.current.condition.icon}`;

    const infoHTML = `
        <h2>${location}</h2>
        <p>${temperatureC}°C / ${temperatureF}°F</p>
        <p>${conditionText}</p>
        <img src="${iconUrl}" alt="Weather Icon">
    `;
    weatherInfo.innerHTML = infoHTML;
}
