// import {places} from '../data/places.mjs';
// console.log(places);

// First Part
// Declare a const variable named "placeURL" that contains the string of the JSON resource provided.
const placeURL = './data/places.json';

// Declare a const variable name "cards" that selects the HTML div element from the document with an id value of "cards".
const cards = document.querySelector('#discover-cards');

// Create a async defined function named "getPlaces" to fetch data from the JSON source url using the await fetch() method.
async function getPlaces(placeURL) {
    
    // use await fetch() method get response from the URL        
    const response = await fetch(placeURL);
    
    // Use "await response.json()" phase the response body as JSON format and store the results in a const variable named "data".
    
    const data = await response.json();
        
    // Add a console.table() expression method to check the data response at this point in the console window.
    // 
    displayPlaces(data.places);
} 


// Call the function getPlaces() in the main line of your .js code to test the fetch and response.
getPlaces(placeURL);

// dialog show. Set variable names
        
const dialogBox = document.querySelector("#dialogBox-d");
const closeButton = document.querySelector("#closeButton-d");
    // get the doalogBox-d div
const dialogBoxText = document.querySelector("#dialogBox-d div");

    // "close" button closes the dialog
    closeButton.addEventListener("click", () => {
    dialogBox.close();
    });

// show places cards
const displayPlaces = (places) => {
    places.forEach((place) => {
        console.log(`call times= ${places.length}`);
        // Create elements to add to the div.cards element
        let card = document.createElement('div');
        let placeName = document.createElement('h2'); 
        let image = document.createElement('img');

        // Build the h2 content out to show the place's full name
        placeName.textContent = `${place.name}`;

        // Build the image by setting all the relevant attributes
        image.setAttribute('src', `images/${place.image}`);
        image.setAttribute('alt', `Image of ${place.name}`); 
        // image.setAttribute('fetchpriority', 'high');
        image.setAttribute('width','300');
        image.setAttribute('height', '200');
        image.setAttribute('loading', 'lazy'); 

        // Build the p content out to show the place's address/discription/learnmore button

        let address = document.createElement("p");
        address.textContent = `${place.address}`;
        
        let description = document.createElement("h3");
        description.textContent = `${place.description}`;

        // let cost = document.createElement("p");
        // cost.textContent = `${place.cost}`;

        let learnMore = document.createElement("button");
        learnMore.textContent = `Learn More`;
        learnMore.classList.add('learnmore-btn');     

        // Inside the loop, attach an event to the learnMore button that was created.
        learnMore.addEventListener("click", () => {
        dialogBox.showModal();
        dialogBoxText.innerHTML = `
            <h2>${place.name}</h2>
            <p><strong>Address:</strong> ${place.address}</p>
            <p><strong>Description:</strong> ${place.description}</p>
            <p><strong>Cost:</strong> ${place.cost}</p>
            `;
        });
        

        // Append the div(card) with the created elements
        card.appendChild(placeName); 
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(learnMore);
        // card.appendChild(cost);

        cards.appendChild(card);

    }); // end of arrow function and forEach loop
}




// Second Part
// Use LocalStorage to save user's visit date and show the welcome message for the visitors.

const messageElement = document.getElementById('visit-message');

// localStorage 中儲存上次訪問日期的 key
const LAST_VISIT_KEY = 'lastVisitDate';

// get current time (microsecond)
const now = Date.now();

// 從瀏覽器的本地儲存空見localStorage 獲取儲存的上次訪問的時間的資料 (毫秒數) ex:1759542352799
const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

/*** Display Welcome message*/
function displayVisitMessage() {
    let message = "";

    if (!lastVisit) {
        //  1: first visit time
        message = "Welcome! Let us know if you have any questions.";
    } else {
        // time difference calculated
        const timeDifference = now - parseInt(lastVisit);

        // one day：1000ms * 60s * 60min * 24hr
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

        if (timeDifference < oneDayInMilliseconds) {
            // 2: visit time interval < 1 day
            message = "Back so soon! Awesome!";
        } else {
            // 3: visit time interval > 1 day

            // Calculate date (use Math.floor)
            const daysDifference = Math.floor(timeDifference / oneDayInMilliseconds);

            if (daysDifference === 1) {
                // less than one day, display 'day'
                message = `Your last visit was 1 day ago.`;
            } else {
                // more than one day, display 'days'
                message = `Your last visit was ${daysDifference} days ago.`;
            }
        }
    }

    messageElement.textContent = message;

    // Tip: Saved current time as new visit last date.
    // use localStorage.setItem() method
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
}

// run displayVisitMessage function
displayVisitMessage();

