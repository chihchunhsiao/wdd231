import { temples } from "../data/temples.js";
console.log(temples);

import { url } from "../data/temples.js";
console.log(url);

// Grab a reference to the division where we display the items
const showHere = document.querySelector("#showHere");
// Get a reference to the HTML dialog element
const mydialog = document.querySelector("#mydialog");
const mytitle = document.querySelector("#mydialog h2");
const myclose = document.querySelector("#mydialog button");
const myinfo = document.querySelector("#mydialog p");

// add Event listener to close button
myclose.addEventListener("click", () => mydialog.close());

//  ------------ Through the array of JSON items 
function displayItems(data) {
    console.log(data);
    data.forEach(x => {
        console.log(x);
        const photo = document.createElement('img');
        photo.src = `${url}${x.path}`;
        photo.alt = x.name;
        // Add an event listener to each division on the page.
        photo.addEventListener('click', () => showStuff(x));
        showHere.appendChild(photo);
    }); //end loop
}; //end function

// Start displaying all intems in the JSON file
displayItems(temples);

// Populate the dialog with informaiton when image is clicked
function showStuff(x) {
    mytitle.innerHTML = x.name;
    myinfo.innerHTML = `Dedicated ${x.dedicated} by ${x.person} as temple number ${x.number}`;
    mydialog.showModal();
}
