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
let card1Text;
let card2Text;
let card3Text;
let card4Text;
let card5Text;
const card1 = document.getElementsByClassName("card-1")[0];
const card2 = document.getElementsByClassName("card-2")[0];
const card3 = document.getElementsByClassName("card-3")[0];
const card4 = document.getElementsByClassName("card-4")[0];
const card5 = document.getElementsByClassName("card-5")[0];
const card1rank = document.getElementsByClassName("card-1p1")[0];
const card1suit = document.getElementsByClassName("card-1p2")[0];
const card1SuitCenter = document.getElementsByClassName("card-1p2")[1];
const card2rank = document.getElementsByClassName("card-2p1")[0];
const card2suit = document.getElementsByClassName("card-2p2")[0];
const card2SuitCenter = document.getElementsByClassName("card-2p2")[1];
const card3rank = document.getElementsByClassName("card-3p1")[0];
const card3suit = document.getElementsByClassName("card-3p2")[0];
const card3SuitCenter = document.getElementsByClassName("card-3p2")[1];
const card4rank = document.getElementsByClassName("card-4p1")[0];
const card4suit = document.getElementsByClassName("card-4p2")[0];
const card4SuitCenter = document.getElementsByClassName("card-4p2")[1];
const card5rank = document.getElementsByClassName("card-5p1")[0];
const card5suit = document.getElementsByClassName("card-5p2")[0];
const card5SuitCenter = document.getElementsByClassName("card-5p2")[1];

const generateCards = () => {
  card1Text = outputCards(cards, 0);
  card1rank.innerText = card1Text.rank;
  card1SuitCenter.innerText = card1Text.suit;
  card1suit.innerText = card1Text.suit;
  card1.addEventListener("click", () => {
    event.currentTarget.style.border = "thick solid turquoise";
    card1Text = outputCards(cards, 0);
  });
  card2Text = outputCards(cards, 1);
  card2rank.innerText = card2Text.rank;
  card2SuitCenter.innerText = card2Text.suit;
  card2suit.innerText = card2Text.suit;
  card2.addEventListener("click", () => {
    event.currentTarget.style.border = "thick solid turquoise";
    card2Text = outputCards(cards, 1);
  });
  card3Text = outputCards(cards, 2);
  card3rank.innerText = card3Text.rank;
  card3SuitCenter.innerText = card3Text.suit;
  card3suit.innerText = card3Text.suit;
  card3.addEventListener("click", () => {
    event.currentTarget.style.border = "thick solid turquoise";
    card3Text = outputCards(cards, 2);
  });
  card4Text = outputCards(cards, 3);
  card4rank.innerText = card4Text.rank;
  card4SuitCenter.innerText = card4Text.suit;
  card4suit.innerText = card4Text.suit;
  card4.addEventListener("click", () => {
    event.currentTarget.style.border = "thick solid turquoise";
    card4Text = outputCards(cards, 3);
  });
  card5Text = outputCards(cards, 4);
  card5rank.innerText = card5Text.rank;
  card5SuitCenter.innerText = card5Text.suit;
  card5suit.innerText = card5Text.suit;
  card5.addEventListener("click", () => {
    event.currentTarget.style.border = "thick solid turquoise";
    card5Text = outputCards(cards, 4);
  });
};
const outputCards = (cards, cardNo) => {
  const cardRemoved = cards.pop();
  playerCardsNo[cardNo] = cardRemoved.rank;
  playerCardsSuit[cardNo] = cardRemoved.suit;
  console.log(cardRemoved);
  return cardRemoved;
};
//select cards to switch out
document
  .getElementsByClassName("complete-turn")[0]
  .addEventListener("click", () => {
    card1rank.innerText = card1Text.rank;
    card1SuitCenter.innerText = card1Text.suit;
    card1suit.innerText = card1Text.suit;
    card2rank.innerText = card2Text.rank;
    card2SuitCenter.innerText = card2Text.suit;
    card2suit.innerText = card2Text.suit;
    card3rank.innerText = card3Text.rank;
    card3SuitCenter.innerText = card3Text.suit;
    card3suit.innerText = card3Text.suit;
    card4rank.innerText = card4Text.rank;
    card4SuitCenter.innerText = card4Text.suit;
    card4suit.innerText = card4Text.suit;
    card5rank.innerText = card5Text.rank;
    card5SuitCenter.innerText = card5Text.suit;
    card5suit.innerText = card5Text.suit;
    document.getElementsByClassName("cards")[0].style.border = "none";
    document.getElementsByClassName("cards")[1].style.border = "none";
    document.getElementsByClassName("cards")[2].style.border = "none";
    document.getElementsByClassName("cards")[3].style.border = "none";
    document.getElementsByClassName("cards")[4].style.border = "none";
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
let creditWon = 0;
let remainingCredit = 100;
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
      creditWon = 10000;
      remainingCredit += 10000;
      console.log("Straight Flush");
    } else {
      creditWon = 500;
      remainingCredit += 500;
      console.log("Flush");
    }
  }
  if (Math.max(...rankCounterValues) === 4) {
    creditWon = 1500;
    remainingCredit += 1500;
    console.log("4 of a kind");
    //win 4 of a kind
  }
  if (Math.max(...rankCounterValues) === 3) {
    const index = rankCounterValues.indexOf(3);
    rankCounterValues.splice(index, 1);
    if (Math.max(...rankCounterValues) === 2) {
      console.log("Full house");
      creditWon = 1000;
      remainingCredit += 1000;
    } else {
      console.log("3 of a kind");
      creditWon = 60;
      remainingCredit += 60;
    }
  }
  if (Math.max(...rankCounterValues) === 2) {
    const index = rankCounterValues.indexOf(3);
    rankCounterValues.splice(index, 1);
    if (Math.max(...rankCounterValues) === 2) {
      console.log("2 Pair");
      creditWon = 40;
      remainingCredit += 40;
    } else {
      console.log("1 Pair");
      creditWon = 20;
      remainingCredit += 20;
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
      creditWon = 100;
      remainingCredit += 100;
    }
    if (
      consecutiveNumbers === 3 &&
      rankCounterKeysNo.indexOf(13) != -1 &&
      rankCounterKeysNo.indexOf(1) != -1
    ) {
      console.log("Straight");
    } else {
      console.log("Nothing");
      creditWon = 20;
      remainingCredit -= 20;
    }
  }
  playerScore.innerHTML = `Player: ${creditWon} Credits`;
};
//play again
const playAgain = () => {
  const popUp = document.createElement("div");
  popUp.classList.add("pop-up");
  const popUpText = document.createElement("p");
  popUpText.classList.add("pop-up-text");
  let displayMessage = "";
  if (creditWon > 0) {
    displayMessage = "Congrats! You Won ";
  } else {
    displayMessage = "You Lost";
  }
  popUpText.innerText = `${displayMessage}${creditWon} Credits`;
  const popUpButton = document.createElement("button");
  popUpButton.classList.add("pop-up-button");
  popUpButton.innerText = "Play Again";
  popUpButton.addEventListener("click", () => {
    replayGame();
  });
};
const replayGame = () => {
  rankCounter = {};
  suitCounter = {};
  rankCounterKeysNo = [];
  playerCardsNo = [];
  playerCardsSuit = [];
  generateCards();
};
//init game

const initGame = () => {
  cards = shuffleCards(makeDeck());
  generateCards();
};

initGame();
