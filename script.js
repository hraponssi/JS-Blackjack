const nameField = document.querySelector(".nameField");
const nameSubmit = document.querySelector(".nameSubmit");

const nameDisplay = document.querySelector(".nameDisplay");
const gameCount = document.querySelector(".gameCount");

const startButton = document.querySelector(".playStart");
const standButton = document.querySelector(".playStand");
const hitButton = document.querySelector(".playHit");

const gameSection = document.querySelector(".gameSection");
const gameContent = document.querySelector(".gameContent");

const cardDisplay = document.querySelector(".cardDisplay");
const cardTotalDisplay = document.querySelector(".cardTotalDisplay");
const resultDisplay = document.querySelector(".resultDisplay");
const dealerDisplay = document.querySelector(".dealerDisplay");
const dealerTotalDisplay = document.querySelector(".dealerTotalDisplay");
const dealerResultDisplay = document.querySelector(".dealerResultDisplay");
const winnerDisplay = document.querySelector(".winnerDisplay");

cardDisplay.textContent = "Your cards: ";
cardTotalDisplay.textContent = "Total value: ";
resultDisplay.textContent = "";
dealerDisplay.textContent = "The dealers hand: ";
dealerTotalDisplay.textContent = "Dealer value: ";
dealerResultDisplay.textContent = "";
winnerDisplay.textContent = "";

let userName = "";
let gamesPlayed = 0;
let winCount = 0;
let playing = false;
let cards = [];
let dcards = [];
let showDealerHand = false;

initialise();

function initialise() {
    nameDisplay.textContent = "Your name: ";
    gameCount.textContent = "Game count: 0, Win count: 0 (0%)";
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
    gameSection.style.visibility = "visible";
    gameContent.style.visibility = "visible";
}

function updateStats() {
    gameCount.textContent = "Game count: " + gamesPlayed + ", Win count: " + winCount + " (" + Math.floor(winCount*100/gamesPlayed) + "%)";
}

function updateCards() {
    cardDisplay.textContent = "Your cards: " + cards.toString();
    cardTotalDisplay.textContent = "Total value: " + cardsValue(cards);
    if (dcards.length === 0) {
        dealerDisplay.textContent = "The dealers hand: ";
        dealerTotalDisplay.textContent = "Dealer value: ";
    } else if (showDealerHand) {
        dealerDisplay.textContent = "The dealers hand: " + dcards.toString();
        dealerTotalDisplay.textContent = "Dealer value: " + cardsValue(dcards);
    } else {
        let dtext = "The dealers hand: ";
        let first = true;
        for (dcard of dcards) {
            if (first) {
                dtext += dcard;
                first = false;
            } else {
                dtext += ", x"
            }
        }
        dealerDisplay.textContent = dtext;
    }
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
    dcards = [];
    showDealerHand = false;
    dealerDisplay.textContent = "The dealers hand: ";
    dealerResultDisplay.textContent = "";
    resultDisplay.textContent = "";
    winnerDisplay.textContent = "";
    newPlayerCard();
    newPlayerCard();
    newDealerCard();
    newDealerCard();
}

function cardsValue(cardset) {
    totalValue = 0;
    // The face cards aren't worth over 10
    cardset.forEach(card => totalValue += Math.min(card, 10));
    // Other method
    //for (index in cards) {
    //    totalValue += Math.min(cards[index], 10);
    //}
    return totalValue;
}

function cardsOver(cardset) {  //Return true if hand is over 21
    totalValue = cardsValue(cardset);
    if (totalValue > 21){
        return true;
    }
    return false;
}

function newCard() {
    let rng = Math.floor(Math.random() * 13)+1;
    return rng;
}

function newDealerCard() {
    let ncard = newCard();
    dcards.push(ncard);
    updateCards();
}

function newPlayerCard() {
    let ncard = newCard();
    cards.push(ncard);
    updateCards();
}

function checkWinner() {
    let dplaying = true;
    while (dplaying) {
        let handval = cardsValue(dcards);
        if (handval < 17) {
            newDealerCard();
        } else {
            if (cardsOver(dcards)) {
                dealerResultDisplay.textContent = "The dealer went over 21!";
                if (cardsOver(cards)) return "dealer";
                return userName;
            } else {
                let phand = cardsValue(cards);
                if (cardsOver(cards)) {
                    return "dealer";
                } else if (handval > phand) {
                    return "dealer";
                } else if (handval === phand) {
                    return "push"
                } else {
                    return userName;
                }
            }
            dplaying = false;
        }
    }
}

function endGame(reason) {
    showDealerHand = true;
    updateCards();
    let winner = checkWinner();
    winnerDisplay.textContent = "Winner: " + winner;
    if (winner === userName) {
        winCount++;
        winnerDisplay.style.color = "green";
    } else if (winner === "dealer") {
        winnerDisplay.style.color = "red";
    } else {
        winnerDisplay.style.color = "yellow";
    }
    disableGame();
    resultDisplay.textContent = reason;
    updateStats();
}

function playerStand() {
    //alert("You stand");
    endGame("You stood at " + cardsValue(cards));
}

function playerHit() {
    //alert("You hit");
    newPlayerCard();
    if (cardsOver(cards)) {
        //alert("Card value over 21!");
        endGame("You went over 21! You had: " + cardsValue(cards));
    }
}
