// First Part
// Declare a const variable named "placeURL" that contains the string of the JSON resource provided.
const bookURL = './data/books.json';

// Declare a const variable name "cards" that selects the HTML div element from the document with an id value of "cards".
const cards = document.querySelector('#finance-cards');

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


// Call the function getPlaces() in the main line of your .js code to test the fetch and response.
getBooks(bookURL);

// dialog show. Set variable names
        
const dialogBox = document.querySelector("#dialogBox-f");
const closeButton = document.querySelector("#closeButton-f");
    // get the doalogBox-d div
const dialogBoxText = document.querySelector("#dialogBox-f div");

    // "close" button closes the dialog
    closeButton.addEventListener("click", () => {
    dialogBox.close();
    });

// show places cards
const displayBooks = (books) => {
    books.forEach((book) => {
        console.log(`call times= ${books.length}`);
        // Create elements to add to the div.cards element
        let card = document.createElement('div');
        let bookName = document.createElement('h2'); 
        let image = document.createElement('img');

        // Build the h2 content out to show the place's full name
        bookName.textContent = `${book.name}`;

        // Build the image by setting all the relevant attributes
        image.setAttribute('src', `images/${book.image}`);
        image.setAttribute('alt', `Image of ${book.name}`); 
        // image.setAttribute('fetchpriority', 'high');
        image.setAttribute('width','200');
        image.setAttribute('height', '300');
        image.setAttribute('loading', 'lazy'); 

        // Build the p content out to show the place's address/discription/learnmore button

        let author = document.createElement("h3");
        author.textContent = `Author: ${book.author}`;
        
        let bookReview = document.createElement("p");
        bookReview.textContent = `Book Review: ${book.review}`;

        // let price = document.createElement("p");
        // price.textContent = `${book.price}`;

        let learnMore = document.createElement("button");
        learnMore.textContent = `Learn More`;
        learnMore.classList.add('learnmore-btn');     

        // Inside the loop, attach an event to the learnMore button that was created.
        learnMore.addEventListener("click", () => {
        dialogBox.showModal();
        dialogBoxText.innerHTML = `
            <h2>${book.name}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Book Review:</strong> s${book.review}</p>
            <p><strong>Price:</strong> ${book.price}</p>
    
            `;
        });
        

        // Append the div(card) with the created elements
        card.appendChild(bookName); 
        card.appendChild(image);
        card.appendChild(author);
        card.appendChild(bookReview);
        // card.appendChild(price);
        card.appendChild(learnMore);
        

        cards.appendChild(card);

    }); // end of arrow function and forEach loop
}
