// Create TSMC table
const financialData = {
    "tsmc": [
        { "Year": 2024, "Net Revenue": 2894307699, "Gross Profit": 1624353564, "Net Income": 1172431759, "EPS": 45.25, "Shareholders' equity": 3665716000 },
        { "Year": 2023, "Net Revenue": 2161735841, "Gross Profit": 1175110628, "Net Income": 837767517, "EPS": 32.34, "Shareholders' equity": 3483262847 },
        { "Year": 2022, "Net Revenue": 2263891292, "Gross Profit": 1348354806, "Net Income": 1016900515, "EPS": 39.2, "Shareholders' equity": 2960488867 },
        { "Year": 2021, "Net Revenue": 1587415037, "Gross Profit": 819537266, "Net Income": 597073134, "EPS": 23.01, "Shareholders' equity": 2170733205 },
        { "Year": 2020, "Net Revenue": 1339254811, "Gross Profit": 711130120, "Net Income": 518158082, "EPS": 19.97, "Shareholders' equity": 1850621999 },
        { "Year": 2019, "Net Revenue": 1069985448, "Gross Profit": 492701896, "Net Income": 345343809, "EPS": 13.32, "Shareholders' equity": 1622095426 },
        { "Year": 2018, "Net Revenue": 1031473557, "Gross Profit": 497874253, "Net Income": 351184406, "EPS": 13.54, "Shareholders' equity": 1677496396 },
        { "Year": 2017, "Net Revenue": 977447241, "Gross Profit": 494826402, "Net Income": 343146848, "EPS": 13.23, "Shareholders' equity": 1522759643 },
        { "Year": 2016, "Net Revenue": 947938344, "Gross Profit": 474832098, "Net Income": 334338236, "EPS": 12.89, "Shareholders' equity": 1390051126 },
        { "Year": 2015, "Net Revenue": 843497368, "Gross Profit": 410394893, "Net Income": 306556167, "EPS": 11.82, "Shareholders' equity": 1222634479 },
        { "Year": 2014, "Net Revenue": 762806465, "Gross Profit": 377722016, "Net Income": 263763958, "EPS": 10.18, "Shareholders' equity": 1046328332 }
    ]
};

// Auxiliary function: format according to field name
function formatFinancialValue(key, value) {
    if (typeof value !== 'number') return value; 

    // Determine whether it is Year or EPS, which requires special processing
    if (key === 'Year') {
        return value.toFixed(0); // No decimal point is required for the year
    }
    if (key === 'EPS') {
        // EPS Keep two decimal places and no thousandths
        return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // For other large figures (revenue, net profit, shareholders' equity), use thousandths and discard decimals
    return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function generateFinancialTable() {
    const dataArray = financialData.tsmc;
    const container = document.getElementById('table-container');

    if (!dataArray || dataArray.length === 0) {
        container.innerHTML = '<p>Unable to load financial data。</p>';
        return;
    }

    const table = document.createElement('table');
    table.classList.add('financial-table');
    
    // 3. Create Table Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = Object.keys(dataArray[0]);
    headers.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // 4. Create Table Body (Use Object.entries() iterate key & value)
    const tbody = document.createElement('tbody');
    
    dataArray.forEach(item => {
        const dataRow = document.createElement('tr');
        
        // 🎯 Use Object.entries to get Key & Value
        Object.entries(item).forEach(([key, value]) => {
            const td = document.createElement('td');
            
            // Use the corrected formatting function
            td.textContent = formatFinancialValue(key, value);
            
            dataRow.appendChild(td);
        });
        
        tbody.appendChild(dataRow);
    });
    
    table.appendChild(tbody);

    // 5. insert Table
    container.innerHTML = ''; 
    container.appendChild(table);
}

