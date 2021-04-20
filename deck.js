// CREATING THE DECK
const handleCreateDeck = () => {
  const deckSuit = ["♠️", "♣️", "♥️", "♦️"];
  const deckValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  let newDeck = [];
  for (i = 0; i < deckSuit.length; i += 1) {
    const currentSuit = deckSuit[i];

    for (j = 0; j < deckValues.length; j += 1) {
      // CONVERT 1 , 11, 12, 13 TO RESPECTIVE deckValues
      switch (deckValues[j]) {
        case 1:
          deckValues[j] = "A";
          break;
        case 11:
          deckValues[j] = "J";
          break;
        case 12:
          deckValues[j] = "Q";
          break;
        case 13:
          deckValues[j] = "K";
          break;
        default:
          deckValues[j];
          break;
      }
      newDeck.push({
        suit: deckSuit[i],
        value: deckValues[j],
      });
    }
  }
  return newDeck;
};

// Shuffle an array of cards
const handleShuffleCards = (cards) => {
  // Get a random index ranging from 0 (inclusive) to max (exclusive).
  const getRandomIndex = (max) => Math.floor(Math.random() * max);

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

// DEAL CARDS
// const handleDealCards;
