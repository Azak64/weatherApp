const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

async function checkWeather(city) {
    try {
        // Step 1: Get coordinates from city name
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            alert("City not found!");
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Step 2: Get weather data using coordinates
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // Update UI
        document.getElementById("cityName").innerHTML = `${name}, ${country}`;
        document.getElementById("temp").innerHTML = Math.round(weatherData.current_weather.temperature) + "°C";
        document.getElementById("description").innerHTML = `Wind speed: ${weatherData.current_weather.windspeed} km/h`;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
});

// Allow "Enter" key to trigger search
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkWeather(cityInput.value);
});
