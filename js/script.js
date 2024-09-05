document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            const apiKey = 'your_api_key_here';  // Replace with your OpenWeatherMap API key
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

            fetch(weatherUrl)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    document.getElementById('weatherInfo').innerHTML = "Error fetching weather data!";
                    console.error(error);
                });
        });
    } else {
        document.getElementById('weatherInfo').innerHTML = "Geolocation is not supported by this browser.";
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weatherInfo');
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;
    weatherDiv.innerHTML = `Weather in ${city}: ${temp}°C, ${description}`;
}
