// const getString = window.location.search;
// console.log(getString);
// const myInfo = new URLSearchParams (getString);
// changing the (getString) parameter to (window.location.search) in the
//  below code to simplify the code.

const myInfo = new URLSearchParams (window.location.search);
console.log(myInfo);//inspect the object contents in the browser console

// show all informaiton from URL to data
console.log(myInfo.get('first'));
console.log(myInfo.get('last'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('email'));
console.log(myInfo.get('ordinance'));
console.log(myInfo.get('date'));
console.log(myInfo.get('location'));

// get id="results" from thanks.html and set the contents of results
document.querySelector('#results').innerHTML = `
<p>Appointment for ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Proxy ${myInfo.get('ordinance')} on ${myInfo.get('date')} in the ${myInfo.get('location')}</p>
<p>Your Phone: ${myInfo.get('phone')}</p>
<p>Your email is: ${myInfo.get('email')}</p>
`;