const nameField = document.querySelector(".nameField");
const nameSubmit = document.querySelector(".nameSubmit");

const nameDisplay = document.querySelector(".nameDisplay");
const gameCount = document.querySelector(".gameCount");

const startButton = document.querySelector(".playStart");
const standButton = document.querySelector(".playStand");
const hitButton = document.querySelector(".playHit");

const cardDisplay = document.createElement('p');
const cardTotalDisplay = document.createElement('p');
const resultDisplay = document.createElement('p');

cardDisplay.textContent = "Cards: ";
cardTotalDisplay.textContent = "Total value: ";
resultDisplay.textContent = "";

document.body.appendChild(cardDisplay);
document.body.appendChild(cardTotalDisplay);
document.body.appendChild(resultDisplay);

let userName = "";
let gamesPlayed = 0;
let playing = false;
let cards = [];

initialise();

function initialise() {
    nameDisplay.textContent = "Your name: ";
    gameCount.textContent = "Game count: 0";
    nameSubmit.addEventListener("click", checkName);
    startButton.addEventListener("click", startGame);
    standButton.addEventListener("click", playerStand);
    hitButton.addEventListener("click", playerHit);
    disableGame();
}

function disableGame() {
    standButton.disabled = true;
    hitButton.disabled = true;
    startButton.disabled = false;
}

function checkName() {
    const iName = String(nameField.value);
    userName = iName;
    nameDisplay.textContent = "Your name: " + userName;
}

function updateStats() {
    gameCount.textContent = "Game count: " + gamesPlayed;
}

function updateCards() {
    cardDisplay.textContent = "Cards: " + cards.toString();
    cardTotalDisplay.textContent = "Total value: " + cardsValue();
}

function startGame() {
    if (userName === "") {
        alert("First set a name!");
        return;
    }
    gamesPlayed++;
    updateStats();
    playing = true;
    standButton.disabled = false;
    hitButton.disabled = false;
    startButton.disabled = true;
    cards = [];
    resultDisplay.textContent = "";
    newCard();
    newCard();
}

function cardsValue() {
    totalValue = 0;
    // The face cards aren't worth over 10
    cards.forEach(card => totalValue += Math.min(card, 10));
    // Other method
    //for (index in cards) {
    //    totalValue += Math.min(cards[index], 10);
    //}
    return totalValue;
}

function checkHand() {
    totalValue = cardsValue();
    if (totalValue > 21) {
        alert("Card value over 21!");
        endGame("You went over 21!");
    }
}

function newCard() {
    let rng = Math.floor(Math.random() * 14);
    cards.push(rng);
    updateCards();
}

function endGame(reason) {
    disableGame();
    resultDisplay.textContent = reason;
}

function playerStand() {
    //alert("You stand");
    endGame("You stood at " + cardsValue());
}

function playerHit() {
    //alert("You hit");
    newCard();
    checkHand();
}