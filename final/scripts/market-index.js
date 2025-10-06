// 1. Get TSMC data from Marketstack API
// 1-1.Marketstack API Key 
const ACCESS_KEY = "63ce24ce7800fd1b49a1067306b3c721"; 


// 1-2. get data of symbol 2330.XTAI: TSMC

const TSMC_SYMBOL = "2330.XTAI";

const API_URL = `https://api.marketstack.com/v1/eod?access_key=${ACCESS_KEY}&symbols=${TSMC_SYMBOL}&limit=1`;

// Cache key setting
const CACHE_KEY = 'stock_dashboard_data';

const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hrs' micro secs
const dataBody = document.getElementById('data-body');
const statusElement = document.getElementById('status-message');

// Target name correspondence table (Marketstack only provides code names)
const SYMBOL_NAMES = {
    "2330.XTAI": "TSMC",
};

/**
 * format number
 */
const formatNumber = (num, decimals = 2) => {
    if (num === null || isNaN(num)) return '-';
    return num.toFixed(decimals).toLocaleString('en-US');
};

/**
 * main function：fetch and render data (with cache checked)
 */
async function fetchAndRenderData() {
    
    const cachedItem = JSON.parse(localStorage.getItem(CACHE_KEY));
    const now = Date.now();

    // 1. check cache
        if (cachedItem && (now - cachedItem.timestamp < CACHE_EXPIRY)) {
        statusElement.className = 'status';
        statusElement.textContent = `Data from cache, last updated on：${new Date(cachedItem.timestamp).toLocaleTimeString('zh-US')} (*1)`;
        renderTable(cachedItem.data);
        return; // **use cache data, end the funciton and not sent the API request**
    }

    // 2. cache expired or didn't exist, send an API request
    statusElement.textContent = 'Cache expired, sending Marketstack API request... ';
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);

        if (data.error) {
            statusElement.className = 'status error';
            statusElement.textContent = `Marketstack：${data.error.message} (Code: ${data.error.code}). Check your API Key and quota.`;
            return;
        }

        const rawDataArray = data.data;

        if (rawDataArray && rawDataArray.length > 0) {
            // 3. store new data to the cache
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: rawDataArray,
                timestamp: now
            }));
            
            statusElement.className = 'status';
            statusElement.textContent = `Upadated time: ${new Date(now).toLocaleTimeString('zh-US')}`;
            renderTable(rawDataArray);
        } else {
            statusElement.className = 'status error';
            statusElement.textContent = 'Error：API return successfully, but no data.';
        }

    } catch (error) {
        console.error('Fetch Error:', error);
        statusElement.className = 'status error';
        statusElement.textContent = `連線或網路錯誤：${error.message}`;
    }
}

/**
 * 渲染數據到 HTML 表格
 * @param {Array} dataArray - 從 API 或快取獲取的數據陣列
 */
function renderTable(dataArray) {
    dataBody.innerHTML = ''; // 清空舊數據

    // 確保標的找到，並按照我們想要的順序渲染
    const orderedSymbols = ["2330.XTAI"];
    
    orderedSymbols.forEach(symbol => {
        const item = dataArray.find(d => d.symbol === symbol);
        
        if (item) {
            const row = createTableRow(item);
            dataBody.appendChild(row);
        } else {
             // 如果找不到該標的，顯示錯誤行
            const errorRow = document.createElement('tr');
            errorRow.innerHTML = `<td colspan="4" class="error">${symbol} 數據遺失</td>`;
            dataBody.appendChild(errorRow);
        }
    });
}

/**
 * 創建單一行表格元素
 * @param {Object} item - 單一標的的數據物件
 * @returns {HTMLTableRowElement}
 */
function createTableRow(item) {
    const row = document.createElement('tr');
    
    // 計算漲跌邏輯
    const closePrice = item.close;
    // 使用 adj_close 作為前一日收盤價
    const previousClose = item.adj_close || item.open; 
    
    let change = 0;
    let changePct = 0;

    if (previousClose) {
        change = closePrice - previousClose;
        changePct = (change / previousClose) * 100;
    }

    const priceClass = change >= 0 ? 'price-up' : 'price-down';
    const changeSymbol = change >= 0 ? '+' : '';
    
    row.innerHTML = `
        <td>
            <strong>${item.symbol}</strong>
            <br>${SYMBOL_NAMES[item.symbol] || '未知名稱'}
        </td>
        <td class="${priceClass}">${formatNumber(closePrice, 2)}</td>
        <td class="${priceClass}">
            ${changeSymbol}${formatNumber(change)} 
            (${changeSymbol}${formatNumber(changePct, 2)}%)
        </td>
        <td>${item.date.substring(0, 10)}</td>
    `;
    
    return row;
}

// Start function
fetchAndRenderData();

