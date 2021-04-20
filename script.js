/* ================== GLOBALS ======================= */

// this is where we will store all the 5 cards displayed
const displayCardsArr = [];

// this is our deck of cards used for each game
let deckOfCards = [];

// game state (not super useful now but may be in the future)
const INTRO_GAME_STATE = 'INTRO_GAME_STATE';
const PLAY_GAME_STATE = 'PLAY_GAME_STATE';
let GAME_STATE = INTRO_GAME_STATE;

// we use this array to determin if we should hold or switch cards
const holdCardsClickCounter = [];

// total credits
let totalCredits;

/* ================== DOM SELECTORS ======================= */
// divs
const displayContainer = document.querySelector('.primary-display-container');
const cardContainer = document.querySelector('.cards-container');
const infoContainer = document.querySelector('.info-container');

// buttons
const dealButton = document.querySelector('.btn-deal');

// credits
const creditScoreText = document.querySelector('.credits-text');

/* ================== HELPER FUNCTIONS======================= */

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

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    let cardSuitSymbol = '';
    let cardColor = '';
    // if hearts or diamonds
    if (['hearts', 'diamonds'].includes(currentSuit)) {
      cardColor = 'red';
      if (currentSuit === 'hearts') {
        cardSuitSymbol = '♥';
      } else {
        cardSuitSymbol = '♦';
      }
    } else {
      cardColor = 'black';
      if (currentSuit === 'clubs') {
        cardSuitSymbol = '♣';
      } else {
        cardSuitSymbol = '♠';
      }
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplay = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        cardDisplay = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        cardDisplay = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        cardDisplay = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        cardDisplay = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        suitSymbol: cardSuitSymbol,
        display: cardDisplay,
        color: cardColor,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// this function creates the points for the card combinations
const makePointSystem = () => {
  const cardCombinations = [
    { className: 'bet', betOne: 1 },
    { className: 'royal-flush', betOne: 250 },
    { className: 'straight-flush', betOne: 50 },
    { className: 'four-of-a-kind', betOne: 25 },
    { className: 'full-house', betOne: 9 },
    { className: 'flush', betOne: 6 },
    { className: 'straight', betOne: 4 },
    { className: 'three-of-a-kind', betOne: 3 },
    { className: 'two-pair', betOne: 2 },
    { className: 'jacks-or-better', betOne: 1 },
  ];

  cardCombinations.forEach((element, i) => {
    // exception for top-menu
    if (i === 0) {
      cardCombinations[i].displayName = '';
      cardCombinations[i].betTwo = element.betOne * 2;
      cardCombinations[i].betThree = element.betOne * 3;
      cardCombinations[i].betFour = element.betOne * 4;
      cardCombinations[i].betMax = element.betOne * 5;
    }
    // max bet exception for royal flush
    else if (i === 1) {
      cardCombinations[i].displayName = element.className
        .replace('-', ' ')
        .toUpperCase();
      cardCombinations[i].betTwo = element.betOne * 2;
      cardCombinations[i].betThree = element.betOne * 3;
      cardCombinations[i].betFour = element.betOne * 4;
      cardCombinations[i].betMax = element.betOne * 16;
    } else {
      cardCombinations[i].displayName = element.className
        .replace('-', ' ')
        .toUpperCase();
      cardCombinations[i].betTwo = element.betOne * 2;
      cardCombinations[i].betThree = element.betOne * 3;
      cardCombinations[i].betFour = element.betOne * 4;
      cardCombinations[i].betMax = element.betOne * 5;
    }
  });

  return cardCombinations;
};

// this function takes in a card object and displays the card
const createCard = (objCardInfo, parent) => {
  // update class for main parent element
  parent.classList.add('card', objCardInfo.color);

  // card display e.g. J K Q...
  const cardDisplay = document.createElement('div');
  cardDisplay.classList.add('card-display');
  cardDisplay.innerText = objCardInfo.display;

  // card suit
  const cardSuit = document.createElement('div');
  cardSuit.classList.add('card-suit');
  cardSuit.innerText = objCardInfo.suitSymbol;

  // card suit display
  const cardSuitDisplay = document.createElement('div');
  cardSuitDisplay.classList.add('card-suit-display');
  cardSuitDisplay.innerText = objCardInfo.suitSymbol;

  // assign parent
  parent.appendChild(cardDisplay);
  parent.appendChild(cardSuit);
  parent.appendChild(cardSuitDisplay);
};

// function that creates the display for the back of the cards
const createBackOfCard = (parent) => {
  // card display e.g. J K Q...
  const backOfCard = document.createElement('div');
  backOfCard.innerText = 'BACK OF CARD';
  parent.appendChild(backOfCard);
};

// function that greets user and asks them to start game
const createGreeting = () => {
  // create container
  const greetingsContainer = document.createElement('div');
  greetingsContainer.classList.add('greetings-container');

  // create header for greeting
  const greetingHeader = document.createElement('h2');
  greetingHeader.classList.add('greetings-h2');

  // create paragraph
  const greetingParagraph = document.createElement('p');
  greetingParagraph.classList.add('greetings-p');
  greetingParagraph.innerHTML = `Here's your chance to win big moolah!`;

  // create button with event-listener
  const startGameButton = document.createElement('button');
  startGameButton.classList.add('start-game-btn');
  startGameButton.innerHTML = 'START';

  // parent elements
  displayContainer.appendChild(greetingsContainer);
  greetingsContainer.appendChild(greetingHeader);
  greetingsContainer.appendChild(greetingParagraph);
  greetingsContainer.appendChild(startGameButton);

  // return button so that it is easy to select
  return startGameButton;
};

// function that displays the cards in the display cards array
const displayCards = (arr) => {
  const childrenOfCardContainer = cardContainer.children;
  // for first game
  if (GAME_STATE === INTRO_GAME_STATE) {
    // clear back facing cards
    // display cards
    for (let i = 0; i < childrenOfCardContainer.length; i += 1) {
      childrenOfCardContainer[i].innerHTML = '';
      createCard(arr[i], childrenOfCardContainer[i]);
    }
    // update game state
    GAME_STATE = PLAY_GAME_STATE;
  } else {
    // clear cards
    // display cards
    // clear back facing cards
    // display cards
    for (let i = 0; i < childrenOfCardContainer.length; i += 1) {
      // remove hold class attribute
      childrenOfCardContainer[i].classList.remove('hold');
      childrenOfCardContainer[i].innerHTML = '';
      createCard(arr[i], childrenOfCardContainer[i]);
    }
  }
};

// create hold card marker
const createOrRemoveHoldCard = (parent) => {
  if (parent.classList.contains('hold')) {
    parent.classList.remove('hold');
    parent.lastChild.remove();
  } else {
    parent.classList.add('hold');
    const holdMarker = document.createElement('div');
    holdMarker.classList.add('hold-text');
    holdMarker.innerText = 'HOLD';
    parent.appendChild(holdMarker);
  }
};

// manipulate total credits lossed/gain in each round
const adjustTotalCredits = (creditNum) => {
  // update global variable
  totalCredits = creditNum;
  // display in DOM
  creditScoreText.innerHTML = `TOTAL CREDITS: ${totalCredits}`;
};

// function that creates the info screen
const createInfo = () => {
  const displayInfo = makePointSystem();
  console.log(displayInfo);

  displayInfo.forEach((element, index) => {
    const displayName = element.displayName;
    const className = element.className;
    const betOne = element.betOne;
    const betTwo = element.betTwo;
    const betThree = element.betThree;
    const betFour = element.betFour;
    const betMax = element.betMax;

    // create combi container
    const combiContainer = document.createElement('div');
    combiContainer.classList.add(className, 'combi-type');
    // alt to style css
    if (index % 2) {
      combiContainer.classList.add('alt');
    }

    // create text items
    // header
    const combiType = document.createElement('h4');
    combiType.innerHTML = displayName;
    // bet 1
    const bet1 = document.createElement('p');
    bet1.innerHTML = betOne;
    // bet 2
    const bet2 = document.createElement('p');
    bet2.innerHTML = betTwo;
    // bet 3
    const bet3 = document.createElement('p');
    bet3.innerHTML = betThree;
    // bet 4
    const bet4 = document.createElement('p');
    bet4.innerHTML = betFour;
    // max bet
    const maxBet = document.createElement('p');
    maxBet.innerHTML = betMax;

    // appendChild
    combiContainer.appendChild(combiType);
    combiContainer.appendChild(bet1);
    combiContainer.appendChild(bet2);
    combiContainer.appendChild(bet3);
    combiContainer.appendChild(bet4);
    combiContainer.appendChild(maxBet);
    infoContainer.appendChild(combiContainer);
  });
};

/* ================== GAME LOGIC ======================= */

// function that determins what to do when card is clicked
const clickedCard = (arrPosition) => {
  // console.log(displayCardsArr);
  // console.log('coordinates', arrPosition);
  // console.log(displayCardsArr[arrPosition]);

  // add class to css to show that the card is set to hold
  const cardToHold = cardContainer.children[arrPosition];
  createOrRemoveHoldCard(cardToHold);

  // collect the coordinates of all the clicks
  // this will be used to determin which card to hold or switch
  holdCardsClickCounter.push(arrPosition);
  // console.log(holdCardsClickCounter);
};

// function that determins which cards to hold or switch
const dealCards = () => {
  // count how many repeats
  const coordinatesToHold = [0, 0, 0, 0, 0];
  holdCardsClickCounter.forEach((val) => {
    if (val === 0) {
      coordinatesToHold[0] += 1;
    }
    if (val === 1) {
      coordinatesToHold[1] += 1;
    }
    if (val === 2) {
      coordinatesToHold[2] += 1;
    }
    if (val === 3) {
      coordinatesToHold[3] += 1;
    }
    if (val === 4) {
      coordinatesToHold[4] += 1;
    }
  });
  console.log(coordinatesToHold);
  // odd numbered repeats mean that player wants to hold
  // even numbered repeats mean that player wants to switch
  coordinatesToHold.forEach((val, i) => {
    if (val % 2) {
      coordinatesToHold[i] = true;
    } else {
      coordinatesToHold[i] = false;
    }
  });
  console.log(coordinatesToHold);

  // update displayCardsArr
  // only switch cards for falses
  coordinatesToHold.forEach((val, index) => {
    if (val === false) {
      console.log(index);
      displayCardsArr[index] = deckOfCards.pop();
    }
  });

  // display cards
  displayCards(displayCardsArr);
};

/* ================== GAME INIT FUNCTIONS ======================= */
const buildGame = () => {
  // set credit
  adjustTotalCredits(100);

  // populate info-container with point system
  createInfo();

  // make deck and shuffle
  deckOfCards = shuffleCards(makeDeck());

  // set up for 5 cards
  for (let i = 0; i < 5; i += 1) {
    // create individual card container
    const singleCardContainer = document.createElement('div');
    singleCardContainer.classList.add('card');
    cardContainer.appendChild(singleCardContainer);

    // set the initial display of the card container
    createBackOfCard(singleCardContainer);

    // draw card and push into display cards array
    const drawCard = deckOfCards.pop();
    displayCardsArr.push(drawCard);

    // add event listener
    singleCardContainer.addEventListener('click', () => {
      clickedCard(i);
    });
  }

  // display cards
  displayCards(displayCardsArr);
};
const gameInit = () => {
  // create Greeting
  startGameButton = createGreeting();

  // add event listeners

  // deal button
  dealButton.addEventListener('click', () => {
    console.log('clicked deal btn!');
    dealCards();
  });

  //start game button
  startGameButton.addEventListener('click', () => {
    console.log('clicked start game!');
    // remove greeting
    document.querySelector('.greetings-container').remove();
    //initialize game
    buildGame();
  });
};

/* ================== INIT ======================= */
gameInit();
