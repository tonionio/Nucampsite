const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 2000,
    pause: false
});

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function() {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
});

async function fetchWeather() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = "Seattle"; // Replace with your desired city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeather(data) {
    const weatherIconCode = data.weather[0].icon;
    const weatherTemp = data.main.temp;
    const weatherDescription = data.weather[0].description;

    const weatherIcon = document.createElement('img');
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherIconCode}.png`;
    document.getElementById('weather-icon').appendChild(weatherIcon);

    document.getElementById('weather-temp').textContent = `${weatherTemp}\u00B0 F`;
    document.getElementById('weather-description').textContent = weatherDescription;
}

// Call the fetchWeather function and then display the weather data
fetchWeather().then(data => displayWeather(data));
