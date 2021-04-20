// Game play

// Selectors for containers
const entryDiv = document.querySelector(".entry-div");
const gameDiv = document.querySelector(".game-div");
const cardsDiv = document.querySelector(".cards-div");

// Selectors for buttons
const startBtn = document.querySelector(".start-btn");
const dealBtn = document.querySelector(".deal-btn");

/* ------- HAND RANKING FUNCTIONS ------ */
// Detects whether poker hand contains a hand rank
// Returns false otherwise

// Need to add a joker in the hand
// Rank 1: Five of a kind
// Rank 2: Straight flush

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
const calcHandScore = (arr) => {};

/* ------- WINNING LOGIC ------ */

/* ------- GAME PLAY ------ */

// Initiatlize game
const initGame = () => {
  // Hide the opening window
  entryDiv.style.display = "none";
};

const hand = [];
const handLength = 5;

// When the clicks "Start"
startBtn.addEventListener("click", () => {
  // Deal the first five random cards
  // The shift() method removes the first element from an array and returns that removed element.
  for (i = 0; i < handLength; i += 1) {
    hand.push(deck.shift());
  }
  // hand = [ cardObj, cardObj, cardObj, cardObj, cardObj ]
  // position of the hand = 0,1,2,3,4

  for (j = 0; j < hand.length; j += 1) {
    displayCard(hand[j].img);
  }
  // cardsDiv.appendChild(hand);
});

initGame();
