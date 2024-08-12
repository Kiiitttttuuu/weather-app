const apiKey = 'cf8b7bdc6175dee92a14c1860a937d99'; // Ensure this is correct
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');
const rainElement = document.getElementById('rain');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = `Location: ${data.name}, ${data.sys.country}`;
            temperatureElement.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = `Description: ${data.weather[0].description}`;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            sunriseElement.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
            sunsetElement.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
            rainElement.textContent = `Rain: ${data.rain ? data.rain['1h'] + ' mm' : 'No data'}`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Error fetching data. Please check the city name and try again.';
        });
}
