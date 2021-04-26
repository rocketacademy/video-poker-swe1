/* ==========================================================
===================== DOM SELECTORS =========================
=========================================================== */
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

/* ==========================================================
===================== HELPER FUCTIONS =======================
=========================================================== */

/* ================== AUDIO ======================= */
/**
 * Used to turn on/off or trigger the music/audio.
 */
const createBackgroudMusic = () => {
  // get music
  const currentSound = document.querySelector('#background-music');

  // create button
  const bgMusic = document.createElement('ion-icon');
  bgMusic.setAttribute('name', 'musical-notes-outline');
  bgMusic.classList.add('music-btn');
  document.body.appendChild(bgMusic);

  // pause music func
  const pauseMusic = () => {
    currentSound.pause();
  };

  // add event listener to button
  bgMusic.addEventListener('click', () => {
    // if music is off / paused
    if (!turnOnBackgrounMusic) {
      currentSound.loop = true;
      currentSound.play();
      turnOnBackgrounMusic = true;
      bgMusic.setAttribute('name', 'pause-outline');
    } else {
      // if music is playing
      pauseMusic();
      turnOnBackgrounMusic = false;
      bgMusic.setAttribute('name', 'play-outline');
    }
  });
};

const playStartBtnSound = () => {
  // get music
  const currentSound = document.querySelector('#click-start');
  // preloading ensures that there isn't delay in the audio
  // e.g. if the user does rapid clicks
  currentSound.preload = 'auto';
  currentSound.load();
  currentSound.play();
};

const playBetBtSound = () => {
  // get music
  const currentSound = document.querySelector('#click-bet');
  // preloading ensures that there isn't delay in the audio
  // e.g. if the user does rapid clicks
  currentSound.preload = 'auto';
  currentSound.load();
  currentSound.play();
};

const playDealBtSound = () => {
  // get music
  const currentSound = document.querySelector('#click-deal');
  // preloading ensures that there isn't delay in the audio
  // e.g. if the user does rapid clicks
  currentSound.preload = 'auto';
  currentSound.load();
  currentSound.play();
};

const playWinSound = () => {
  // get music
  const currentSound = document.querySelector('#game-win');
  // preloading ensures that there isn't delay in the audio
  // e.g. if the user does rapid clicks
  currentSound.preload = 'auto';
  currentSound.load();
  currentSound.play();
};

const playLoseSound = () => {
  // get music
  const currentSound = document.querySelector('#game-lose');
  // preloading ensures that there isn't delay in the audio
  // e.g. if the user does rapid clicks
  currentSound.preload = 'auto';
  currentSound.load();
  currentSound.play();
};

/* ================== CREATING THE DECK OF CARDS ==================== */
/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Shuffle an array of cards
 */
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

/**
 * Create a deck of cards
 */
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

/* ================== HOLDING OF CARDS ======================= */

/**
 * Determins what to do when card is clicked
 * @param {Array} parent - the index of the card in the displayCardsArr
 */
const clickedCard = (displayCardIndex) => {
  // add css class to show that the card is set to hold
  const cardToHold = frontCardContainer.children[displayCardIndex];
  createOrRemoveHoldCard(cardToHold);

  // toggle between true/false as the user clicks on the card
  if (holdCardsArr[displayCardIndex] === true) {
    holdCardsArr[displayCardIndex] = false;
  } else {
    holdCardsArr[displayCardIndex] = true;
  }
};

/**
 * Determins which cards to hold or switch
 */
const holdOrSwitchCards = () => {
  // update displayCardsArr
  // only switch cards for falses
  holdCardsArr.forEach((val, index) => {
    if (val === false) {
      displayCardsArr[index] = deckOfCards.pop();
    }
  });
};

/**
 * Create element to show if card is currently clicked/hold
 * @param {element} parent - the parent for this created element
 */
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

/* ================== CREATING / DISPLAYING CARDS ======================= */
/**
 * Creates the display for the back of the cards
 * @param {element} parent - the parent for this created element
 */
const createBackOfCard = (parent) => {
  // card display e.g. J K Q...
  const backOfCardDesign = document.createElement('div');
  backOfCardDesign.classList.add('back-card-design');
  parent.appendChild(backOfCardDesign);
};

/**
 * Deals 5 cards
 * Stores these 5 cards in the global: displayCardsArr
 * Creates elements & event listeners for the 5 cards, enabling the user to click to hold the cards
 */
const dealCards = () => {
  // set up for 5 cards
  for (let i = 0; i < 5; i += 1) {
    // create individual card container
    const singleCardContainer = document.createElement('div');
    singleCardContainer.classList.add('card');
    frontCardContainer.appendChild(singleCardContainer);

    // draw card and push into display cards array
    const drawCard = deckOfCards.pop();
    displayCardsArr.push(drawCard);

    // add event listener
    singleCardContainer.addEventListener('click', () => {
      clickedCard(i);
    });
  }
};

/**
 * Create element for a single card
 * @param {Object} objCardInfo - the object containing the details for a single card
 * @param {element} parent - the parent for this created element
 */
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

/**
 * Displays the 5 cards in the DOM
 */
const displayCards = () => {
  const childrenOfCardContainer = frontCardContainer.children;

  const displayCardsInDOM = (i) => {
    // remove color class attribute
    childrenOfCardContainer[i].classList.remove('red');
    childrenOfCardContainer[i].classList.remove('black');
    // remove hold class attribute
    childrenOfCardContainer[i].classList.remove('hold');
    childrenOfCardContainer[i].innerHTML = '';
    createCard(displayCardsArr[i], childrenOfCardContainer[i]);
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

/**
 * Disable the user from clicking on the cards after commiting to their holds
 */
const disableClickingOnCard = () => {
  const childrenOfCardContainer = frontCardContainer.children;
  for (let i = 0; i < childrenOfCardContainer.length; i += 1) {
    // toggle disable class attribute
    childrenOfCardContainer[i].classList.add('disable-click');
  }
};

/* ================== WINNING CARD COMBINATIONS ======================= */
/**
 * Check if user gets a winning combination of cards and returns a boolean
 * @param {Object} rankObjTally - tally of all the ranks in the displayCardsArr
 * @param {Object} suitObjTally - tally of all the suits in the displayCardsArr
 */
const checkForRoyalFlush = (rankObjTally, suitObjTally) => {
  // a royal flush has the following properties
  // all same suit
  // a straight of 10,J,Q,K,Ace

  let win = false;
  // check if suits are the same
  if (Object.keys(suitObjTally).length === 1) {
    // check if the ranks are correct
    const winningRankCombination = ['1', '10', '11', '12', '13'];
    // the code below turns the obj into an array
    const arrayOfRanksInHand = Object.keys(rankObjTally);

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
const checkForStraightFlush = (rankObjTally, suitObjTally) => {
  // a straight flush has the following properties
  // all same suit
  // any straight
  let win = false;
  // check if suits are the same
  if (Object.keys(suitObjTally).length === 1) {
    // the code below turns the obj into an array then converts the string values into integers
    const arrayOfRanksInHand = Object.keys(rankObjTally).map(Number);

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
const checkForFourOfAKind = (rankObjTally) => {
  // a four of a kind has the following properties
  // Any four cards of the same rank
  let win = false;
  Object.keys(rankObjTally).forEach((k) => {
    if (rankObjTally[k] === 4) {
      win = true;
    }
  });
  return win;
};
const checkForFullHouse = (rankObjTally) => {
  // a full house has the following properties
  // Any three cards of the same rank together
  // and any two cards of the same rank
  let win = false;
  // check if the number of keys in the obj is 2
  if (Object.keys(rankObjTally).length === 2) {
    // check if we have 3 & 2 similar ranks
    Object.keys(rankObjTally).forEach((k) => {
      if ([2, 3].includes(rankObjTally[k])) {
        win = true;
      }
    });
  }
  return win;
};
const checkForFlush = (suitObjTally) => {
  // a flush has the following properties
  // Any five cards of the same suit which are not consecutive
  let win = false;
  // check if suits are the same
  if (Object.keys(suitObjTally).length === 1) {
    win = true;
  }
  return win;
};
const checkForStraight = (rankObjTally) => {
  // a straight has the following properties
  // Any five consecutive cards of different suits.
  // ace can be either ranked 1 or 14 here

  let win = false;

  // check if it's 5 different ranked cards
  if (Object.keys(rankObjTally).length === 5) {
    // the code below turns the obj into an array then converts the string values into integers
    const arrayOfRanksInHand = Object.keys(rankObjTally).map(Number);

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
const checkForThreeOfAKind = (rankObjTally) => {
  // a three of a kind has the following properties
  // Any three cards of the same rank.

  let win = false;

  Object.keys(rankObjTally).forEach((k) => {
    if (rankObjTally[k] === 3) {
      win = true;
    }
  });
  return win;
};
const checkForTwoPair = (rankObjTally) => {
  // a two pair has the following properties
  // Any two cards of the same rank together with
  // another two cards of the same rank.

  let win = false;

  // check if the number of keys in the obj is 2
  if (Object.keys(rankObjTally).length === 3) {
    // check if we have 2 pairs of similar ranks
    Object.keys(rankObjTally).forEach((k) => {
      if (rankObjTally[k] === 2) {
        win = true;
      }
      // if ([2, 3].includes(rankObj[k])) {
      //   win = true;
      // }
    });
  }
  return win;
};
const checkForJacksOrBetter = (rankObjTally) => {
  // a jacks or better has the following properties
  // player gets an extra point for every pair of Jacks or higher

  let win = false;

  // check for pairs
  // if pairs are more than Jack add 1 to bonus point
  Object.keys(rankObjTally).forEach((k, i) => {
    if (rankObjTally[k] === 2 && Object.keys(rankObjTally)[i] >= 11) {
      bonusMultiplyer += 1;
      win = true;
    }
  });

  return win;
};

/* ============== CREDIT / SCORE  ================== */

/**
 * Update total credits lossed/gain in each round
 * This updates the global: totalCredits
 * and also updates the total credits display in the DOM
 * @param {number} creditNum - the number of credits left after each round/bet
 */
const adjustTotalCredits = (creditNum) => {
  // update global variable
  totalCredits = creditNum;
  // display in DOM
  creditScoreText.innerHTML = `TOTAL CREDITS: ${totalCredits}`;
};

/**
 * Update the bet amount
 * This updates the global: betAmount && totalCredits
 * and also updates the totalCredits and messages in the DOM
 * @param {String} typeOfBet - The strings are 'betOne', 'betMax' and 'reset'
 * Each gives a different ouput
 */
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
    betOneButton.disabled = true;
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

/* ============== USER INTERFACE / DOM ================== */

/**
 * Creates the score table (i.e the points system)
 */
const createScoreTable = () => {
  // We want the first row of the table to display the bet amount
  // to do this, we add a new object to the first row
  let newTable = { bet: [1, 2, 3, 4, 5], ...combiPoints };

  // We want the points to be in individual arrays so we can use them easily to make the rows
  const newTableArr = [];
  Object.keys(newTable).forEach((k) => {
    newTableArr.push(newTable[k]);
  });

  // function to create the rows for the point info
  const makeRow = (displayName, className, arrTypeOfCombi) => {
    // create combi container
    const rowContainer = document.createElement('div');
    rowContainer.classList.add(className, 'combi-type');
    infoContainer.appendChild(rowContainer);

    // create text items
    // header
    const combiType = document.createElement('h4');
    combiType.innerHTML = displayName;
    rowContainer.appendChild(combiType);

    // paragraphs
    arrTypeOfCombi.forEach((v, i) => {
      const betAmt = document.createElement('p');
      betAmt.classList.add(`bet-${i + 1}`);
      betAmt.innerHTML = v;
      rowContainer.appendChild(betAmt);
    });
  };

  // create rows
  makeRow('', 'bet', newTableArr[0]);
  makeRow('ROYAL FLUSH', 'royal-flush', newTableArr[1]);
  makeRow('STRAIGHT FLUSH', 'straight-flush', newTableArr[2]);
  makeRow('FOUR OF A KIND', 'four-of-a-kind', newTableArr[3]);
  makeRow('FULL HOUSE', 'full-house', newTableArr[4]);
  makeRow('FLUSH', 'flush', newTableArr[5]);
  makeRow('STRAIGHT', 'straight', newTableArr[6]);
  makeRow('THREE OF A KIND', 'three-of-a-kind', newTableArr[7]);
  makeRow('TWO PAIR', 'two-pair', newTableArr[8]);
  makeRow('JACKS OR BETTER (BONUS)', 'jacks-or-better', newTableArr[9]);
};

/**
 * A Greeting that asks the user to start the game
 */
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

/**
 * A custom message displayed for the user
 * @param {String} strMessage - The message that will be displayed
 */
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
    const screenMessage = document.createElement('p');
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

// function that checks if player has won anything
const calcHandScore = () => {
  const calcHand = displayCardsArr;

  // get the values that are needed (rank and suit)
  // put these values into an object
  const rankTypesTallyObj = {};
  const suitTypesTallyObj = {};
  calcHand.forEach((card) => {
    // Loop for rank
    // get the rank of one card
    let rankType = card.rank;
    // check if we have already recorded this rank
    if (rankTypesTallyObj[rankType] === undefined) {
      rankTypesTallyObj[rankType] = 1;
    } else {
      rankTypesTallyObj[rankType] += 1;
    }

    // Loop for suit
    // get the suit of one card
    let suitType = card.suit;
    // check if we have already recorded this rank
    if (suitTypesTallyObj[suitType] === undefined) {
      suitTypesTallyObj[suitType] = 1;
    } else {
      suitTypesTallyObj[suitType] += 1;
    }
  });

  // Check for each winning condition
  // each check function returns a boolean

  // Win type: royalFlush
  const winByRoyalFlush = checkForRoyalFlush(
    rankTypesTallyObj,
    suitTypesTallyObj
  );

  // Win type: straightFlush
  const winByStraightFlush = checkForStraightFlush(
    rankTypesTallyObj,
    suitTypesTallyObj
  );

  // Win type: Four of a kind
  const winByFourOfAKind = checkForFourOfAKind(rankTypesTallyObj);

  // Win type: Full house
  const winByFullHouse = checkForFullHouse(rankTypesTallyObj);

  // Win type: Flush
  const winByFlush = checkForFlush(suitTypesTallyObj);

  // Win type: Straight
  const winByStraight = checkForStraight(rankTypesTallyObj);

  // Win type: Three of a kind
  const winByThreeOfAKind = checkForThreeOfAKind(rankTypesTallyObj);

  // Win type: Two pair
  const winByTwoPair = checkForTwoPair(rankTypesTallyObj);

  // BONUS POINTS: Jacks or better
  const winByJacksOrBetter = checkForJacksOrBetter(rankTypesTallyObj);

  // GET WIN RESULT

  // total amount of points that player has won
  let winAmount = 0;
  // total amount of bonus points that player has won
  let bonusAmount = 0;
  // bet amouunt that user placed
  let betPlaced = betAmount - 1;
  // message that will be shown after calulation of hand
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

  // Check for win to display message and play audio
  let win = false;
  // if there is a win
  if (messageOutput) {
    win = true;
    // check if there are bonus points
    // bonus points
    if (winByJacksOrBetter) {
      bonusAmount += combiPoints.jacksOrBetter[betPlaced] * bonusMultiplyer;
      // reset bonus multiplyer
      bonusMultiplyer = 0;
      // create message for bonus win
      messageOutput += '\n with BONUS!';
    }
  } else {
    // create message for no win
    messageOutput = 'Aww shucks. A pile of nothin.';
    win = false;
  }

  // final message that displays in the DOM
  createMessage(`${messageOutput}\n Bet Again!`);

  // add to score
  const newCredit = totalCredits + winAmount + bonusAmount;
  adjustTotalCredits(newCredit);

  //play audio
  if (win) {
    playWinSound();
  } else {
    playLoseSound();
  }
};
