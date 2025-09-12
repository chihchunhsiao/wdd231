
// First Part
// Declare a const variable named "membersURL" that contains the string of the JSON resource provided.
const membersURL = './data/members.json';

// Declare a const variable name "cards" that selects the HTML div element from the document with an id value of "cards".
const cards = document.querySelector('#cards');

// Create a async defined function named "getProphetData" to fetch data from the JSON source url using the await fetch() method.
async function getMembers(membersURL) {
    
    // use await fetch() method get response from the URL        
    const response = await fetch(membersURL);
    
    // Use "await response.json()" phase the response body as JSON format and store the results in a const variable named "data".
    
    const data = await response.json();
        
    // Add a console.table() expression method to check the data response at this point in the console window.
    // 
    displayMembers(data.members);
} 


// Call the function getProphetData() in the main line of your .js code to test the fetch and response.
getMembers(membersURL);

// Second Part
// Define a function expression named "displayProphets" that handles a single parameter named "prophets"
const displayMembers = (members) => {
    members.forEach((member) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let memberName = document.createElement('h2'); 
        let image = document.createElement('img');

        // Build the h2 content out to show the prophet's full name
        memberName.textContent = `${member.fieldsnames}`;

        // Build the image portrait by setting all the relevant attributes
        image.setAttribute('src', `images/${member.image}`);
        image.setAttribute('alt', `Image of ${member.fieldsnames}`); 
        // image.setAttribute('loading', 'lazy');
        image.setAttribute('width','400');
        image.setAttribute('height', '300');

        // Build the p content out to show the member's address/phonenumber/websiteurl/membershiplevel/email

        let address = document.createElement("p");
        address.textContent = `${member.address}`;
        
        let phoneNumber = document.createElement("p");
        phoneNumber.textContent = `${member.phonenumber}`;

        let websiteURL = document.createElement("p");
        websiteURL.textContent = `${member.websiteurl}`;

        let membershipLevel = document.createElement("p");
        membershipLevel.textContent = `Membershpip Level: ${member.membershiplevel}`;

        let email = document.createElement("p");
        email.textContent = `Email: ${member.email}`;

        // Append the section(card) with the created elements
        card.appendChild(memberName); 
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(websiteURL);
        // card.appendChild(membershipLevel);
        // card.appendChild(email);

        cards.appendChild(card);

    }); // end of arrow function and forEach loop
}

// Let the user toggle between a "grid" type view of member cards or a simple, one-column list of members.
const gridbutton = document.querySelector("#gridButton");
const listbutton = document.querySelector("#listButton");
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}


