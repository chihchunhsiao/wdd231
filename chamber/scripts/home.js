// First Part
// Declare a const variable named "membersURL" that contains the string of the JSON resource provided.
const membersURL = './data/members.json';
const memberCards = document.querySelector('#member-cards');

// Create a async defined function named "getProphetData" to fetch data from the JSON source url using the await fetch() method.
async function getMembers(membersURL) {
    
    // use await fetch() method get response from the URL        
    const response = await fetch(membersURL);
    
    // Use "await response.json()" phase the response body as JSON format and store the results in a const variable named "data".
    
    const data = await response.json();
    // Add a console.log() expression method to check the data response is OK.
    console.log(data);  
    displayMembers(data.members);
    // call function getRandomSpotlights()
    // getRandomSpotlights(data.members);
} 


// Call the function getMembers() in the main line of your .js code to test the fetch and response.
getMembers(membersURL);

const displayMembers = (members) => {
    // 1. Filter for Gold and Silver members
    const premiumMembers = members.filter(member => 
        member.membershiplevel === "Gold" || member.membershiplevel === "Silver"
    );
    // if (premiumMembers.length === 0) {
    //   spotlightContainer.innerHTML = "<p>No gold or silver members to display at this time.</p>";
    //   return;
    // }
    
    // 2. Randomly select 3 members
    const selectedMembers = [];
    const numberOfSpotlights = 3; 
    // const numberOfSpotlights = Math.floor(Math.random() * 2) + 2; // Randomly get 2 or 3
    
    // Create a copy to pick from without repeats
    let membersToPick = [...premiumMembers];
    
    for (let i = 0; i < numberOfSpotlights && membersToPick.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * membersToPick.length);
        selectedMembers.push(membersToPick[randomIndex]);
        // Remove the selected member to prevent duplicates
        membersToPick.splice(randomIndex, 1);
    }
    

    selectedMembers.forEach((member) => {
        
            // Create elements to add to the div.cards element
            let card = document.createElement('section');
            let memberName = document.createElement('h2'); 
            let image = document.createElement('img');
            

            // Build the h2 content out to show the prophet's full name
            memberName.textContent = `${member.fieldsnames}`;

            // Build the image portrait by setting all the relevant attributes
            image.setAttribute('src', `images/${member.image}`);
            image.setAttribute('alt', `Image of ${member.fieldsnames}`); 
            // image.setAttribute('fetchpriority', 'high');
            image.setAttribute('width','267');
            image.setAttribute('height', '201');

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
            card.appendChild(membershipLevel);
            // card.appendChild(email);

            memberCards.appendChild(card);

            }); // end of arrow function and forEach loop
        }


