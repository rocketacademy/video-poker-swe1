/* ========================================================== */
/* ======================= GLOBALS ========================= */
/* ========================================================== */

// this is where we will store all the 5 cards displayed
let displayCardsArr = [];

// this is our deck of cards used for each game
let deckOfCards = [];

// game state (not super useful now but may be in the future)
const INTRO_GAME_STATE = 'INTRO_GAME_STATE';
const BET_GAME_STATE = 'BET_GAME_STATE';
const PLAY_GAME_STATE = 'PLAY_GAME_STATE';
const NEXT_GAME_STATE = 'NEXT_GAME_STATE';
let GAME_STATE = INTRO_GAME_STATE;

// this array holds the coordinates of which cards were clicked
// we use this array to determin if we should hold or switch cards
let holdCardsClickCounter = [];

// total credits
let totalCredits = 100;

// bet amount
let betAmount = 0;

// bonus amount from jacks or better
let bonusMultiplyer = 0;

/* ========================================================== */
/* ==================== DOM SELECTORS ======================= */
/* ========================================================== */
// divs
const displayContainer = document.querySelector('.primary-display-container');
const frontCardContainer = document.querySelector('.front-cards-container');
const backCardContainer = document.querySelector('.back-cards-container');
const infoContainer = document.querySelector('.info-container');

// buttons
const dealButton = document.querySelector('.btn-deal');
const betOneButton = document.querySelector('.btn-bet-one');
const betMaxButton = document.querySelector('.btn-bet-max');

// credits
const creditScoreText = document.querySelector('.credits-text');

/* ========================================================== */
/* ================== HELPER FUNCTIONS======================= */
/* ========================================================== */

/* ================== CARD FUNCTIONS ======================= */

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

// function that deals cards
const dealCards = () => {
  /* ============== CARD INFO ============== */
  // make deck and shuffle
  deckOfCards = shuffleCards(makeDeck());

  // set up for 5 cards
  for (let i = 0; i < 5; i += 1) {
    // create individual card container
    const singleCardContainer = document.createElement('div');
    singleCardContainer.classList.add('card');
    frontCardContainer.appendChild(singleCardContainer);

    /* ============== THIS IS FOR TESTING ============== */
    /* ============== THIS IS FOR TESTING ============== */
    /* ============== THIS IS FOR TESTING ============== */
    // draw card and push into display cards array
    const drawCard = royalFlush()[i];
    // const drawCard = straightFlush()[i];
    // const drawCard = fourOfAKind()[i];
    // const drawCard = fullHouse()[i];
    // const drawCard = flush()[i];
    // const drawCard = straight()[i];
    // const drawCard = threeOfAKind()[i];
    // const drawCard = twoPair()[i];
    displayCardsArr.push(drawCard);

    /* ========= UNCOMMENT BELOW WHEN DONE WITH TEST =========== */
    /* ========= UNCOMMENT BELOW WHEN DONE WITH TEST =========== */
    /* ========= UNCOMMENT BELOW WHEN DONE WITH TEST =========== */
    // // draw card and push into display cards array
    // const drawCard = deckOfCards.pop();
    // console.log(drawCard);
    // displayCardsArr.push(drawCard);

    // add event listener
    singleCardContainer.addEventListener('click', () => {
      clickedCard(i);
    });
  }
  // display cards
  displayCards(displayCardsArr);
};

// function that displays the cards in the display cards array
const displayCards = (arr) => {
  const childrenOfCardContainer = frontCardContainer.children;

  const displayCardsInDOM = (i) => {
    // remove color class attribute
    childrenOfCardContainer[i].classList.remove('red');
    childrenOfCardContainer[i].classList.remove('black');
    // remove hold class attribute
    childrenOfCardContainer[i].classList.remove('hold');
    childrenOfCardContainer[i].innerHTML = '';
    createCard(arr[i], childrenOfCardContainer[i]);
  };

  const repeats = childrenOfCardContainer.length - 1;

  let i = 0;
  const ref = setInterval(() => {
    displayCardsInDOM(i);
    if (i >= repeats) {
      clearInterval(ref);
    }
    i += 1;
  }, 50);
};

// function that disables the clicking of the cards after a game is finished
const disableClickingOnCard = () => {
  const childrenOfCardContainer = frontCardContainer.children;
  for (let i = 0; i < childrenOfCardContainer.length; i += 1) {
    // toggle disable class attribute
    childrenOfCardContainer[i].classList.add('disable-click');
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

/* ============== CREDIT / SCORE FUNCTIONS ================== */
// manipulate total credits lossed/gain in each round
const adjustTotalCredits = (creditNum) => {
  // update global variable
  totalCredits = creditNum;
  // display in DOM
  creditScoreText.innerHTML = `TOTAL CREDITS: ${totalCredits}`;
};

// display and adjustment for bets
const displayAndAdjustBet = (typeOfBet) => {
  if (typeOfBet === 'betOne' && betAmount < 5) {
    betAmount += 1;
    adjustTotalCredits(totalCredits - 1);

    // remove display from other buttons if any
    for (let i = 0; i < 5; i += 1) {
      const betDisplayOff = document.querySelectorAll(`.bet-${i}`);
      betDisplayOff.forEach((element) => element.classList.remove('bet-green'));
    }

    // add display on correct bet amount
    const betDisplayOn = document.querySelectorAll(`.bet-${betAmount}`);
    betDisplayOn.forEach((element) => element.classList.add('bet-green'));

    // message
    createMessage('WANNA MAKE THAT 5?');

    // disable button click and print message
    if (betAmount === 5) {
      createMessage('OH YEAH. HIT THAT DEAL!');
      betOneButton.disabled = true;
      betMaxButton.disabled = true;
    }
  } else if (typeOfBet === 'betMax' && betAmount != 5) {
    const previousBetAmt = betAmount;
    betAmount = 5;
    adjustTotalCredits(totalCredits + previousBetAmt - betAmount);
    // remove display from other buttons if any
    for (let i = 0; i < 5; i += 1) {
      const betDisplayOff = document.querySelectorAll(`.bet-${i}`);
      betDisplayOff.forEach((element) => element.classList.remove('bet-green'));
    }

    // add display on correct bet amount
    const betDisplayOn = document.querySelectorAll(`.bet-${betAmount}`);
    betDisplayOn.forEach((element) => element.classList.add('bet-green'));

    // disable button click
    betMaxButton.disabled = true;

    // message
    createMessage('BOSSMAN I LIKE YOUR CONFIDENCE, HIT THAT DEAL!');
  } else if (typeOfBet === 'reset') {
    // remove display from other buttons if any
    for (let i = 0; i <= 5; i += 1) {
      const betDisplayOff = document.querySelectorAll(`.bet-${i}`);
      betDisplayOff.forEach((element) => element.classList.remove('bet-green'));
    }
    // enable button click
    betOneButton.disabled = false;
    betMaxButton.disabled = false;
  }
};

/* ============== USER INTERFACE FUNCTIONS ================== */

// this function creates the data for the card combinations info
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
        .replaceAll('-', ' ')
        .toUpperCase();
      cardCombinations[i].betTwo = element.betOne * 2;
      cardCombinations[i].betThree = element.betOne * 3;
      cardCombinations[i].betFour = element.betOne * 4;
      cardCombinations[i].betMax = element.betOne * 16;
    } else {
      cardCombinations[i].displayName = element.className
        .replaceAll('-', ' ')
        .toUpperCase();
      cardCombinations[i].betTwo = element.betOne * 2;
      cardCombinations[i].betThree = element.betOne * 3;
      cardCombinations[i].betFour = element.betOne * 4;
      cardCombinations[i].betMax = element.betOne * 5;
    }
  });

  return cardCombinations;
};

// function that creates the info screen
const createInfo = () => {
  const displayInfo = makePointSystem();

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
    bet1.classList.add('bet-1');
    bet1.innerHTML = betOne;
    // bet 2
    const bet2 = document.createElement('p');
    bet2.classList.add('bet-2');
    bet2.innerHTML = betTwo;
    // bet 3
    const bet3 = document.createElement('p');
    bet3.classList.add('bet-3');
    bet3.innerHTML = betThree;
    // bet 4
    const bet4 = document.createElement('p');
    bet4.classList.add('bet-4');
    bet4.innerHTML = betFour;
    // max bet
    const maxBet = document.createElement('p');
    maxBet.classList.add('bet-5');
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
  const backOfCardDesign = document.createElement('div');
  backOfCardDesign.classList.add('back-card-design');
  parent.appendChild(backOfCardDesign);
};

// function that greets user and asks them to start game
const createGreeting = () => {
  // create container
  const greetingsContainer = document.createElement('div');
  greetingsContainer.classList.add('greetings-container');

  // create header for greeting
  const greetingHeader = document.createElement('h2');
  greetingHeader.innerHTML = `THE TABLE IS SET`;
  greetingHeader.classList.add('greetings-h2');

  // create paragraph
  const greetingParagraph = document.createElement('p');
  greetingParagraph.classList.add('greetings-p');
  greetingParagraph.innerHTML = `Here's your chance to win big moolah!`;

  // create gif container
  const gif = document.createElement('img');
  gif.setAttribute(
    'src',
    'https://media.giphy.com/media/ClhVz6L3tnple/giphy.gif'
  );
  gif.classList.add('gif');

  // create button with event-listener
  const startGameButton = document.createElement('button');
  startGameButton.classList.add('start-game-btn');
  startGameButton.innerHTML = 'START';

  // parent elements
  displayContainer.appendChild(greetingsContainer);
  greetingsContainer.appendChild(greetingHeader);
  greetingsContainer.appendChild(greetingParagraph);
  greetingsContainer.appendChild(gif);
  greetingsContainer.appendChild(startGameButton);

  // return button so that it is easy to select
  return startGameButton;
};

// function that takes in a string and displays the message on screen
const createMessage = (strMessage) => {
  // check if message container already exists
  // if it doesn't exist then create one

  if (document.querySelector('.message-container')) {
    // message container
    screenMessage = document.querySelector('.message');
    screenMessage.innerHTML = strMessage;
  } else {
    // message container
    const screenMessageContainer = document.createElement('div');
    screenMessageContainer.classList.add('message-container');

    // message
    const screenMessage = document.createElement('div');
    screenMessage.classList.add('message');
    screenMessage.innerHTML = strMessage;

    // add to DOM
    screenMessageContainer.appendChild(screenMessage);
    displayContainer.appendChild(screenMessageContainer);
  }
};

/* ========================================================== */
/* ===================== GAME LOGIC ========================== */
/* ========================================================== */

// function that determins what to do when card is clicked
const clickedCard = (arrPosition) => {
  // console.log(displayCardsArr);
  // console.log('coordinates', arrPosition);
  // console.log(displayCardsArr[arrPosition]);

  // add class to css to show that the card is set to hold
  const cardToHold = frontCardContainer.children[arrPosition];
  createOrRemoveHoldCard(cardToHold);

  // collect the coordinates of all the clicks
  // this will be used to determin which card to hold or switch
  holdCardsClickCounter.push(arrPosition);
};

// function that determins which cards to hold or switch
const holdOrSwitchCards = () => {
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

  // odd numbered repeats mean that player wants to hold
  // even numbered repeats mean that player wants to switch
  coordinatesToHold.forEach((val, i) => {
    if (val % 2) {
      coordinatesToHold[i] = true;
    } else {
      coordinatesToHold[i] = false;
    }
  });

  // update displayCardsArr
  // only switch cards for falses
  coordinatesToHold.forEach((val, index) => {
    if (val === false) {
      displayCardsArr[index] = deckOfCards.pop();
    }
  });

  // display cards
  displayCards(displayCardsArr);
};

// function that checks for royal flush and returns a boolean
const checkForRoyalFlush = (rankObj, suitObj) => {
  // a royal flush has the following properties
  // all same suit
  // a straight of 10,J,Q,K,Ace

  let win = false;
  // check if suits are the same
  if (Object.keys(suitObj).length === 1) {
    // check if the ranks are correct
    const winningRankCombination = ['1', '10', '11', '12', '13'];
    // the code below turns the obj into an array
    const arrayOfRanksInHand = Object.keys(rankObj);

    // check if the arrays are similar
    let difference = arrayOfRanksInHand.filter(
      (x) => !winningRankCombination.includes(x)
    );
    if (difference.length === 0) {
      win = true;
    }
  }
  return win;
};

// function that checks for straight flush and returns a boolean
const checkForStraightFlush = (rankObj, suitObj) => {
  // a straight flush has the following properties
  // all same suit
  // any straight
  let win = false;
  // check if suits are the same
  if (Object.keys(suitObj).length === 1) {
    // the code below turns the obj into an array then converts the string values into integers
    const arrayOfRanksInHand = Object.keys(rankObj).map(Number);

    // note that the last array will return false so we have to omit it out
    // e.g. [1,2,3,4] will return [true,true,true,false]
    let checkIfAscending = arrayOfRanksInHand.map((val, i) => {
      const currentVal = val;
      let nextVal = arrayOfRanksInHand[i + 1];
      return currentVal === nextVal - 1;
    });
    // omit last array
    checkIfAscending.pop();
    if (checkIfAscending.includes(false)) {
      win = false;
    } else {
      win = true;
    }
  }
  return win;
};

// function that checks for four of a kind and returns a boolean
const checkForFourOfAKind = (rankObj) => {
  // a four of a kind has the following properties
  // Any four cards of the same rank
  let win = false;
  Object.keys(rankObj).forEach((k) => {
    if (rankObj[k] === 4) {
      win = true;
    }
  });
  return win;
};

// function that checks for full house and returns a boolean
const checkForFullHouse = (rankObj) => {
  // a full house has the following properties
  // Any three cards of the same rank together
  // and any two cards of the same rank
  let win = false;
  // check if the number of keys in the obj is 2
  if (Object.keys(rankObj).length === 2) {
    // check if we have 3 & 2 similar ranks
    Object.keys(rankObj).forEach((k) => {
      if ([2, 3].includes(rankObj[k])) {
        win = true;
      }
    });
  }
  return win;
};

// function that checks for flush and returns a boolean
const checkForFlush = (suitObj) => {
  // a flush has the following properties
  // Any five cards of the same suit which are not consecutive
  let win = false;
  // check if suits are the same
  if (Object.keys(suitObj).length === 1) {
    win = true;
  }
  return win;
};

// function that checks for straight and returns a boolean
const checkForStraight = (rankObj) => {
  // a straight has the following properties
  // Any five consecutive cards of different suits.
  // ace can be either ranked 1 or 14 here

  let win = false;

  // check if it's 5 different ranked cards
  if (Object.keys(rankObj).length === 5) {
    // the code below turns the obj into an array then converts the string values into integers
    const arrayOfRanksInHand = Object.keys(rankObj).map(Number);

    // check if ranks are ascending
    // note that the last array will return false so we have to omit it out
    // e.g. [1,2,3,4] will return [true,true,true,false]
    let checkIfAscending = arrayOfRanksInHand.map((val, i) => {
      const currentVal = val;
      let nextVal = arrayOfRanksInHand[i + 1];
      return currentVal === nextVal - 1;
    });
    // omit last array
    checkIfAscending.pop();
    if (checkIfAscending.includes(false)) {
      win = false;
    } else {
      win = true;
    }

    // exception for high straight with ace
    // e.g. 10,jack,queen,king,ace
    const highStraightCombination = [1, 10, 11, 12, 13];
    // check if the arrays are similar
    const difference = arrayOfRanksInHand.filter(
      (x) => !highStraightCombination.includes(x)
    );
    if (difference.length === 0) {
      win = true;
    }
  }
  return win;
};

// function that checks for three of a kind and returns a boolean
const checkForThreeOfAKind = (rankObj) => {
  // a three of a kind has the following properties
  // Any three cards of the same rank.

  let win = false;

  Object.keys(rankObj).forEach((k) => {
    if (rankObj[k] === 3) {
      win = true;
    }
  });
  return win;
};

// function that checks for two pair and returns a boolean
const checkForTwoPair = (rankObj) => {
  // a two pair has the following properties
  // Any two cards of the same rank together with
  // another two cards of the same rank.

  let win = false;

  // check if the number of keys in the obj is 2
  if (Object.keys(rankObj).length === 3) {
    // check if we have 2 pairs of similar ranks
    Object.keys(rankObj).forEach((k) => {
      if (rankObj[k] === 2) {
        win = true;
      }
      // if ([2, 3].includes(rankObj[k])) {
      //   win = true;
      // }
    });
  }
  return win;
};

// function that checks for jacks or better
const checkForJacksOrBetter = (rankObj) => {
  // a jacks or better has the following properties
  // player gets an extra point for every pair of Jacks or higher

  let win = false;

  // check for pairs
  // if pairs are more than Jack add 1 to bonus point
  Object.keys(rankObj).forEach((k, i) => {
    if (rankObj[k] === 2 && Object.keys(rankObj)[i] >= 11) {
      console.log(Object.keys(rankObj)[i]);
      bonusMultiplyer += 1;
      win = true;
    }
  });

  return win;
};

// function that checks if player has won anything
const calcHandScore = () => {
  const calcHand = displayCardsArr;

  // get the values that are needed (rank and suit)
  // put these values into an object
  const rankTypesObj = {};
  const suitTypesObj = {};
  calcHand.forEach((card) => {
    // Loop for rank
    // get the rank of one card
    let rankType = card.rank;
    // check if we have already recorded this rank
    if (rankTypesObj[rankType] === undefined) {
      rankTypesObj[rankType] = 1;
    } else {
      rankTypesObj[rankType] += 1;
    }

    // Loop for suit
    // get the suit of one card
    let suitType = card.suit;
    // check if we have already recorded this rank
    if (suitTypesObj[suitType] === undefined) {
      suitTypesObj[suitType] = 1;
    } else {
      suitTypesObj[suitType] += 1;
    }
  });

  // Check for each winning condition
  // each check function returns a boolean

  // Win type: royalFlush
  const winByRoyalFlush = checkForRoyalFlush(rankTypesObj, suitTypesObj);
  console.log(`Royal Flush Check Win: ${winByRoyalFlush}`);

  // Win type: straightFlush
  const winByStraightFlush = checkForStraightFlush(rankTypesObj, suitTypesObj);
  console.log(`Straight Flush Check Win: ${winByStraightFlush}`);

  // Win type: Four of a kind
  const winByFourOfAKind = checkForFourOfAKind(rankTypesObj);
  console.log(`Four Of A Kind Check Win: ${winByFourOfAKind}`);

  // Win type: Full house
  const winByFullHouse = checkForFullHouse(rankTypesObj);
  console.log(`Full House Check Win: ${winByFullHouse}`);

  // Win type: Flush
  const winByFlush = checkForFlush(suitTypesObj);
  console.log(`Flush Check Win: ${winByFlush}`);

  // Win type: Straight
  const winByStraight = checkForStraight(rankTypesObj);
  console.log(`Straight Check Win: ${winByStraight}`);

  // Win type: Three of a kind
  const winByThreeOfAKind = checkForThreeOfAKind(rankTypesObj);
  console.log(`Three Of A Kind Check Win: ${winByThreeOfAKind}`);

  // Win type: Two pair
  const winByTwoPair = checkForTwoPair(rankTypesObj);
  console.log(`Two Pair Check Win: ${winByTwoPair}`);

  // BONUS POINTS: Jacks or better
  const winByJacksOrBetter = checkForJacksOrBetter(rankTypesObj);
  console.log(`Jacks Or Better Check Win: ${winByJacksOrBetter}`);

  // GET WINNINGS

  const combiPoints = {
    royalFlush: [250, 500, 750, 1000, 4000],
    straightFlush: [50, 100, 150, 200, 250],
    fourOfAKind: [25, 50, 75, 100, 125],
    fullHouse: [9, 18, 27, 36, 45],
    flush: [6, 12, 18, 24, 30],
    straight: [4, 8, 12, 16, 20],
    threeOfAKind: [3, 6, 9, 12, 15],
    twoPair: [2, 4, 6, 8, 10],
    jacksOrBetter: [1, 2, 3, 4, 5],
  };

  let winAmount = 0;
  let bonusAmount = 0;
  let betPlaced = betAmount - 1;
  let messageOutput;
  // Win ranking Best to Worst
  if (winByRoyalFlush) {
    winAmount = combiPoints.royalFlush[betPlaced];
    messageOutput = 'Royal Flush!';
  } else if (winByStraightFlush) {
    winAmount = combiPoints.straightFlush[betPlaced];
    messageOutput = 'Straight Flush!';
  } else if (winByFourOfAKind) {
    winAmount = combiPoints.fourOfAKind[betPlaced];
    messageOutput = '4 of a kind!';
  } else if (winByFullHouse) {
    winAmount = combiPoints.fullHouse[betPlaced];
    messageOutput = 'Full house!';
  } else if (winByFlush) {
    winAmount = combiPoints.flush[betPlaced];
    messageOutput = 'very smelly... you got Flush?';
  } else if (winByStraight) {
    winAmount = combiPoints.straight[betPlaced];
    messageOutput = 'Straights!';
  } else if (winByThreeOfAKind) {
    winAmount = combiPoints.threeOfAKind[betPlaced];
    messageOutput = '3 of a kind!';
  } else if (winByTwoPair) {
    winAmount = combiPoints.twoPair[betPlaced];
    messageOutput = '2 pairs!';
  }

  // if there is a win
  if (messageOutput) {
    // check if there are bonus points
    // bonus points
    if (winByJacksOrBetter) {
      bonusAmount += combiPoints.jacksOrBetter[betPlaced] * bonusMultiplyer;
      // reset bonus multiplyer
      bonusMultiplyer = 0;
      messageOutput += '\n with BONUS!';
    }
  } else {
    // message for no wins
    messageOutput = 'Aww shucks. A pile of nothin.';
  }

  // message
  createMessage(`${messageOutput}\n Bet Again!`);

  // add to score
  const newCredit = totalCredits + winAmount + bonusAmount;
  adjustTotalCredits(newCredit);
};

/* ========================================================== */
/* ================== GAME INIT FUNCTIONS =================== */
/* ========================================================== */

const buildGame = () => {
  /* ============== SCORE INFO ============== */
  // set credit
  adjustTotalCredits(100);
  // populate info-container with point system
  createInfo();

  /* ============== CARD INFO ============== */
  // set up for 5 back faced cards
  for (let i = 0; i < 5; i += 1) {
    // create individual card container
    const singleCardContainer = document.createElement('div');
    singleCardContainer.classList.add('card');
    backCardContainer.appendChild(singleCardContainer);

    // set the initial display of the card container
    createBackOfCard(singleCardContainer);
  }
};

const gameInit = () => {
  /* ================================ */
  /* ======== IF FIRST GAME ======== */
  /* ================================ */

  if (GAME_STATE === INTRO_GAME_STATE) {
    /* ------------- GREETING -------------*/

    // disable clicking of bet and deal buttons
    betOneButton.disabled = true;
    betMaxButton.disabled = true;
    dealButton.disabled = true;

    // create Greeting
    const startGameButton = createGreeting();

    // start game button
    startGameButton.addEventListener('click', () => {
      console.log('clicked start game!');
      // remove greeting
      document.querySelector('.greetings-container').remove();
      // update game state
      GAME_STATE = BET_GAME_STATE;
      // initialize game
      buildGame();
      // message
      createMessage('PLACE THY BET!');
      // enable clicking of bet and button
      betOneButton.disabled = false;
      betMaxButton.disabled = false;
    });

    /* ------------- EVENT LISTENERS -------------*/

    // deal button listener
    dealButton.addEventListener('click', () => {
      console.log('clicked deal btn!');
      if (GAME_STATE === BET_GAME_STATE) {
        // disable betting buttons
        betOneButton.disabled = true;
        betMaxButton.disabled = true;

        /* ------ FIRST CLICK -------*/
        // deal cards
        dealCards();

        // message
        createMessage('LOOKS PRETTY GOOD, WANNA HOLD A FEW?');

        // update game state
        GAME_STATE = PLAY_GAME_STATE;
        // wait for player to choose which to hold
      } else if (GAME_STATE === PLAY_GAME_STATE) {
        /* ------ SECOND CLICK -------*/
        // hold or switch logic
        holdOrSwitchCards();

        // check if any of the winning conditions are met.
        // A message will be shown after this function runs
        calcHandScore();

        // enable betting buttons
        betOneButton.disabled = false;
        betMaxButton.disabled = false;

        // disable deal button
        dealButton.disabled = true;

        // disable clicking on cards
        disableClickingOnCard();

        // update game state
        GAME_STATE = NEXT_GAME_STATE;
      }
      // third click on deal is same as first
    });

    // bet one button listener
    betOneButton.addEventListener('click', () => {
      console.log('clicked bet one btn!');
      if (GAME_STATE === NEXT_GAME_STATE) {
        resetGame();
      }
      // display & adjust bet amount
      displayAndAdjustBet('betOne');

      //enable clicking of deal button
      dealButton.disabled = false;
    });

    // bet max button listener
    betMaxButton.addEventListener('click', () => {
      console.log('clicked bet max btn!');
      if (GAME_STATE === NEXT_GAME_STATE) {
        resetGame();
      }
      // display bet amount
      displayAndAdjustBet('betMax');

      //enable clicking of deal button
      dealButton.disabled = false;
    });
  } else {
    /* ================================ */
    /* ====== IF SUBSEQUENT GAME ====== */
    /* ================================ */
    // Re-initialize game
    buildGame();
  }
};

const resetGame = () => {
  // reset certain globals
  // e.g. DONT CHANGE variable totalCredits

  console.log('RESETTING!');
  displayCardsArr = [];
  deckOfCards = [];
  holdCardsClickCounter = [];
  betAmount = 0;
  bonusMultiplyer = 0;

  // clear extra css classes
  displayAndAdjustBet('reset');
  // empty cards container
  frontCardContainer.innerHTML = '';

  // update game state
  GAME_STATE = BET_GAME_STATE;

  // enable deal button
  dealButton.disabled = false;
};

/* ================================================ */
/* ================== INIT ======================= */
/* ================================================ */
gameInit();
