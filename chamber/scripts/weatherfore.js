// Weather Forecast
// select HTML elements in the document
const weatherFore = document.querySelector('#weatherfore');
const myToday = document.querySelector('#today');
const myTomorrow = document.querySelector('#tomorrow');
const inTwodays = document.querySelector('#intwodays');


const dailyKey = "4af650029bbed36be509350b72c87a97";
const lat = "24.79";
const long = "121.00";
const city = "hsinchu";


// Declare a const variable named "url" and assign it a valid URL string
// const foreURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&appid=${dailyKey}&units=metric`;


// Define an asynchronous function named "apiFetch()" that uses a try block to handle errors
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


// function displayResults(data) {
//     const dailyForecasts = data.daily;
//     console.log(dailyForecasts);

//     // 舉例：顯示今天的最高溫和天氣描述
//     const todayTemp = dailyForecasts[0].temp.day;
//     const todayDescription = dailyForecasts[0].weather[0].description;
//     myToday.textContent = `Today: ${todayTemp}°C, ${todayDescription}`;

//     // 舉例：顯示明天的最高溫和天氣描述
//     const tomorrowTemp = dailyForecasts[1].temp.day;
//     const tomorrowDescription = dailyForecasts[1].weather[0].description;
//     myTomorrow.textContent = `Tomorrow: ${tomorrowTemp}°C, ${tomorrowDescription}`; 

//     // 舉例：顯示明天的最高溫和天氣描述
//     const intwodaysTemp = dailyForecasts[1].temp.day;
//     const intwodaysDescription = dailyForecasts[1].weather[0].description;
//     inTwodays.textContent = `Tomorrow: ${tomorrowTemp}°C, ${tomorrowDescription}`; 
    
// }