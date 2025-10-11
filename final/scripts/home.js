// First Part
// Declare a const variable named "placeURL" that contains the string of the JSON resource provided.
const bookURL = './data/books.json';

// Declare a const variable name "cards" that selects the HTML div element from the document with an id value of "cards".
const cards = document.querySelector('#book-cards');

// Create a async defined function named "getPlaces" to fetch data from the JSON source url using the await fetch() method.
async function getBooks(bookURL) {
    
    try {
        // 1. use await fetch() method get response from the URL        
        const response = await fetch(bookURL);
        // checking that if HTTP code response is ok?
        if (!response.ok) {
            // throw error messages
            throw new Error(`HTTP Error! code: ${response.status}`);
        }

        // 2. Use "await response.json()" phase the response body as JSON format and store the results in a const variable named "data".   
        const data = await response.json();
        // 3. check data
        console.table(data.books);// Add a console.table() expression method to check the data response at this point in the console window.
        // 4. display function
        displayBooks(data.books);

    } catch (error) {
        console.error("An error occurred while retrieving or processing book data:", error.message);
    }
    
} 

/**
 * Handles the data, selects 3 random books, and renders the cards.
 * @param {Array} allBooks - The complete list of book objects from the JSON.
 */
const displayBooks = (allBooks) => {
    
    // --- Random Selection Logic ---
    
    // Create a copy of the array to pick from without repeats
    let booksToPick = [...allBooks];
    const selectedBooks = [];
    const numberOfSpotlights = 3; 
    
    for (let i = 0; i < numberOfSpotlights && booksToPick.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * booksToPick.length);
        
        // Push the selected book
        selectedBooks.push(booksToPick[randomIndex]);
        
        // Remove the selected book to prevent duplicates
        booksToPick.splice(randomIndex, 1);
    }
    
    // --- Card Display Logic ---

    selectedBooks.forEach((book) => {
        
        // Create elements
        let card = document.createElement('section');
        let bookName = document.createElement('h3'); // Changed to h3 for semantic hierarchy
        let author = document.createElement('p');    // Changed to p to be more descriptive for author text
        let image = document.createElement('img');
        let link = document.createElement('a');

        // Set content and attributes
        bookName.textContent = book.name;

        author.textContent = `Author: ${book.author}`;
        author.classList.add('book-author'); // Add a class for specific styling
        
        // Build the image portrait by setting all the relevant attributes
        // NOTE: Assumes the JSON book object has an 'image' property with the filename (e.g., "book1.jpg")
        image.setAttribute('src', `images/${book.image}`);
        image.setAttribute('alt', `Cover image for ${book.name}`); 
        image.setAttribute('loading', 'lazy'); 
        image.setAttribute('width', '200');
        image.setAttribute('height', '300'); // Adjusted height for a more book-like aspect ratio
        
        // Link content
        link.setAttribute('href',`${book.link}`);
        link.textContent = `Book Link:`;
        // Append the created elements to the card
        // card.appendChild(bookName); 
        card.appendChild(image);
        card.appendChild(author);
        card.appendChild(link);

        // Append the final card to the main 'cards' container (named 'cards' globally)
        cards.appendChild(card);

    }); // end of forEach loop
}

// Call the function getBooks() in the main line of your .js code to test the fetch and response.
getBooks(bookURL);


