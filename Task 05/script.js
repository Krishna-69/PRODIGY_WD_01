const form = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather');

form.addEventListener('submit', e => {
    e.preventDefault();
    const location = locationInput.value;
    getWeather(location);
});

async function getWeather(location) {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            const { name, weather, main } = data;
            const { description, icon } = weather[0];
            const temperature = main.temp;

            weatherInfo.innerHTML = `
                <h2>${name}</h2>
                <img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}">
                <p>${description}</p>
                <p>Temperature: ${temperature}°C</p>
            `;
        } else {
            weatherInfo.innerHTML = `<p>Weather data not available for ${location}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = `<p>Something went wrong!</p>`;
    }
}
