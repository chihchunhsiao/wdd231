// first <p>
// Get the current year

const currentyear = document.querySelector("#currentyear");

const today = new Date();

currentyear.innerHTML = `&copy;<span class="highlight">${today.getFullYear()}</span> &bull; Hsinchu Chamber of Commerce`;

// second <p>
// Get the last modified date

const lastModified = document.querySelector("#lastModified");

const lastModifiedDate = new Date(document.lastModified);

lastModified.innerHTML = `Last Modification: <span class="highlight">${lastModifiedDate.getDate()}/${lastModifiedDate.getMonth() + 1}/${lastModifiedDate.getFullYear()} ${lastModifiedDate.getHours()}:${lastModifiedDate.getMinutes()}:${lastModifiedDate.getSeconds()}</span>`; 