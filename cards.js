// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
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

// Each card has a rank from 1(+1) to 52(+1)
// 2◆ = 1; 2♣ = 2; 2❤️ = 3; 2♠ = 4; 3◆ = 5 ...
// returns the array of card objects with altered ranks
let dRankInc = 4;
let cRankInc = 4;
let hRankInc = 4;
let sRankInc = 4;

const calculateRank = (deck) => {
  for (i = 0; i < deck.length; i += 1) {
    // For each suit
    if (deck[i].suit === "◆") {
      if (deck[i].rank === 2) {
        deck[i].rank = 1;
      }
      // For every diamond that is not a "2"
      if (deck[i].name !== "2" && deck[i].rank <= 14 && dRankInc < 52) {
        deck[i].rank = 1 + dRankInc;
        dRankInc += 4;
      }
    }

    if (deck[i].suit === "♣") {
      if (deck[i].rank === 2) {
        deck[i].rank = 2;
      }
      // For every club that is not a "2"
      if (deck[i].name !== "2" && deck[i].rank <= 14 && cRankInc < 52) {
        deck[i].rank = 2 + cRankInc;
        cRankInc += 4;
      }
    }

    if (deck[i].suit === "❤︎") {
      if (deck[i].rank === 2) {
        deck[i].rank = 3;
      }
      // For every club that is not a "2"
      if (deck[i].name !== "2" && deck[i].rank <= 14 && hRankInc < 52) {
        deck[i].rank = 3 + hRankInc;
        hRankInc += 4;
      }
    }

    if (deck[i].suit === "♠") {
      if (deck[i].rank === 2) {
        deck[i].rank = 4;
      }
      // For every club that is not a "2"
      if (deck[i].name !== "2" && deck[i].rank <= 14 && sRankInc < 52) {
        deck[i].rank = 4 + sRankInc;
        sRankInc += 4;
      }
    }
  }
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  // Organized from lowest to highest suit
  const suits = ["◆", "♣", "❤︎", "♠"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice Index(i) starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let cardIndex = 2; cardIndex <= 14; cardIndex += 1) {
      // By default, the card name which is a number is the same as index

      // Calculate the rank counter for each card before I turn the cardIndex into a string
      // Store rank as a number to compare later
      // I.e suits[suitIndex][cardIndex] => 13♠️
      // let cardRank = calculateRank(suits[suitIndex][cardIndex]);

      // cardName is a string because of AJQK
      let cardName = `${cardIndex}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "14") {
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: cardIndex,
        number: cardIndex,
        img: `cards/${currentSuit}/${cardName}.png`,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
    // A◆, 2◆, 3◆, 4◆, 5◆ ...  6◆
    // Calculate rank counter for each card inside the newDeck
    calculateRank(newDeck);
  }
  // Return the completed card deck
  return newDeck;
};

let deck = shuffleCards(makeDeck());
