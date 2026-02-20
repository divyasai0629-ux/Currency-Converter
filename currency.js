const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".select-container select");
const btn = document.querySelector("#get-rate-btn");
const fromCurr = document.querySelector("select[name='from']");
const toCurr = document.querySelector("select[name='to']");
const msg = document.querySelector(".msg");

// Step 1: Populate Dropdowns
if (typeof countryList !== 'undefined') {
    for (let select of dropdowns) {
        for (let currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = `${currCode} - ${countryList[currCode].name}`;
            newOption.value = currCode;
            
            if (select.name === "from" && currCode === "USD") newOption.selected = "selected";
            else if (select.name === "to" && currCode === "INR") newOption.selected = "selected";
            
            select.append(newOption);
        }
        select.addEventListener("change", (evt) => updateFlag(evt.target));
    }
}

// Step 2: Update Flags
function updateFlag(element) {
    let currCode = element.value;
    let flagCode = countryList[currCode].flag;
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${flagCode}/flat/64.png`;
}

// Step 3: API Fetch
const updateExchangeRate = async () => {
    let amountInput = document.querySelector("#user-amount");
    let amtVal = amountInput.value || 1;
    const fromCode = fromCurr.value.toLowerCase();
    const toCode = toCurr.value.toLowerCase();
    
    msg.innerText = "Fetching live rate...";
    try {
        let response = await fetch(`${BASE_URL}/${fromCode}.json`);
        let data = await response.json();
        let rate = data[fromCode][toCode];
        msg.innerText = `${amtVal} ${fromCurr.value} = ${(amtVal * rate).toFixed(2)} ${toCurr.value}`;
    } catch (err) {
        msg.innerText = "Error: Check connection";
    }
};

// Step 4: Listeners
btn.addEventListener("click", (evt) => {
    evt.preventDefault(); 
    updateExchangeRate();
});

window.addEventListener("load", updateExchangeRate);