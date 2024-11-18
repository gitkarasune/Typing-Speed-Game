const QUOTE_RANDOM_API = "http://api.quotable.io/random";

const quoteFromApi = document.getElementById("quoteFromApi");
const quoteInput = document.getElementById("quoteInput");
const timerNumber = document.getElementById("timerNumber");

quoteInput.addEventListener("input", () => {
    const arrQuote = quoteFromApi.querySelectorAll("span");
    const arrValue = quoteFromApi.value.split("");

    const correct = true // boolean
    arrQuote.forEach((chtSpan, i) => {
        const character = arrValue[i];

        if (character === null) {
            chtSpan.classList.remove("correct");
            chtSpan.classList.remove("incorrect");
            correct = false;
        } else if (character === chtSpan.innerText) {
            chtSpan.classList.add("correct");
            chtSpan.classList.remove("incorrect");
        } else {
            chtSpan.classList.remove("correct");
            chtSpan.classList.add("incorrect");
            correct = false;
        }
    });

    if (correct) executeQuote();
});

async function getQuote() {
    const response = await fetch(QUOTE_RANDOM_API);
    const data = await response.json();
    return data.content;
};

const executeQuote = async () => {
    const myQuote = await getQuote();
    // this allows us to put the quotes inside of our quoteFromApi
    quoteFromApi.innerHTML = ""

    myQuote.split("").forEach(cht => {
        const newElement = document.createElement("span");
        newElement.innerText = cht;
        
        quoteFromApi.appendChild(newElement);
    });
    quoteInput.value = null;
    startTimer();
}

let startTime; // time
const startTimer = () => {
    timerNumber.innerText = 0;
    startTime = new Date();
    setInterval(()=> {
        // A function
        timerNumber.innerText = getTimer();
    }, 1000);
}

const getTimer = () => {
    return Math.floor((new Date() - startTime) / 1000);
}

executeQuote();