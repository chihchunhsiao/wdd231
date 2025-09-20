// select HTML elements in the document
const town = document.querySelector('#town');
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// const myTown = document.querySelector('#town');
// const myDescription = document.querySelector('#description');
// const myTemperature = document.querySelector('#temperature');
// const myGraphic = document.querySelector('#graphic');

const myKey = "a8ea4953e303682542b57ca995581ba1";
const myLat = "49.75";
const myLong = "6.64";

// Declare a const variable named "url" and assign it a valid URL string
const url = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// Define an asynchronous function named "apiFetch()" that uses a try block to handle errors
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data); // testing only
            displayResults(data); //uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();



function displayResults(data) {
    // console.log('Hello');
    town.innerHTML = data.name;   
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    // copy the icon url from Weather Conditions website and instead "10d" and insert "${data.weather[0].icon}" between the /wn/ ... @2x.png
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    // use variable desc to define the weather description
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('SRC', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
    captionDesc.innerHTML =data.weather[0].description;
}