//= =========GLOBAL VARIABLES============
const deck= [];
const hand=[];
const points=[]
const player= {hand,points,
}



//= =========HELPER FUNCTIONS===================
// get a random index from an array given it's size
const getRandomIndex = (size) => Math.floor(Math.random() * size);

// ----------SHUFFLE CARDS-------------------
// cards is an array of card objects
const shuffleCards = (cards) => {
  // loop over the entire cards array
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // select a random position from the deck
    const randomIndex = getRandomIndex(cards.length);

    // get the current card in the loop
    const currentItem = cards[currentIndex];

    // get the random card
    const randomItem = cards[randomIndex];

    // swap the current card and the random card
    cards[currentIndex] = randomItem;
    cards[randomIndex] = currentItem;
  }

  // give back the shuffled deck
  return cards;
};

// -------------MAKE A DECK------------------------------
// Make a deck
const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    // console.log(`current suit: ${currentSuit}`);

    let color = "";
    let suitSymbol = suitIndex;
    if (suitSymbol === 0) {
      suitSymbol = "♥";
      color = "red";
    } else if (suitSymbol === 1) {
      suitSymbol = "♦";

      color = "red";
    } else if (suitSymbol === 2) {
      suitSymbol = "♣";
      color = "black";
    } else if (suitSymbol === 3) {
      suitSymbol = "♠";
      color = "black";
    }

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      let display = "";
      display = rankCounter;

      // 1, 11, 12 ,13
      if (cardName === "1") {
        cardName = "ace";
        display = "A";
      } else if (cardName === "11") {
        cardName = "jack";
        display = "J";
      } else if (cardName === "12") {
        cardName = "queen";
        display = "Q";
      } else if (cardName === "13") {
        cardName = "king";
        display = "K";
      }

      // make a single card object variable
      const card = {
        suitSymbol,
        name: cardName,
        display,
        color,
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


// -----------GET THE SCORE IN PLAYER'S HAND--------

const getHandScore=(hand)=>{

  
}

//= ===========GAME FLOW========================
// deal cards to player and store in his hand
const gameInit=()=>{
// Make a deck and suffle it
const deck = shuffleCards(makeDeck());

// assign 100 points to the player

// push 5 cards to the hand
for (let i=0; i<5;i+=1){
  hand.push(deck.pop());
}
}
gameInit();

