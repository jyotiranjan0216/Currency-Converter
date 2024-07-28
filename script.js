const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;
const selectOption = document.getElementsByClassName("form");
let btn = document.querySelector("form button");

for(let select of selectOption) {
    for(let code in countryList) {
        let newEle = document.createElement("option");
        newEle.innerText = code;
        newEle.value = code;
        if(select.name === "from" && code === "USD") newEle.selected = "selected";
        if(select.name === "to" && code === "INR") newEle.selected = "selected";
        select.append(newEle);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (ele) => {
    let code = ele.value;
    let country = countryList[code];
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let imgSrc = ele.parentElement.querySelector("img");
    imgSrc.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateMsg();
})

const updateMsg = async () => {
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 0) {
        amtVal = 1;
        amount.value = 1;
    }
    let from = document.querySelector(".option #from1");
    let fromVal = from.value;
    let to = document.querySelector(".option #to1");
    let toVal = to.value;
    const URL = `${BASE_URL}/${fromVal.toLowerCase()}.json`;
    console.log(URL);
    let response = await fetch(URL);
    let data =await response.json();
    let rate = data[fromVal.toLowerCase()];
    let actRate = rate[toVal.toLowerCase()];
    let finalAmount = amtVal * actRate;
    console.log(finalAmount);
    let msg = document.querySelector(".msg");
    msg.innerText = `${amtVal} ${fromVal} = ${finalAmount} ${toVal}`;
}

window.addEventListener("load",updateMsg);