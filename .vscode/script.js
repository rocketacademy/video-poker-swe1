/* SELECTORS */

// Containers
const entryDiv = document.querySelector(".entry-div");
const gameDiv = document.querySelector(".game-div");
const cardsDiv = document.querySelector(".cards-div");
const scoreTag = document.querySelector(".player-score");

// Buttons
const startBtn = document.querySelector(".start-btn");
const dealBtn = document.querySelector(".deal-btn");
const playBtn = document.querySelector(".play-btn");

/* ------- HAND RANKING FUNCTIONS ------ */

// Detects whether poker hand contains a hand rank
// Returns false otherwise

// Need to add a joker in the hand
// Rank 1: Five of a kind
// Rank 2: Straight flush

// Takes in an array and returns a number score
const calcHandScore = (arr) => {
  const score = 0;
  for (i = 0; i < arr.length; i += 1) {
    score += arr[i].rank;
  }
  return score;
};

// Rank 3: Four of a kind
const is4OfAKind = (arr) => {};

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
const is1Pair = (arr) => {};

// Rank 10: High card
const isHighCard = (arr) => {};

// Take an array of card objects and return the number of points that the user scored for the cards in their hand

/* ------- WINNING LOGIC ------ */

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
const calcHand = (arr) => {
  let score = 0;
  for (i = 0; i < arr.length; i += 1) {
    score += arr[i].rank;
    // Should take in the multipliers for the type of hand we have (straight, flush etc.)
  }
  return score;
};
