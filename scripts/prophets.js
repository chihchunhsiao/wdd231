// First Part
// Declare a const variable named "url" that contains the URL string of the JSON resource provided.
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Declare a const variable name "cards" that selects the HTML div element from the document with an id value of "cards".
const cards = document.querySelector('#cards');

// Create a async defined function named "getProphetData" to fetch data from the JSON source url using the await fetch() method.
async function getProphetData(url) {
    
    // use await fetch() method get response from the URL        
    const response = await fetch(url);
    
    // Use "await response.json()" phase the response body as JSON format and store the results in a const variable named "data".
    
    const data = await response.json();
        
    // Add a console.table() expression method to check the data response at this point in the console window.
    // 
    displayProphets(data.prophets);
} 


// Call the function getProphetData() in the main line of your .js code to test the fetch and response.
getProphetData(url);

// Second Part
// Define a function expression named "displayProphets" that handles a single parameter named "prophets"
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h2'); 
        let portrait = document.createElement('img');

        // Build the h2 content out to show the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Build the image portrait by setting all the relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); 
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Build the p content out to show the prophet's birthdate & birthplace

        let birthDate = document.createElement("p");
        birthDate.textContent = `Birthday: ${prophet.birthdate}`;
        
        let birthPlace = document.createElement("p");
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`

        // Append the section(card) with the created elements
        card.appendChild(fullName); 
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        cards.appendChild(card);

    }); // end of arrow function and forEach loop
}

