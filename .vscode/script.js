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

  // For every card object, put it inside an array
  for (i = 0; i < handLength; i += 1) {
    hand.push([]);
    // Push one object inside the array
    hand[i].push(deck.shift());
    console.log(hand[i]);
  }

  // hand = [ [cardObj], [cardObj], [cardObj], [cardObj], [cardObj] ]
  // position of the array inside the array = 0,1,2,3,4

  // Display hand
  // Access the arrays of arrays
  for (j = 0; j < handLength; j += 1) {
    console.log(`card image path is` + hand[j][0].img);
    displayCard(hand[j][0].img);
  }
});

initGame();

// Add event listeners on the image array[0]
