// 1. Local storage visitor's time and show welcome message.

// import function "displayVisitMessage()"
import { displayVisitMessage } from "./visit.mjs";

// 2. Show TSMC's lastest EOD data from marketstack.

// import funciton generateFinanciaTable()
import { generateFinancialTable } from "./tsmc.mjs";

// 3. Display TSMC Annual Financial Statements.

// import function fetchAndRenderData()

import { fetchAndRenderData } from "./market-index.mjs";


// Execute these three functions after the web page is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
    fetchAndRenderData();
    generateFinancialTable();
});
