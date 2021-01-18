// Global variables
const playerHand = [];

// Function 1: Create Deck
const shuffleDeck = () => {
  const deck = [];
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

  for (let i = 0; i < suits.length; i += 1){
    const currentSuit = suits[i];
    for (let j = 1; j <= 13; j += 1){
      currentRank = j;
      currentName = j
      if (currentName === 1){
        currentName = "Ace";
      } else if (currentName === 11){
        currentName = "Jack";
      } else if (currentName === 12){
        currentName = "Queen";
      } else if (currentName === 13){
        currentName = 'King';
      }

      // create card object
      const card = {
        name: currentName,
        suit: currentSuit,
        rank: currentRank,
      };
      // push the cards
      deck.push(card);
    }
  }
}

// Function 2: Shuffle Deck


