let cards;
let playerCardsNo = [];
let playerCardsSuit = [];
const playerScore = document.getElementsByClassName("player-credits")[0];
//create deck and shuffle
const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ["♥️", "♦️", "♣️", "♠️"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    // console.log(`current suit: ${currentSuit}`);

    // loop to create all cards in this suit
    // rank 1-14
    for (let rankCounter = 1; rankCounter < 14; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === "1") {
        cardName = "ace";
      } else if (cardName === "11") {
        cardName = "jack";
      } else if (cardName === "12") {
        cardName = "queen";
      } else if (cardName === "13") {
        cardName = "king";
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(card);
    }
  }

  return newDeck;
};
const getRandomIndex = (max) => Math.floor(Math.random() * max);
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};
//draw 5 cards
let card1Text = "";
let card2Text = "";
let card3Text = "";
let card4Text = "";
let card5Text = "";
const card1 = document.getElementsByClassName("card-1")[0];
const card2 = document.getElementsByClassName("card-2")[0];
const card3 = document.getElementsByClassName("card-3")[0];
const card4 = document.getElementsByClassName("card-4")[0];
const card5 = document.getElementsByClassName("card-5")[0];
const generateCards = () => {
  card1Text = outputCards(cards, 0);
  card1.innerText = card1Text;
  card1.addEventListener("click", () => {
    card1Text = outputCards(cards, 0);
  });
  card2Text = outputCards(cards, 1);
  card2.innerText = card2Text;
  card2.addEventListener("click", () => {
    card2Text = outputCards(cards, 1);
  });
  card3Text = outputCards(cards, 2);
  card3.innerText = card3Text;
  card3.addEventListener("click", () => {
    card3Text = outputCards(cards, 2);
  });
  card4Text = outputCards(cards, 3);
  card4.innerText = card4Text;
  card4.addEventListener("click", () => {
    card4Text = outputCards(cards, 3);
  });
  card5Text = outputCards(cards, 4);
  card5.innerText = card5Text;
  card5.addEventListener("click", () => {
    card5Text = outputCards(cards, 4);
  });
};
const outputCards = (cards, cardNo) => {
  const cardRemoved = cards.pop();
  playerCardsNo[cardNo] = cardRemoved.rank;
  playerCardsSuit[cardNo] = cardRemoved.suit;
  const cardOutput = `${cardRemoved.name}\n${cardRemoved.suit}`;
  console.log(cardOutput);
  return cardOutput;
};
//select cards to switch out
document
  .getElementsByClassName("complete-turn")[0]
  .addEventListener("click", () => {
    card1.innerText = card1Text;
    card2.innerText = card2Text;
    card3.innerText = card3Text;
    card4.innerText = card4Text;
    card5.innerText = card5Text;
    checkWinningConditions();
  });

//produce result
const rankCounter = {};
let suitCounter = {};
let rankCounterKeysNo = [];
const tallyCounts = () => {
  for (i = 0; i < 5; i++) {
    const cardNoProperty = playerCardsNo[i];
    const cardSuitProperty = playerCardsSuit[i];
    if (rankCounter[cardNoProperty]) {
      rankCounter[cardNoProperty] = rankCounter[cardNoProperty] + 1;
    } else {
      rankCounter[cardNoProperty] = 1;
    }
    if (suitCounter[cardSuitProperty]) {
      suitCounter[cardSuitProperty] = suitCounter[cardSuitProperty] + 1;
    } else {
      suitCounter[cardSuitProperty] = 1;
    }
  }
};
let creditWon = 100;
const checkWinningConditions = () => {
  tallyCounts();
  const rankCounterValues = Object.values(rankCounter);
  const rankCounterKeys = Object.keys(rankCounter);
  for (i = 0; i < rankCounterKeys.length; i++) {
    const numberAdded = parseInt(rankCounterKeys[i]);
    rankCounterKeysNo.push(numberAdded);
  }
  console.log(rankCounterKeysNo);
  if (Object.keys(suitCounter).length === 1) {
    //check if flush or straight flush
    rankCounterKeys.sort();
    let consecutiveNumbers = 0;
    for (i = 1; i < 5; i++) {
      if (rankCounterKeysNo[i] - rankCounterKeysNo[i - 1] === 1) {
        consecutiveNumbers += 1;
      }
    }
    if (consecutiveNumbers === 5) {
      creditWon += 10000;
      console.log("Straight Flush");
    } else {
      creditWon += 500;
      console.log("Flush");
    }
  }
  if (Math.max(...rankCounterValues) === 4) {
    creditWon += 1500;
    console.log("4 of a kind");
    //win 4 of a kind
  }
  if (Math.max(...rankCounterValues) === 3) {
    const index = rankCounterValues.indexOf(3);
    rankCounterValues.splice(index, 1);
    if (Math.max(...rankCounterValues) === 2) {
      console.log("Full house");
      creditWon += 1000;
    } else {
      console.log("3 of a kind");
      creditWon += 60;
    }
  }
  if (Math.max(...rankCounterValues) === 2) {
    const index = rankCounterValues.indexOf(3);
    rankCounterValues.splice(index, 1);
    if (Math.max(...rankCounterValues) === 2) {
      console.log("2 Pair");
      creditWon += 40;
    } else {
      console.log("1 Pair");
      creditWon += 20;
    }
  }
  if (Object.keys(rankCounter).length === 5) {
    //check if Straight
    rankCounterKeysNo.sort((a, b) => a - b);
    let consecutiveNumbers = 0;
    for (i = 1; i < 5; i++) {
      if (rankCounterKeysNo[i] - rankCounterKeysNo[i - 1] === 1) {
        consecutiveNumbers += 1;
        console.log(consecutiveNumbers);
        console.log(rankCounterKeysNo[i]);
      } else {
        console.log(`not ${rankCounterKeysNo[i]}`);
      }
    }
    if (consecutiveNumbers === 5) {
      console.log("Straight");
      creditWon += 100;
    }
    if (
      consecutiveNumbers === 3 &&
      rankCounterKeysNo.indexOf(13) != -1 &&
      rankCounterKeysNo.indexOf(1) != -1
    ) {
      console.log("Straight");
    } else {
      console.log("Nothing");
      creditWon -= 20;
    }
  }
  playerScore.innerHTML = `Player: ${creditWon} Credits`;
};
//play again

//init game

const initGame = () => {
  cards = shuffleCards(makeDeck());
  generateCards();
};

initGame();
