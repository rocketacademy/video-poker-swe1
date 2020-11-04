// Global setup ====================================================
// Information related to player -----------------------------------
// points player start with
const PLAYER_STARTING_POINTS = 100;
// the player's total points
let playerTotalPoints = PLAYER_STARTING_POINTS;
// player's bid points
let playerBidPoints = 0;
// array to store player's hand cards
let playerHand = []; // playerHand = ['']; // to use for testing only
// player hand size
const handSize = 5;
// array to store player's cards to exchange
let cardsToExchange = [];

// shuffled deck
let deck;

// Elements and containers to display items in browser ------------
// button to deal cards
let dealButton;
// button to exchange cards
let exchangeOrHoldCardsButton;
// container to display buttons
let buttonsContainer;
// container to display the player's cardContainers
let playerHandContainer;
// container to display output messages informing player about the state of the game
let gameInfo;
// element to display heading for player's total points
let totalPointsHeadingEl;
// element to display player's total points
let totalPointsInfoEl;
// container to display player's total points info and heading
let totalPointsContainer;
// element to display heading for player's bid points
let bidPointsHeadingEl;
// element to display player's bid points
let bidPointsInfoEl;
// input element to ask for points player wants to bid
let bidPointsInputEl;
// button to submit the points player wants to bid
let bidPointsButton;
// container to display player's bid points info and heading
let bidPointsContainer;
// container to display player's bid points input box and button
let bidPointsInputContainer;
// container that other containers in this file will append to
const gameDisplayContainer = document.getElementById('game-display');

// Variables used in calculating hand score ----------------------
// to store cards based on similar ranks
let rankedHand = [[]];
// to find number of 4 of a kind in playerHand
let numOf4OfAKind = 0;
// to find number of 3 of a kind in playerHand
let numOf3OfAKind = 0;
// to find number of pairs in playerHand
let numOfPairs = 0;
// points of the player hand
let handScore = 0;

// For controlling button clickability ----------------------------
// only allow player to submit bid points at start of the round
let canSubmitBidPoints = true;
// Only allow player to click on dealButton after submitting bid points and before exchanging cards
let canDealStartingCards = false;
// only allow player to click on card after having dealt cards
let canClickCards = false;
// only allow player to click on exchangeOrHoldCardsButton after having dealt cards
let canExchangeOrHoldCards = false;

// Helper functions ================================================
// create elements needed when browser loads
const createStartingElements = () => {
  // container to display the player's cardContainers
  playerHandContainer = document.createElement('div');
  playerHandContainer.setAttribute('id', 'player-hand-container');
  playerHandContainer.classList.add('row', 'align-items-center', 'justify-content-center');

  // container to display output messages informing player about the state of the game
  gameInfo = document.createElement('div');
  gameInfo.setAttribute('id', 'game-info-container');

  // container to display buttons
  buttonsContainer = document.createElement('div');
  buttonsContainer.setAttribute('id', 'buttons-container');
  buttonsContainer.classList.add('row');
  // button to deal cards
  dealButton = document.createElement('button');
  dealButton.setAttribute('id', 'deal-button');
  dealButton.classList.add('col-5', 'col-md-4');
  // button to exchange cards
  exchangeOrHoldCardsButton = document.createElement('button');
  exchangeOrHoldCardsButton.setAttribute('id', 'exchange-button');
  exchangeOrHoldCardsButton.classList.add('col-5', 'col-md-4');

  // element to display heading for player's total points
  totalPointsHeadingEl = document.createElement('p');
  // element to display player's total points
  totalPointsInfoEl = document.createElement('p');
  // container to display player's total points info and heading
  totalPointsContainer = document.createElement('div');
  totalPointsContainer.setAttribute('id', 'total-points-container');
  // element to display heading for player's bid points
  bidPointsHeadingEl = document.createElement('p');
  // element to display player's bid points
  bidPointsInfoEl = document.createElement('p');
  // input element to ask for points player wants to bid
  bidPointsInputEl = document.createElement('input');
  // button to submit the points player wants to bid
  bidPointsButton = document.createElement('button');
  // container to display player's bid points info and heading
  bidPointsContainer = document.createElement('div');
  bidPointsContainer.setAttribute('id', 'bid-points-container');
  // container to display player's bid points input box and button
  bidPointsInputContainer = document.createElement('div');
  bidPointsInputContainer.setAttribute('id', 'bid-points-input-container');
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

// to display output messages informing player about the state of the game
const displayGameInfo = (info) => {
  gameInfo.innerHTML = info;
};

// deal cards to player at start of the game according to handSize
const dealStartingCards = (cardsData) => {
  // remove the cards from previous round
  playerHand = [];

  // deal cards
  for (let i = 0; i < handSize; i += 1) {
    playerHand.push(cardsData.pop());
  }
};

// make a card element to be appended to the card container and return it
const makeCardElement = (cardData) => {
  const suitEl = document.createElement('div');

  suitEl.classList.add(cardData.color, 'suit');

  suitEl.innerText = cardData.suitSymbol;

  const nameEl = document.createElement('div');
  nameEl.classList.add('name', cardData.color);
  nameEl.innerText = cardData.display;

  const cardEl = document.createElement('div');
  cardEl.classList.add('card', 'col-3', 'align-items-center', 'col-md-2');

  cardEl.appendChild(nameEl);
  cardEl.appendChild(suitEl);

  return cardEl;
};

// For exchanging cards -------------------------------------------
// select the card to exchange or unselect it
const selectOrUnselectCardToExchange = (cardEl, cardToExchange) => {
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

        // remove the card border display to let player know card is dis-selected
        cardEl.classList.remove('card-border');
      }
    }
  }
  if (isCardPresent === false) {
    cardsToExchange.push(cardToExchange); // store the card

    // display the card border to let player know card is selected
    cardEl.classList.add('card-border');
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

// For calculating player hand score -------------------------------
// reorder player's cards from highest to lowest rank
const reorderCards = () => {
  /** for each position starting from the 0th index
   * check cards in positions further down the array for higher ranks
   * and swap the cards in those positions */
  let j = 1;
  for (let i = 0; i < (playerHand.length - 1); i += 1) {
    for (let k = j; k < playerHand.length; k += 1) {
      if (playerHand[k].rank > playerHand[i].rank) {
        const lowerRankCard = playerHand[i];
        const higherRankCard = playerHand[k];
        playerHand[i] = higherRankCard;
        playerHand[k] = lowerRankCard;
      }
    }
    j += 1;
  }
};

// store similar ranks together and used to check for winning conditions
const groupPlayerCardsByRank = () => {
  // empty rankedHand of previous round
  rankedHand = [[]];

  // logic
  rankedHand[0].push(playerHand[0]);
  let rankRow = 0;
  for (let i = 1; i < playerHand.length; i += 1) {
    // store the current card in the row array containing cards of the same rank
    if (playerHand[i].rank === playerHand[i - 1].rank) {
      rankedHand[rankRow].push(playerHand[i]);
    } else { // store the current card in a new row array for the next rank
      rankedHand.push([]);
      rankRow += 1;
      rankedHand[rankRow].push(playerHand[i]);
    }
  }
};
// find number of pairs/3 of a kind/4 of a kind
const findNumOfSimilarCards = () => {
  // empty previous round's records
  numOfPairs = 0;
  numOf3OfAKind = 0;
  numOf4OfAKind = 0;

  // logic
  for (let i = 0; i < rankedHand.length; i += 1) {
    if (rankedHand[i].length === 4) {
      numOf4OfAKind += 1;
    } else if (rankedHand[i].length === 3) {
      numOf3OfAKind += 1;
    } else if (rankedHand[i].length === 2) {
      numOfPairs += 1;
    }
  }
};
// returns true if there is a straight in the player's hand
const isStraight = () => {
  // if checkStraight is true, there is a straight in the player's hand
  let checkStraight = false;
  // number of times the difference between playerHand[i].rank and playerHand[i+1].rank is one
  let timesDifferenceIsMinusOne = 0;

  // check if player has a straight from 10 to ace
  for (let i = 0; i < (playerHand.length - 2); i += 1) {
    if (playerHand[i].rank - playerHand[i + 1].rank === 1) {
      timesDifferenceIsMinusOne += 1;
    }
  }
  if (timesDifferenceIsMinusOne === 3 && playerHand[4].rank === 1 && playerHand[0].rank === 13) {
    checkStraight = true;
  }

  // check if player has a straight other than from 10 to ace
  timesDifferenceIsMinusOne = 0;
  for (let i = 0; i < (playerHand.length - 1); i += 1) {
    if (playerHand[i].rank - playerHand[i + 1].rank === 1) {
      timesDifferenceIsMinusOne += 1;
    }
  }
  if (timesDifferenceIsMinusOne === 4) {
    checkStraight = true;
  }

  return checkStraight;
};
// returns true if there is a flush in the player's hand
const isFlush = () => {
  // if checkFlush is true, there is a Flush in the player's hand
  let checkFlush = false;

  // logic
  if (playerHand[0].suit === playerHand[1].suit && playerHand[1].suit === playerHand[2].suit
    && playerHand[2].suit === playerHand[3].suit && playerHand[3].suit === playerHand[4].suit) {
    checkFlush = true;
  }

  return checkFlush;
};
// return true if there is a royal flush (straight from 10 to ace and cards have same suit)
const isRoyalFlush = () => {
  // if check10ToAce is true, there is a straight from 10 to Ace in the player's hand
  let check10ToAce = false;
  // number of times the difference between playerHand[i].rank and playerHand[i+1].rank is one
  let timesDifferenceIsMinusOne = 0;
  // if there is a flush, check for straight from 10 to ace
  if (isFlush() === true) {
    // check if player has a straight from 10 to ace
    for (let i = 0; i < (playerHand.length - 2); i += 1) {
      if (playerHand[i].rank - playerHand[i + 1].rank === 1) {
        timesDifferenceIsMinusOne += 1;
      }
    }
    if (timesDifferenceIsMinusOne === 3 && playerHand[4].rank === 1 && playerHand[0].rank === 13) {
      check10ToAce = true;
    }
  }

  return check10ToAce;
};
// returns true if there is a full house in the player's hand
const isFullHouse = () => {
  let checkFullHouse = false;
  if (numOf3OfAKind === 1 && numOfPairs === 1) {
    checkFullHouse = true;
  }
  return checkFullHouse;
};
// returns true if there is a card that is Jack or higher in the player's hand
const isJackOrHigher = () => {
  let checkJackOrHigher = false;
  // check every card in player's hand for jack,queen,king or ace
  for (let i = 0; i < playerHand.length; i += 1) {
    if (playerHand[i].rank > 10 || playerHand[i].rank === 1) {
      checkJackOrHigher = true;
    }
  }
  return checkJackOrHigher;
};
// returns number of points based on player's hand
const calcHandScore = () => {
  if (isRoyalFlush() === true) { // royal flush
    handScore = 10;
  } else if (isStraight() === true && isFlush() === true) { // straight flush
    handScore = 9;
  } else if (numOf4OfAKind === 1) { // 4 of a kind
    handScore = 8;
  } else if (isFullHouse() === true) { // full house
    handScore = 7;
  } else if (isFlush() === true) { // flush
    handScore = 6;
  } else if (isStraight() === true) { // straight
    handScore = 5;
  } else if (numOf3OfAKind === 1) { // 3 of a kind
    handScore = 4;
  } else if (numOfPairs === 2) { // 2 pairs
    handScore = 3;
  } else if (numOfPairs === 1) { // 1 pair
    handScore = 2;
  } else if (isJackOrHigher() === true) {
    handScore = 1;
  } else {
    handScore = 0;
  }
};

// returns points won for the round
const calcPointsWon = () => playerBidPoints * handScore;
// add points to player's total points based on bid points and hand score
const addPoints = () => {
  playerTotalPoints += calcPointsWon();
};

// Game initialization =============================================
// to initilize game
const initGame = () => {
  // make and store a shuffled deck
  deck = shuffleCards(makeDeck());

  // initialize starting elements
  createStartingElements();

  // initialize playerHandContainer functionality
  gameDisplayContainer.appendChild(playerHandContainer);

  // initialize gameInfo functionality
  displayGameInfo('Welcome! Please submit your bid points to start playing.');
  gameDisplayContainer.appendChild(gameInfo);

  // initialize dealButton functionality
  dealButton.setAttribute('id', 'deal-button');
  dealButton.innerText = 'deal cards';
  dealButton.addEventListener('click', () => {
    if (canDealStartingCards === true) {
      // prevent dealing starting cards until start of next round
      canDealStartingCards = false;

      // deal starting cards to player hand
      dealStartingCards(deck);

      // make the cards' display and display them and
      // add event listener to store the cards in case player wants to exchange them later
      for (let i = 0; i < playerHand.length; i += 1) {
        const cardEl = makeCardElement(playerHand[i]);
        // store the current card in case the player wants to exchange it later
        const cardToExchange = playerHand[i];
        // eslint-disable-next-line no-loop-func
        cardEl.addEventListener('click', (event) => {
          if (canClickCards === true) {
            // select the card to exchange or unselect it
            selectOrUnselectCardToExchange(event.currentTarget, cardToExchange);
          }
        });
        playerHandContainer.appendChild(cardEl);
      }

      // allow player to start clicking on cards he/she wants to exchange
      canClickCards = true;
      // allow player to start exchanging cards for this round
      canExchangeOrHoldCards = true;
      // display instruction for player to select cards to exchange
      displayGameInfo('Click on any card(s) you want to exchange and click the \'exchange/hold cards\' button to see your score.');
    }
  });
  buttonsContainer.appendChild(dealButton);

  // initialize exchangeCardsButton functionality
  exchangeOrHoldCardsButton.innerText = 'exchange/hold cards';
  exchangeOrHoldCardsButton.addEventListener('click', () => {
    if (canExchangeOrHoldCards === true) {
      // prevent exchanging cards until next round of starting cards have been dealt
      canExchangeOrHoldCards = false;
      // prevent clicking on cards until next round of starting cards have been dealt
      canClickCards = false;

      // exchange the cards if player selected cards to exchange
      if (cardsToExchange.length > 0) {
        exchangeCards();
      }

      // check player hand's score ------------------------------
      // reorder player's cards from highest to lowest rank
      reorderCards();
      // store similar ranks together and used to check for winning conditions
      groupPlayerCardsByRank();
      // find number of pairs/3 of a kind/4 of a kind
      findNumOfSimilarCards();
      // calculate hand score and store in handScore
      calcHandScore();

      // add points to player's total points based on bid points and hand score
      addPoints();
      // display player's total points
      totalPointsInfoEl.innerText = playerTotalPoints;

      // it is the end of the round so allow player to begin new round by submitting points
      canSubmitBidPoints = true;
      // calculate points won this round
      const pointsWonThisRound = calcPointsWon();
      // display handscore and points player won this round and submit points to play again
      displayGameInfo(`Your hand score is ${handScore}. You earned ${pointsWonThisRound} points.
      Please submit points to play another round.`);
    }
  });
  buttonsContainer.appendChild(exchangeOrHoldCardsButton);

  // initialize buttonsContainer functionality
  gameDisplayContainer.appendChild(buttonsContainer);

  // Total points and bid points -------------------------------------------
  // initialize bidPointsHeadingEl functionality
  bidPointsHeadingEl.innerText = 'Points Bidded';
  bidPointsContainer.appendChild(bidPointsHeadingEl);
  // initialize bidPointsInfoEl functionality
  bidPointsInfoEl.innerText = playerBidPoints;
  bidPointsContainer.appendChild(bidPointsInfoEl);
  // initialize bidPointsContainer functionality
  gameDisplayContainer.appendChild(bidPointsContainer);
  // initialize totalPointsHeadingEl functionality
  totalPointsHeadingEl.innerText = 'Total Points';
  totalPointsContainer.appendChild(totalPointsHeadingEl);
  totalPointsContainer.appendChild(totalPointsHeadingEl);
  // initialize totalPointsInfoEl  functionality
  totalPointsInfoEl.innerText = playerTotalPoints;
  totalPointsContainer.appendChild(totalPointsInfoEl);
  // initialize totalPointsContainer functionality
  gameDisplayContainer.appendChild(totalPointsContainer);

  // initialize bidPointsInputEl functionality
  bidPointsInputEl.setAttribute('type', 'text');
  bidPointsInputEl.setAttribute('placeholder', 'enter points to bid');
  bidPointsInputContainer.appendChild(bidPointsInputEl);
  // initialize bidPointsButton functionality
  bidPointsButton.setAttribute('id', 'bid-points-button');
  bidPointsButton.innerText = 'submit points';
  bidPointsButton.addEventListener('click', () => {
    if (canSubmitBidPoints === true) {
      if (bidPointsInputEl.value > 0) { // player submitted a valid bid points
        // player has submitted bid points so they cannot submit anymore in this round
        canSubmitBidPoints = false;

        // clear player's hand container display since a new round has started
        playerHandContainer.innerHTML = '';

        // store bid points and display it
        playerBidPoints = bidPointsInputEl.value;
        bidPointsInfoEl.innerText = playerBidPoints;
        // clear bid points from bidPointsInputEl display
        bidPointsInputEl.value = '';
        // minus bid points away from player's total points
        playerTotalPoints -= playerBidPoints;
        // display player's total points
        totalPointsInfoEl.innerText = playerTotalPoints;

        // allow player to deal starting cards since it is a new round
        canDealStartingCards = true;
        // display instruction for player to click on dealButton to deal cards
        displayGameInfo('Please click on the \'deal cards\' button to deal cards.');
      } else {
        // tell player to submit a valid bid points
        bidPointsInputEl.value = 'please input a number > 0';
      }
    } else {
      // clear bid points from bidPointsInputEl display since
      // player might have accidentally tried submitting
      bidPointsInputEl.value = '';
    }
  });
  bidPointsInputContainer.appendChild(bidPointsButton);
  gameDisplayContainer.appendChild(bidPointsInputContainer);
};

// Initilize game
initGame();
