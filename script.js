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
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
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

const generateCards = () => {
  card1Text = outputCards(cards, 0);
  card1rank.innerText = card1Text.name;
  card1SuitCenter.innerText = card1Text.suit;
  card1suit.innerText = card1Text.suit;
  card1.addEventListener("click", () => {
    event.currentTarget.style.border = "thick solid turquoise";
    card1Text = outputCards(cards, 0);
  });
  card2Text = outputCards(cards, 1);
  card2rank.innerText = card2Text.name;
  card2SuitCenter.innerText = card2Text.suit;
  card2suit.innerText = card2Text.suit;
  card2.addEventListener("click", () => {
    event.currentTarget.style.border = "thick solid turquoise";
    card2Text = outputCards(cards, 1);
  });
  card3Text = outputCards(cards, 2);
  card3rank.innerText = card3Text.name;
  card3SuitCenter.innerText = card3Text.suit;
  card3suit.innerText = card3Text.suit;
  card3.addEventListener("click", () => {
    event.currentTarget.style.border = "thick solid turquoise";
    card3Text = outputCards(cards, 2);
  });
  card4Text = outputCards(cards, 3);
  card4rank.innerText = card4Text.name;
  card4SuitCenter.innerText = card4Text.suit;
  card4suit.innerText = card4Text.suit;
  card4.addEventListener("click", () => {
    event.currentTarget.style.border = "thick solid turquoise";
    card4Text = outputCards(cards, 3);
  });
  card5Text = outputCards(cards, 4);
  card5rank.innerText = card5Text.name;
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
    document.getElementById("click-audio").play();
    card1rank.innerText = card1Text.name;
    card1SuitCenter.innerText = card1Text.suit;
    card1suit.innerText = card1Text.suit;
    card2rank.innerText = card2Text.name;
    card2SuitCenter.innerText = card2Text.suit;
    card2suit.innerText = card2Text.suit;
    card3rank.innerText = card3Text.name;
    card3SuitCenter.innerText = card3Text.suit;
    card3suit.innerText = card3Text.suit;
    card4rank.innerText = card4Text.name;
    card4SuitCenter.innerText = card4Text.suit;
    card4suit.innerText = card4Text.suit;
    card5rank.innerText = card5Text.name;
    card5SuitCenter.innerText = card5Text.suit;
    card5suit.innerText = card5Text.suit;
    document.getElementsByClassName("cards")[0].style.border = "none";
    document.getElementsByClassName("cards")[1].style.border = "none";
    document.getElementsByClassName("cards")[2].style.border = "none";
    document.getElementsByClassName("cards")[3].style.border = "none";
    document.getElementsByClassName("cards")[4].style.border = "none";
    checkWinningConditions();
    if (creditWon > 19) {
      document.getElementById("click-win").play();
    }
    playAgain();
  });

//produce result
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

const checkForConsecutive = (rankCounterKeysNum) => {
  rankCounterKeysNum.sort((a, b) => a - b);
  let consecutiveNumbers = 0;
  for (i = 1; i < 5; i++) {
    if (rankCounterKeysNum[i] - rankCounterKeysNum[i - 1] === 1) {
      consecutiveNumbers += 1;
    }
  }
  if (consecutiveNumbers === 5) {
    return True;
  } else if (
    consecutiveNumbers === 3 &&
    rankCounterKeysNum.indexOf(13) != -1 &&
    rankCounterKeysNum.indexOf(1) != -1
  ) {
    return True;
  }
};

const checkForFlushOrStraightFlush = () => {
  if (Object.keys(suitCounter).length === 1) {
    //check if flush or straight flush
    if (checkForConsecutive(rankCounterKeysNum) === True) {
      handWon = "Straight Flush";
      creditWon = 10000;
      remainingCredit += 10000;
    } else {
      creditWon = 500;
      remainingCredit += 500;
      handWon = "Flush";
    }
  }
};

const checkFor3OfAKindOrFullHouse = () => {
  if (highestRankFrequency === 3) {
    if (secondHighestRankFrequency === 2) {
      handWon = "Full house";
      creditWon = 1000;
      remainingCredit += 1000;
    } else {
      handWon = "3 of a kind";
      creditWon = 60;
      remainingCredit += 60;
    }
  }
};
const checkFor4OfAKind = () => {
  if (highestRankFrequency === 4) {
    creditWon = 1500;
    remainingCredit += 1500;
    handWon = "4 of a kind";
    //win 4 of a kind
  }
};
const checkForPairNum = () => {
  if (highestRankFrequency === 2) {
    //checks for an additional pair
    if (secondHighestRankFrequency === 2) {
      handWon = "2 Pair";
      creditWon = 40;
      remainingCredit += 40;
    } else {
      handWon = "1 Pair";
      creditWon = 20;
      remainingCredit += 20;
    }
  }
};

const checkForStraightOrNothing = () => {
  if (Object.keys(rankCounter).length === 5) {
    //check if Straight
    if (checkForConsecutive(rankCounterKeysNum)) {
      handWon = "Straight";
      creditWon = 100;
      remainingCredit += 100;
    } else {
      handWon = "Nothing";
      creditWon = -20;
      remainingCredit -= 20;
    }
  }
};

const checkWinningConditions = () => {
  tallyCounts();
  rankCounterValues = Object.values(rankCounter);
  rankCounterKeys = Object.keys(rankCounter);
  rankCounterValues.sort((a, b) => a - b);
  const rankCounterValuesLength = rankCounterValues.length;
  highestRankFrequency = rankCounterValues[rankCounterValuesLength - 1];
  secondHighestRankFrequency = rankCounterValues[rankCounterValuesLength - 2];
  rankCounterKeysNum = rankCounterKeys.map((x) => parseInt(x));
  console.log(rankCounterKeysNum);
  checkForFlushOrStraightFlush();
  checkFor4OfAKind();
  //check for 3 same cards
  checkFor3OfAKindOrFullHouse();
  //checks for a pair
  checkForPairNum();
  checkForStraightOrNothing();
  playerScore.innerHTML = `Player: ${remainingCredit} Credits`;
};
//play again
const playAgain = () => {
  const popUp = document.createElement("div");
  popUp.classList.add("pop-up");
  document.body.appendChild(popUp);
  const popUpText = document.createElement("p");
  popUpText.classList.add("pop-up-text");
  popUp.appendChild(popUpText);
  let displayMessage = "";
  if (creditWon > 0) {
    displayMessage = `${handWon}! Congrats! You Won ${creditWon}`;
  } else {
    displayMessage = "You got nothing :( You Lost 20";
  }
  popUpText.innerText = `${displayMessage} Credits`;
  const popUpButton = document.createElement("button");
  popUpButton.classList.add("pop-up-button");
  popUpButton.innerText = "Play Again";
  popUp.appendChild(popUpButton);
  popUpButton.addEventListener("click", () => {
    document.getElementById("click-audio").play();
    replayGame();
  });
};

const initGame = () => {
  cards = shuffleCards(makeDeck());
  generateCards();
};

const replayGame = () => {
  rankCounter = {};
  suitCounter = {};
  rankCounterKeysNum = [];
  playerCardsNo = [];
  playerCardsSuit = [];
  console.log(cards.length);
  if (cards.length < 15) {
    initGame();
    document.getElementsByClassName("pop-up")[0].remove();
    console.log("added cards");
  } else if (remainingCredit < 20) {
    document.getElementsByClassName("pop-up-text")[0].innerText =
      "Oops you ran out of credit";
    document.getElementsByClassName("pop-up-button")[0].remove();
  } else {
    document.getElementsByClassName("pop-up")[0].remove();
    generateCards();
  }
};
//init game

initGame();
