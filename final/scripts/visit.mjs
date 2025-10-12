/*** Display Welcome message*/
export function displayVisitMessage() {
    // Use LocalStorage to save user's visit date and show the welcome message for the visitors.
    const messageElement = document.getElementById('visit-message');

    // save the key of last visit date
    const LAST_VISIT_KEY = 'lastVisitDate';

    // get current time (microsecond)
    const now = Date.now();

    // Get the last access time (in milliseconds) stored in the browser's local storage.
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

    let message = "";

    if (!lastVisit) {
        //  1: first visit time
        message = "Welcome! Let us know if you have any questions.";
    } else {
        // time difference calculated
        const timeDifference = now - parseInt(lastVisit);

        // one day：1000ms * 60s * 60min * 24hr
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

        if (timeDifference < oneDayInMilliseconds) {
            // 2: visit time interval < 1 day
            message = "Back so soon! Awesome!";
        } else {
            // 3: visit time interval > 1 day

            // Calculate date (use Math.floor)
            const daysDifference = Math.floor(timeDifference / oneDayInMilliseconds);

            if (daysDifference === 1) {
                // less than one day, display 'day'
                message = `Your last visit was 1 day ago.`;
            } else {
                // more than one day, display 'days'
                message = `Your last visit was ${daysDifference} days ago.`;
            }
        }
    }

    messageElement.textContent = message;

    // Tip: Saved current time as new visit last date.
    // use localStorage.setItem() method
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
}
