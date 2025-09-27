const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");

// get the doalogBox div
const dialogBoxText = document.querySelector("#dialogBox div");

// "show the dialog" button opens the dialog modaly
openButton1.addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
   <h3>Non-Profit Member</h3>                 <p>A special plan designed for non-profit organizations, providing core features to support your mission.</p>
   <p>charge: Free</p>
    <h4>Member rights include：</h4>
    <ul> "Access to basic platform features"</ul>
    <ul> "Monthly newsletter"</ul>
    <ul> "Community forum support"</ul>
    `;
});

openButton2.addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h3>Bronze Member</h3>                 <p>An entry-level plan, perfect for individuals or small teams, offering all essential tools.</p>
   <p>charge: $19.99/month</p>
    <h4>Member rights include：</h4>
    <ul> "All Non-Profit member benefits"</ul>
    <ul> "Ad-free experience"</ul>
    <ul> "Priority customer support"</ul>
    `;
});

openButton3.addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h3>Silver Member</h3>                 <p>An advanced plan with more features and tools, suitable for growing businesses.</p>
   <p>charge: $49.99/month</p>
    <h4>Member rights include：</h4>
    <ul> "All Bronze member benefits"</ul>
    <ul> "Access to exclusive content library"</ul>
    <ul> "Invitation to dedicated webinars"</ul>
  `;
});
openButton4.addEventListener("click", () => {
  dialogBox.showModal();
  dialogBoxText.innerHTML = `
  <h3>Gold Member</h3>                 <p>Our top-tier plan, offering the most comprehensive features and personalized services for large enterprises or professionals.</p>
   <p>charge: $99.99/month</p>
    <h4>Member rights include：</h4>
    <ul> "All Silver member benefits"</ul>
    <ul> "One-on-one consulting sessions"</ul>
    <ul> "Invitation to annual exclusive events"</ul>
  `;
});

// "close" button closes the dialog
closeButton.addEventListener("click", () => {
   dialogBox.close();
});