// 1. Get TSMC data from Marketstack API
// 1-1.Marketstack API Key 
const ACCESS_KEY = "63ce24ce7800fd1b49a1067306b3c721"; 


// 1-2. get data of symbol 2330.XTAI: TSMC

const BATCH_SYMBOLS = "2330.XTAI";

const API_URL = `https://api.marketstack.com/v1/eod?access_key=${ACCESS_KEY}&symbols=${BATCH_SYMBOLS}&limit=1`;

// Cache key setting
const CACHE_KEY = 'stock_dashboard_data';

const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hrs' micro secs
const dataBody = document.getElementById('data-body');
const statusElement = document.getElementById('status-message');

// 標的名稱對應表 (Marketstack 只提供代號，需自行對應)
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
 * main function：獲取並渲染數據 (帶有快取檢查)
 */
async function fetchAndRenderData() {
    // 檢查 Key
    if (ACCESS_KEY === "YOUR_MARKETSTACK_API_KEY" || ACCESS_KEY === "") {
        statusElement.className = 'status error';
        statusElement.textContent = '錯誤：請在 script.js 中設定您的 ACCESS_KEY。';
        return;
    }
    
    const cachedItem = JSON.parse(localStorage.getItem(CACHE_KEY));
    const now = Date.now();

    // 1. 檢查快取
    if (cachedItem && (now - cachedItem.timestamp < CACHE_EXPIRY)) {
        statusElement.className = 'status';
        statusElement.textContent = `Data from cache, last updated on：${new Date(cachedItem.timestamp).toLocaleTimeString('zh-US')} (*1)`;
        renderTable(cachedItem.data);
        return; // **使用快取，結束函數，不發送 API 請求**
    }

    // 2. 快取過期或不存在，發送 API 請求
    statusElement.textContent = '快取過期，正在發送 Marketstack API 請求... (消耗 1 次額度)';
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.error) {
            statusElement.className = 'status error';
            statusElement.textContent = `Marketstack 錯誤：${data.error.message} (Code: ${data.error.code})。請檢查您的 API Key 和額度。`;
            return;
        }

        const rawDataArray = data.data;

        if (rawDataArray && rawDataArray.length > 0) {
            // 3. 儲存新數據到快取
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: rawDataArray,
                timestamp: now
            }));
            
            statusElement.className = 'status';
            statusElement.textContent = `數據更新成功！來源 Marketstack API，時間：${new Date(now).toLocaleTimeString('zh-US')}`;
            renderTable(rawDataArray);
        } else {
            statusElement.className = 'status error';
            statusElement.textContent = '錯誤：API 成功返回，但沒有找到數據。';
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

// 啟動數據獲取流程
fetchAndRenderData();

