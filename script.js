// Global setup ====================================================
// points player start with
const PLAYER_STARTING_POINTS = 100;
// the player's points
const playerPoints = PLAYER_STARTING_POINTS;
// array to store player's hand cards
const playerHand = [];
// player hand size
const handSize = 5;

// shuffled deck
let deck;

// button to deal cards
let dealButton;
// button to exchange cards
let exchangeCardsButton;
// container to display a card
let playerCardContainer;
// container to display the player's cardContainers
let playerHandContainer;
// container to display the game instructions or output messages
let gameInfo;

// array to store player's cards to exchange
let cardsToExchange = [];

// Helper functions ================================================
// create elements needed when browser loads
const createStartingElements = () => {
  // button to deal cards
  dealButton = document.createElement('button');
  // button to exchange cards
  exchangeCardsButton = document.createElement('button');
  // container to display a card
  playerCardContainer = document.createElement('div');
  playerCardContainer.classList.add('player-card-container');
  // container to display the player's cardContainers
  playerHandContainer = document.createElement('div');
  playerHandContainer.classList.add('player-hand-container');
  // container to display the game instructions or output messages
  gameInfo = document.createElement('div');
};

// For creating a shuffled deck ------------------------------------
// get a random index from an array given it's size
const getRandomIndex = (size) => Math.floor(Math.random() * size);
// shuffle a group of cards and return it
const shuffleCards = (cardsData) => {
  // loop over the entire cards array
  for (let currentIndex = 0; currentIndex < cardsData.length; currentIndex += 1) {
    // select a random position from the deck
    const randomIndex = getRandomIndex(cardsData.length);

    // get the current card in the loop
    const currentItem = cardsData[currentIndex];

    // get the random card
    const randomItem = cardsData[randomIndex];

    // swap the current card and the random card
    cardsData[currentIndex] = randomItem;
    cardsData[randomIndex] = currentItem;
  }

  // give back the shuffled deck
  return cardsData;
};
// make a shuffled deck array containing card objects and return it
const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitColors = ['red', 'red', 'black', 'black'];
  const suitSymbols = ['♥', '♦', '♣', '♠'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    // make a variable for the current suit's color
    const currentSuitColor = suitColors[suitIndex];
    // make a variable for the current suit's symbol
    const currentSuitSymbol = suitSymbols[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;
      let displayName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
        displayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K';
      }

      // make a single card object variable
      const cardData = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentSuitSymbol,
        display: displayName,
        color: currentSuitColor,
      };

      // add the card to the deck
      newDeck.push(cardData);
    }
  }

  return newDeck;
};

// deal cards to player at start of the game according to handSize
const dealStartingCards = (cardsData) => {
  for (let i = 0; i < handSize; i += 1) {
    playerHand.push(cardsData.pop());
  }
};

// make a card element to be appended to the card container and return it
const makeCardElement = (cardData) => {
  const suitEl = document.createElement('div');
  suitEl.classList.add('suit');
  suitEl.innerText = cardData.suitSymbol;

  const nameEl = document.createElement('div');
  nameEl.classList.add('name', cardData.color);
  nameEl.innerText = cardData.display;

  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  cardEl.appendChild(nameEl);
  cardEl.appendChild(suitEl);

  return cardEl;
};

// select the card to exchange or unselect it
const selectOrUnselectCardToExchange = (cardToExchange) => {
  // when player clicks this card and it has not been selected before,
  // store it in an array of cards that will be exchanged
  // but if card is selected before,
  // remove it from the array of cards that will be exchanged.
  let isCardPresent = false; // false if card has not been selected before
  if (cardsToExchange.length > 0) { // only check if there are cards in array
    for (let j = 0; j < cardsToExchange.length; j += 1) {
      if (cardToExchange === cardsToExchange[j]) {
        isCardPresent = true;
        cardsToExchange.splice(j, 1); // remove the card from array
        j -= 1; // account for the decrease in array length
      }
    }
  }
  if (isCardPresent === false) {
    cardsToExchange.push(cardToExchange); // store the card
  }
};
// exchange cards
const exchangeCards = () => {
  // exchange the selected cards in playerHand
  for (let i = 0; i < playerHand.length; i += 1) {
    for (let j = 0; j < cardsToExchange.length; j += 1) {
      if (cardsToExchange[j].rank === playerHand[i].rank
        && cardsToExchange[j].suit === playerHand[i].suit) {
        playerHand.splice(i, 1, deck.pop());
      }
    }
  }
  // empty cardsToExchange array since we do not need the cards inside anymore
  cardsToExchange = [];

  // clear previous display of player's hand
  playerHandContainer.innerHTML = '';
  // make the player's cards' display and display them
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardEl = makeCardElement(playerHand[i]);
    playerHandContainer.appendChild(cardEl);
  }
};

// Game initialization =============================================
const gameInit = () => {
  // make and store a shuffled deck
  deck = shuffleCards(makeDeck());

  // initialize starting elements
  createStartingElements();

  // initialize playerHandContainer functionality
  document.body.appendChild(playerHandContainer);

  // initialize dealButton functionality
  dealButton.innerText = 'deal cards';
  dealButton.addEventListener('click', () => {
    // deal starting cards to player hand
    dealStartingCards(deck);

    // make the cards' display and display them and
    // add event listener to store the cards in case player wants to exchange them later
    for (let i = 0; i < playerHand.length; i += 1) {
      const cardEl = makeCardElement(playerHand[i]);
      // store the current card in case the player wants to exchange it later
      const cardToExchange = playerHand[i];
      cardEl.addEventListener('click', () => {
        // select the card to exchange or unselect it
        selectOrUnselectCardToExchange(cardToExchange);
      });
      playerHandContainer.appendChild(cardEl);
    }
  });
  document.body.appendChild(dealButton);

  // initialize exchangeCardsButton functionality
  exchangeCardsButton.innerText = 'exchange cards';
  exchangeCardsButton.addEventListener('click', () => {
    // exchange the cards
    exchangeCards();
  });
  document.body.appendChild(exchangeCardsButton);

  // initialize gameInfo functionality
  document.body.appendChild(gameInfo);
};

gameInit();
