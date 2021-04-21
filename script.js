/* ================== GLOBALS ======================= */

// this is where we will store all the 5 cards displayed
let displayCardsArr = [];

// this is our deck of cards used for each game
let deckOfCards = [];

// game state (not super useful now but may be in the future)
const INTRO_GAME_STATE = 'INTRO_GAME_STATE';
const PLAY_GAME_STATE = 'PLAY_GAME_STATE';
const END_GAME_STATE = 'END_GAME_STATE';
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

/* ================== DOM SELECTORS ======================= */
// divs
const displayContainer = document.querySelector('.primary-display-container');
const cardContainer = document.querySelector('.cards-container');
const infoContainer = document.querySelector('.info-container');

// buttons
const dealButton = document.querySelector('.btn-deal');
const betOneButton = document.querySelector('.btn-bet-one');
const betMaxButton = document.querySelector('.btn-bet-max');

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

    // disable button click
    if (betAmount === 5) {
      betOneButton.disabled = true;
      betMaxButton.disabled = true;
    }
  } else if (typeOfBet === 'betMax' && betAmount != 5) {
    betAmount = 5;
    adjustTotalCredits(totalCredits - betAmount);
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
  } else if (typeOfBet === 'reset') {
    console.log('RESET DISPLAY RAN');
    // remove display from other buttons if any
    for (let i = 0; i <= 5; i += 1) {
      const betDisplayOff = document.querySelectorAll(`.bet-${i}`);
      betDisplayOff.forEach((element) => element.classList.remove('bet-green'));
    }
    // enable button click
    betOneButton.disabled = false;
    betMaxButton.disabled = false;
  }

  console.log('BET ' + betAmount);
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
  // Win ranking Best to Worst
  if (winByRoyalFlush) {
    winAmount = combiPoints.royalFlush[betPlaced];
  } else if (winByStraightFlush) {
    winAmount = combiPoints.straightFlush[betPlaced];
  } else if (winByFourOfAKind) {
    winAmount = combiPoints.fourOfAKind[betPlaced];
  } else if (winByFullHouse) {
    winAmount = combiPoints.fullHouse[betPlaced];
  } else if (winByFlush) {
    winAmount = combiPoints.flush[betPlaced];
  } else if (winByStraight) {
    winAmount = combiPoints.straight[betPlaced];
  } else if (winByThreeOfAKind) {
    winAmount = combiPoints.threeOfAKind[betPlaced];
  } else if (winByTwoPair) {
    winAmount = combiPoints.twoPair[betPlaced];
  }
  // bonus points
  if (winByJacksOrBetter) {
    bonusAmount += combiPoints.jacksOrBetter[betPlaced] * bonusMultiplyer;
    // reset bonus multiplyer
    bonusMultiplyer = 0;
  }

  const newCredit = totalCredits + winAmount + bonusAmount;
  adjustTotalCredits(newCredit);
};

/* ================== GAME INIT FUNCTIONS ======================= */
const buildGame = () => {
  if (GAME_STATE === INTRO_GAME_STATE) {
    // set credit
    adjustTotalCredits(100);
    // populate info-container with point system
    createInfo();
  }

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

    // TEST FOR GAME
    // ['hearts', 'diamonds', 'clubs', 'spades']
    // [('♥', '♦', '♣', '♠')]
    const testHand = (
      card1Rank,
      card2Rank,
      card3Rank,
      card4Rank,
      car5Rank,
      suits,
      symbol
    ) => {
      const hand = [
        {
          name: '',
          rank: card1Rank,
          display: `${card1Rank}`,
          color: 'black',
          suit: suits,
          suitSymbol: symbol,
        },
        {
          name: '',
          rank: card2Rank,
          display: `${card2Rank}`,
          color: 'black',
          suit: suits,
          suitSymbol: symbol,
        },
        {
          name: '',
          rank: card3Rank,
          display: `${card3Rank}`,
          color: 'black',
          suit: suits,
          suitSymbol: symbol,
        },
        {
          name: '',
          rank: card4Rank,
          display: `${card4Rank}`,
          color: 'black',
          suit: suits,
          suitSymbol: symbol,
        },
        {
          name: '',
          rank: car5Rank,
          display: `${car5Rank}`,
          color: 'black',
          suit: suits,
          suitSymbol: symbol,
        },
      ];
      return hand;
    };
    const hand = testHand(1, 10, 11, 12, 13, 'spades', '♠');
    // draw card and push into display cards array
    const drawCard = hand[i];
    displayCardsArr.push(drawCard);

    // ACTIVATE THIS WHEN NOT TESTING
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

const gameInit = () => {
  // MAKE EVENT LISTENERS

  // deal button
  dealButton.addEventListener('click', () => {
    console.log('clicked deal btn!');
    dealCards();
    // check if any of the winning conditions are met
    calcHandScore();
  });

  // bet one button
  betOneButton.addEventListener('click', () => {
    console.log('clicked bet one btn!');
    // display & adjust bet amount
    displayAndAdjustBet('betOne');
  });

  // bet max button
  betMaxButton.addEventListener('click', () => {
    console.log('clicked bet max btn!');
    // display bet amount
    displayAndAdjustBet('betMax');
  });

  // MAKE GREETING

  if (GAME_STATE === INTRO_GAME_STATE) {
    // create Greeting
    startGameButton = createGreeting();

    // start game button
    startGameButton.addEventListener('click', () => {
      console.log('clicked start game!');
      // remove greeting
      document.querySelector('.greetings-container').remove();
      // initialize game
      buildGame();
      // update game state
      GAME_STATE = PLAY_GAME_STATE;
    });
  } else {
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
  cardContainer.innerHTML = '';
  // re-init game
  gameInit();
};

/* ================== INIT ======================= */
gameInit();
