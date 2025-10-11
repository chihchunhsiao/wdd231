// -------- thankspage content

const myInfo = new URLSearchParams (window.location.search);
console.log(myInfo);//inspect the object contents in the browser console

// show all informaiton from URL to data
console.log(myInfo.get('first'));
console.log(myInfo.get('last'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('email'));
console.log(myInfo.get('organization'));
console.log(myInfo.get('formLoadTime'));


// get id="results" from thanks.html and set the contents of results
document.querySelector('#results').innerHTML = `<p>Application for ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Your Phone: ${myInfo.get('phone')}</p>
<p>Your email is: ${myInfo.get('email')}</p>
<p>Your Organization: ${myInfo.get('organization')} </p>
<p>Submission Date: ${myInfo.get('formLoadTime')} </p>
`;

