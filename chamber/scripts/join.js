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

// Get the submission date from hidden column
// Step1
        const formLoadTimeInput = document.getElementById('formLoadTime');
        const timestamp = Date.now();
        
        // 將時間戳設定為欄位的值。當表單提交時，這個值就會被傳送到伺服器 (或 thank-you 頁面)
        if (formLoadTimeInput) {
            formLoadTimeInput.value = timestamp;
            // console.log(`表單載入時間戳已設定為: ${timestamp}`);
        };

        function formatTimestamp(timestamp) {
            if (!timestamp) return 'N/A';
            const date = new Date(parseInt(timestamp));

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
        };




// ---------- Title validation
const orgTitleInput = document.getElementById('org-title');
  const errorMessage = document.getElementById('error-message');
  const regex = /^[A-Za-z\s-]{7,}$/; 

  orgTitleInput.addEventListener('input', () => {
    const value = orgTitleInput.value;
    if (regex.test(value)) {
      // 驗證通過
      orgTitleInput.setCustomValidity(''); // 清除自定義錯誤訊息
      errorMessage.textContent = '';
      orgTitleInput.style.borderColor = 'green';
    } else {
      // 驗證失敗
      orgTitleInput.setCustomValidity('Title must contain only English letters, hyphens and spaces and must be at least 7 characters.');
      errorMessage.textContent = 'Title must contain only English letters, hyphens and spaces and must be at least 7 characters.';
      orgTitleInput.style.borderColor = 'red';
      orgTitleInput.style.color = 'red';
    }
  });

  // 確保表單提交時，如果欄位無效，會顯示錯誤訊息
  document.getElementById('myForm').addEventListener('submit', (event) => {
    if (!orgTitleInput.checkValidity()) {
      event.preventDefault(); // 阻止表單提交
    }
  });

