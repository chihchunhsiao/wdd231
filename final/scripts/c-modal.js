// modal content

const openButton1 = document.querySelector("#openButton1");
const openButton2 = document.querySelector("#openButton2");
const openButton3 = document.querySelector("#openButton3");
const openButton4 = document.querySelector("#openButton4");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");

// get the doalogBox div
const dialogBoxText = document.querySelector("#dialogBox div");

// "show the dialog" button opens the dialog modaly
openButton1.addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
   <h3>Free (Starter) Plan</h3>                 
   <p>This level is designed to draw visitors in and showcase the quality of your free content, converting them into paying members later.</p>
   <p>Fee: Free</p>
    <h4>Access Rights:</h4>
    <ul> 
    <li>Access to all blog articles.</li>
    <li>Monthly Financial Newsletter.</li>
    <li>Ability to comment on public articles.</li>
    </ul>
    `;
});

openButton2.addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h3>Basic Access</h3>                 
  <p>This is the entry-level paid plan, offering essential, practical tools and deeper insight than the free level.</p>
   <p>Fee: $9.99/month</p>
    <h4>Access Rights (Includes Starter features, plus)</h4>
    <ul> 
    <li>All Starter benefits</li>
    <li>In-depth Market Summaries</li>
    <li>Interactive Budgeting Tool</li>
    </ul>
    `;
});

openButton3.addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h3>Pro Analyst (The Value Tier)</h3>                 
  <p>This tier is ideal for serious investors and financial enthusiasts who need actionable data, advanced tools, and direct Q&A opportunities. This is often the most popular paid tier.</p>
   <p>Fee: $29.99/month</p>
    <h4>Access Rights (Includes Basic features, plus):</h4>
    <ul> 
    <li>All Basic Access benefits</li>
    <li>Advanced Data Visualization Tools</li>
    <li>Monthly Live Q&A Session with the lead analyst/economist.</li>
    </ul>
  `;
});
openButton4.addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h3>Executive Wealth (The Premium Tier)</h3>                 
  <p>This top-tier level offers highly exclusive, personalized, and time-saving features for high-net-worth individuals or professionals who demand the highest level of detail and convenience.</p>
   <p>Fee: $99.99/month</p>
    <h4>Access Rights (Includes Pro Analyst features, plus):</h4>
    <ul> 
    <li>All Pro Analyst benefits</li>
    <li>Deep Dive" Research Reports</li>
    <li>1-on-1 Strategy Session</li>
    </ul>
  `;
});

// "close" button closes the dialog
closeButton.addEventListener("click", () => {
   dialogBox.close();
});