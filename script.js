/* ------- SELECTORS ------- */

// Main windows
const entryDiv = document.querySelector(".entry-div");
const gameDiv = document.querySelector(".game-div");
const backDiv = document.querySelector(".back-div");
const rulesDiv = document.querySelector(".rules-div");

// Containers inside game div
const cardsDiv = document.querySelector(".cards-div");
const scoreTag = document.querySelector(".player-score");
const messageDiv = document.querySelector(".message-div");
const messageTag = document.querySelector(".message");
const deckDiv = document.querySelector(".deck-div");

// Buttons
const entryBtn = document.querySelector(".entry-btn");
const startBtn = document.querySelector(".start-btn");
const dealBtn = document.querySelector(".deal-btn");
const playBtn = document.querySelector(".play-btn");
const replayBtn = document.querySelector(".replay-btn");
const selectCardBtn = document.querySelector(".select-card-btn");
const restartBtn = document.querySelector(".restart-btn");

/* ------- HELPER FUNCTIONS FOR CARDS ------ */

// Hand length is always 5.
// Create array with 5 empty strings
const hand = [];
const createHand = () => {
  for (i = 0; i < 5; i += 1) {
    hand.push("");
    console.log(`hand is `, hand);
  }
  return hand;
};

// Create equivalent div where I can add the click event at that position
// Returns the cardTag that I can use to manipulate
const createCardDiv = (index) => {
  const cardTag = document.createElement("div");
  cardTag.classList.add(`card-${index}`);
  cardTag.addEventListener("click", () => {
    console.log(`card has been clicked`);
    removeCardDisplay(index);
  });
  cardsDiv.appendChild(cardTag);
  return cardTag;
};

// Takes in a card object and displays as a card on DOM
const displayCard = (cardObj, cardTag) => {
  const imgPath = cardObj.img;
  const imageTag = document.createElement("img");
  imageTag.classList.add("card");
  imageTag.src = `${imgPath}`;
  cardTag.appendChild(imageTag);
};

// Finds empty space in the array hand and adds a random card object inside
const replaceCards = () => {
  for (i = 0; i < hand.length; i += 1) {
    if (hand[i] === "") {
      hand[i] = deck.shift();
    }
  }
};

// Additional: User cannot remove more than 3 cards
// If user clicks on the 4th empty card, print "you can only remove 3 cards"
// Removes card from display at that position and changes the hand array
const removeCardDisplay = (index) => {
  console.log("clicked on element number ", index);

  // Checks that card that is clicked is not empty
  if (hand[index] !== "") {
    const clickedCard = hand[index]; // cardObj
    const clickedCardTag = document.querySelector(`.card-${index} img`);

    // Change image to empty card border
    clickedCardTag.src = `cards/back/empty.png`;

    // Remove the card object from the array by reassigning it to empty string
    hand[index] = "";
  }
};

/* -------- CALCULATING HAND SCORE ---------- */

// Takes in array and calculate score of the ranks
const basicScore = (arr) => {
  let score = 0;
  for (i = 0; i < arr.length; i += 1) {
    score += arr[i].rank;
    // Should take in the multipliers for the type of hand we have (straight, flush etc.)
  }
  return score;
};

// Score begins at 100
let score = 100;
let isZero = true;

// Order of overriding the different winning ranks
// Takes in array hand of cards, prints in HTML, gives the multiplier score
const calcHand = (arr) => {
  // Confetti set to false at the start of every calcHand
  celebrateHand = false;

  const tallyObj = tallyCards(hand);
  console.log(`tally object is `, tallyObj);
  const cardCounts = Object.values(tallyObj);
  const cardTypes = Object.keys(tallyObj);

  const royalFlushArr = ["10", "A", "J", "K", "Q"];
  const twoPairsArr = [1, 2, 2];
  const flushArr = [2, 3];
  const oneCountArr = [1, 1, 1, 1, 1];

  // Check suits inside each card object
  if (isSameSuit(hand)) {
    isZero = false;
    const winningSuit = hand[0].suit;

    if (matchArr(cardTypes, royalFlushArr)) {
      celebrateHand = true;
      printMessage(`Royal flush of ${winningSuit}`);
      return (score *= 800);
    }

    if (isStraight(hand)) {
      celebrateHand = true;
      printMessage(`Straight flush of ${winningSuit}`);
      return (score *= 50);
    } else {
      printMessage(`Flush of ${winningSuit}`);
      return (score *= 6);
    }
  }

  if (isStraight(hand)) {
    isZero = false;
    printMessage(`Straight`);
    return (score *= 4);
  }

  // Checks for [2 , 2 , 1]. We don't want [3, 1, 1]
  if (matchArr(cardCounts, twoPairsArr) === true) {
    isZero = false;
    printMessage(`Two pairs`);
  }

  // Checks for [3, 2]
  if (matchArr(cardCounts, flushArr) === true) {
    isZero = false;
    celebrateHand = true;
    printMessage(`Full house`);
  }

  // Checks for no repeating cards and prints Jacks or Better
  if (
    matchArr(cardCounts, oneCountArr) === true &&
    isJacksOrBetter(hand) === true
  ) {
    celebrateHand = true;
    isZero = false;
    return score;
  }

  // Loop inside the card tally
  // Still need to print out what card type
  for (const [cardType, cardCount] of Object.entries(tallyObj)) {
    console.log(`there is ${cardCount} ${cardType}s in the hand`);

    if (cardCount === 4) {
      celebrateHand = true;
      printMessage(`Four of a kind of ${cardType}`);
      isZero = false;
      return (score *= 25);
    }
    if (cardCount === 3) {
      printMessage(`Three of a kind of ${cardType}`);
      isZero = false;
      score *= 3;
    }
    if (cardCount === 2) {
      printMessage(`One pair of ${cardType}`);
      isZero = false;
      score *= 2;
    }
  }

  console.log(`is zero is`, isZero);
  if (isZero == true) {
    score = 0;
  }
  console.log(`final score is `, score);
  return score;
};

/* ------- HELPER HAND RANKING FUNCTIONS ------ */

const matchArr = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  arr1.sort();

  // Check if all items exist and are in the same order
  for (i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) return false;
  }
  // Otherwise, return true
  return true;
};

const isJacksOrBetter = (arr) => {
  for (i = 0; i < arr.length; i += 1) {
    if (
      hand[i].name === "A" ||
      hand[i].name === "J" ||
      hand[i].name === "Q" ||
      hand[i].name === "K"
    ) {
      printMessage(`Jacks or Better with ${hand[i].name} of ${hand[i].suit}`);
    }
  }
  return true;
};

const isSameSuit = (cardObjArr) => {
  for (i = 0; i < cardObjArr.length; i += 1) {
    if (cardObjArr[i].suit !== cardObjArr[0].suit) {
      return false;
    }
  }
  return true;
};

// Takes array of card objects
const isStraight = (cardObjArr) => {
  const numArr = [];
  let addSumOfArr = 0;

  for (i = 0; i < cardObjArr.length; i += 1) {
    numArr.push(cardObjArr[i].number);
    addSumOfArr += cardObjArr[i].number;
  }
  // Sort from lowest to highest
  numArr.sort((a, b) => a - b);
  console.log(`numbers array is `, numArr);
  const lowestNum = numArr[0];

  // Sum of the numbers
  if (addSumOfArr === calcStraightSum(lowestNum)) {
    return true;
  } else {
    return false;
  }
};

const calcStraightSum = (firstTerm) => {
  const sum = 2.5 * (2 * firstTerm + 4);
  return sum;
};

// Adds list-item about what is true inside the hand
const printMessage = (message) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = message;
  messageTag.appendChild(listItem);
};

// Takes in an array of objects
// Returns object to store how many times a card type occurs
const tallyCards = (arr) => {
  const cardTypes = {};

  for (i = 0; i < hand.length; i += 1) {
    // Get the name of the card
    const cardType = hand[i].name;

    // See if we have already recorded
    // One card in the tally already
    if (cardTypes[cardType] === undefined) {
      // This card has never been seen before
      // Start with tally of one
      cardTypes[cardType] = 1;
    } else {
      // Increment the tally
      cardTypes[cardType] += 1;
    }
  }
  return cardTypes;
};

/* ------- GAME PLAY ------ */

// Settings & permissions
const initSettings = () => {
  entryDiv.style.display = "block";
  gameDiv.style.display = "none";
  backDiv.style.display = "none";
  rulesDiv.style.display = "none";
  gameDiv.style.display = "none";
};

initSettings();

entryBtn.addEventListener("click", () => {
  entryDiv.style.display = "none";
  gameDiv.style.display = "none";
  backDiv.style.display = "block";
  rulesDiv.style.display = "none";
  gameDiv.style.display = "none";
});

let selectedBackImg;

selectCardBtn.addEventListener("click", () => {
  // Display selected card back as deck face down
  selectedBackImg = selectedBack.getElementsByTagName("img")[0].src;
  console.log(`selected back img `, selectedBackImg);
  const deckFaceDown = document.createElement("img");
  deckFaceDown.setAttribute("src", selectedBackImg);
  // deckFaceDown.src = selecte dBackImg;
  deckFaceDown.style.transform = "rotate(-90deg)";
  deckDiv.appendChild(deckFaceDown);

  backDiv.style.display = "none";
  rulesDiv.style.display = "block";
  gameDiv.style.display = "block";

  initGame();
});

// Initialize game
const initGame = () => {
  startBtn.style.display = "inline";
  dealBtn.style.display = "inline";

  playBtn.style.display = "none";
  replayBtn.style.display = "none";
  restartBtn.style.display = "none";

  // Hide the opening window
  entryDiv.style.display = "none";
};

// When the clicks "Start"
startBtn.addEventListener("click", () => {
  // Show Play, hide Start
  playBtn.style.display = "inline";
  startBtn.style.display = "none";

  // Deal the first five random cards in the array
  createHand();
  replaceCards();

  // Creates the display for the hand of cards
  for (i = 0; i < hand.length; i += 1) {
    const cardTag = createCardDiv(i);
    displayCard(hand[i], cardTag);
  }
});

// When user clicks "Deal", the game deals the cards, add to hand
dealBtn.addEventListener("click", () => {
  if (deck.length < 5) {
    // When run out of cards
    deckDiv.innerHTML = "";
    printMessage(`GAME OVER.<br>You scored ${score} points.`);
    playBtn.style.display = "none";
    dealBtn.style.display = "none";
    restartBtn.style.display = "block";
  } else {
    replaceCards();
    // Empty previous div & display hand of cards
    cardsDiv.innerHTML = "";
    for (i = 0; i < hand.length; i += 1) {
      const cardTag = createCardDiv(i);
      displayCard(hand[i], cardTag);
    }
  }
});

// The users selects which cards they want to keep & signal "Play"
playBtn.addEventListener("click", () => {
  // Calculate the score
  score = calcHand(hand);
  if (celebrateHand) poof();
  scoreTag.innerHTML = score;
  playBtn.style.display = "none";
  replayBtn.style.display = "inline";
  dealBtn.disabled = true;
  printMessage(`Replay?`);
});

replayBtn.addEventListener("click", () => {
  confettiContainer.innerHTML = "";
  // Empty the hand;
  hand.splice(0, hand.length);
  cardsDiv.innerHTML = "";
  startBtn.style.display = "inline";
  dealBtn.style.display = "inline";
  dealBtn.disabled = false;
  playBtn.style.display = "none";
  replayBtn.style.display = "none";
  messageTag.innerHTML = "";
});

restartBtn.addEventListener("click", () => {
  deck = shuffleCards(makeDeck());
  cardsDiv.innerHTML = "";
  // Empty the array
  hand.splice(0, hand.length);
  initGame();
});
