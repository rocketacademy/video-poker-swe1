/* SELECTORS */

// Containers
const entryDiv = document.querySelector(".entry-div");
const gameDiv = document.querySelector(".game-div");
const cardsDiv = document.querySelector(".cards-div");
const scoreTag = document.querySelector(".player-score");
const messageDiv = document.querySelector(".message-div");

// Message
const messageTag = document.querySelector(".message");

// Buttons
const startBtn = document.querySelector(".start-btn");
const dealBtn = document.querySelector(".deal-btn");
const playBtn = document.querySelector(".play-btn");

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
    console.log(`clicked card tag is `, clickedCardTag);

    // Remove the card object from the array by reassigning it to empty string
    hand[index] = "";
  }
};

/* ------- GAME PLAY ------ */

// Initialize game
const initGame = () => {
  // Hide the opening window
  entryDiv.style.display = "none";
  playBtn.style.display = "none";
};

initGame();

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
  console.log(`deal button was clicked`);
  replaceCards();

  // Empty previous div & display hand of cards
  cardsDiv.innerHTML = "";
  for (i = 0; i < hand.length; i += 1) {
    const cardTag = createCardDiv(i);
    displayCard(hand[i], cardTag);
  }
});

// The users selects which cards they want to keep & signal "Play"
playBtn.addEventListener("click", () => {
  // Calculate the score
  scoreTag.innerHTML = calcHand(hand);
  // Remove the empty boxes that are not filled
});

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
const score = 100;

// Takes in array hand of cards, prints in HTML, gives the multiplier score
const calcHand = (arr) => {
  const tallyObj = tallyCards(hand);
  console.log(`tally object is `, tallyObj);

  // [1] Straight flush
  for (i = 0; i < arr.length; i += 1) {
    if (hand[i].suit === hand[)
  }
  // Same suit & increment by one
  // const containsAll = (arr1, arr2) => 
  // arr2.every(arr2Item => arr1.includes(arr2Item))
  // const sameMembers = (arr1, arr2) => 
  // containsAll(arr1, arr2) && containsAll(arr2, arr1);
  // sameMembers(arr1, arr2);

  // Array of keys
  // const cardNames = Object.keys(tallyObj);
  // Test for straight

  // Array of values
  // const cardValues = Object.values(tallyObj);

  for (const [cardType, cardCount] of Object.entries(tallyObj)) {
    console.log(`there is ${cardCount} ${cardType}s in the hand`); // 2 As in the hand

    // [1] Four of a kind
    if (cardCount === 4) {
      printMessage(`Four of a kind of ${cardType}`);
    }

    // [2] Three of a kind
    if (cardcount === 3) {
      printMessage(`Three of a kind of ${cardType}`);
    }



  }

  // for (i = 0; i < values.length; i += 1) {
  //   if (value[i] === 4) {

  //     printMessage(`Four of a kind of ${}`);
  //     score;
  //   }
  // }

  // Array [key, property] of arrays [ [" ", num] , [" ", num] , [" ", num] , [" ", num] ]
  // const cardEntries = Object.entries(tallyObj);

  return score;
};

/* ------- HAND RANKING FUNCTIONS ------ */

// Adds list-item about what is true inside the hand
const printMessage = (message) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = message;
  messageTag.appendChild(listItem);
};

// Four of a kind
const is4OfAKind = (values) => {};

// Rank 4: Full house
const isFullHouse = (arr) => {};

// Rank 5: Flush
const isFLush = (arr) => {};

// Rank 6: Straight
const isStraight = (arr) => {};

// Rank 7: Three of a kind
const is3OfAKind = (arr) => {};

// Rank 8: Two pair
const is2Pair = (arr) => {};

// Rank 9: One pair
const is1Pair = () => {};

// Rank 10: High card
const isHighCard = (arr) => {};

/* --------------------------- */

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

/** */