// Weather Forecast
// Replace with your actual OpenWeather API Key
const API_KEY = "4af650029bbed36be509350b72c87a97";
const lat = 24.79;
const lon = 121.00;
const weatherContainer = document.querySelector(".weatherfore-cards");

// Function to fetch weather data from the 5-Day/3-Hour Forecast API
async function getWeatherData() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data.cod && data.cod !== '200') {
            console.error('Error fetching weather data:', data.message);
            weatherContainer.innerHTML = `<p class="error">Error: ${data.message}. Please check your API key or try again later.</p>`;
            return;
        }

        // Process the 3-hour data to get daily min/max temperatures
        const dailyForecasts = processDataForThreeDays(data.list);

        // Display the processed data
        displayWeather(dailyForecasts);

    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        weatherContainer.innerHTML = `<p class="error">Failed to load weather data. Please try again later.</p>`;
    }
}

// Helper function to process 3-hour data into daily min/max
function processDataForThreeDays(list) {
    const dailyTemps = {};
    const processedDays = [];

    list.forEach(item => {
        // Use the date from the timestamp
        const date = new Date(item.dt * 1000).toLocaleDateString();
        
        if (!dailyTemps[date]) {
            dailyTemps[date] = {
                min: item.main.temp,
                max: item.main.temp,
                dt: item.dt
            };
        } else {
            dailyTemps[date].min = Math.min(dailyTemps[date].min, item.main.temp);
            dailyTemps[date].max = Math.max(dailyTemps[date].max, item.main.temp);
        }
    });

    // Extract the first 3 days from the processed data
    const dates = Object.keys(dailyTemps).slice(0, 3);
    dates.forEach(date => {
        processedDays.push({
            dt: dailyTemps[date].dt,
            temp: {
                min: dailyTemps[date].min,
                max: dailyTemps[date].max
            }
        });
    });

    return processedDays;
}

// The displayWeather function remains the same as before.
function displayWeather(forecasts) {
    weatherContainer.innerHTML = "";
    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        const minTemp = Math.round(forecast.temp.min);
        const maxTemp = Math.round(forecast.temp.max);
        const cardHTML = `
            <div class="card">
                <h3>${date}</h3>
                <p>High: ${maxTemp}°F, Low: ${minTemp}°F</p>               
            </div>
            `;
        weatherContainer.innerHTML += cardHTML;
    });
}

// Call the function to start the process
getWeatherData();




















// // select HTML elements in the document
// const weatherForecast = document.querySelector('#weather-forecast');
// const myToday = document.querySelector('#today');
// const myTomorrow = document.querySelector('#tomorrow');
// const inTwodays = document.querySelector('#intwodays');


// const apiKey = "4af650029bbed36be509350b72c87a97";
// const lat = "24.79";
// const lon = "121.00";
// const city = "hsinchu";


// // Declare a const variable named "url" and assign it a valid URL string
// // const foreURL =`https://api.openweathermap.org/data/2.5/forecast/daily?lat=S${lat}&lon=${long}&cnt=3&appid=${apiKey}&units=imperial`;
// const foreURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=imperial`;

// // Define an asynchronous function named "apiFetch()" that uses a try block to handle errors
// async function apiFetch() {
//     try {
//         const response = await fetch(foreURL);
//         if (response.ok) {
//             const foreData = await response.json();
//             console.log(foreData); // testing only
//             // displayResults(foreData); //uncomment when ready
//         } else {
//             throw Error(await response.text('Cannot get the data!'));
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// apiFetch();

