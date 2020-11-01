// Global Variables

// ------- General -----//

const playerHand = [];
const commonCardsArray = [];
// Tracks the number of same cards through each iteration of comparison
const numCommonCardsArray = [];
let shuffledDeck;

// Track if any winning combi is true;
let isAnyKindOrPair = false;
let isFullHouse = false;
let isFlush = false;
let isStraight = false;
let isStraightFlush = false;

//  Global var that holds the name of the winning combi
let nameOfWinCombi = 'Deal to begin';

// -------- Html Elements---------------------//
let overallScreen;
let payOutLevelPointer;
let payOutScheduleDisplay;
let cardsContainer;
let statsDisplay;
let buttonsContainer;

// -------- Game Stats - Credits Mgmt & Display-----------//
// Html elements for credits displays
let creditsLeftDisplay;
let outputMsgDisplay;
let creditsInsertedDisplay;

// Track number of credits
let numCreditsInserted = 1;
let creditsLeft = 100;
let currAmtWon = 0;
// Track payout level separate from creditsInserted
let payOutLevel = 0;

// Hardcoded individual credit payouts for X amount of credits used
const oneCreditPayOut = [250, 50, 25, 9, 6, 4, 3, 2, 1, 0];
const twoCreditPayout = [500, 100, 50, 18, 12, 8, 6, 4, 2, 0];
const threeCreditPayout = [750, 150, 75, 27, 18, 12, 9, 6, 3, 0];
const fourCreditPayout = [1000, 200, 100, 36, 24, 16, 12, 8, 4, 0];
const fiveCreditPayout = [4000, 250, 125, 45, 30, 20, 15, 10, 5, 0];

const payOutSchedule = [[...oneCreditPayOut], [...twoCreditPayout],
  [...threeCreditPayout], [...fourCreditPayout], [...fiveCreditPayout]];

// ----------------- Animation Management --------------//
// Tracks new card images when swapped
let newCardImage;
// Tracks cardImages during new dealt
let cardImage;
// Tracks cover-card animations;
let coverCardImage;
let coverCardShown = true;

// Track Rank of Hand
// Five of a kind being 0 and Jacks or Better being 8, no winning hand = 9;
let rankOfHand = 9;

// Track displays relating to gameOver messages
let gameOverDisplay;
let insertCreditsToContinueDisplay;

// --- Scroll Display Management ----//
let combiDisplayCol;
let pOut1Col;
let pOut2Col;
let pOut3Col;
let pOut4Col;
let pOut5Col;
let combiDisplayMachine;
let pOut1Machine;
let pOut2Machine;
let pOut3Machine;
let pOut4Machine;
let pOut5Machine;

// -- Game Round/State Management --- //
let gameRound = 0;
// States are between 'startGame'/ 'playerNextMove'/ 'gameOver'
let gameState = 'startGame';

// ---Sound Mgmt--//
let bgMusic;

//= ================== Helper Functions =========================//

// Function that determines payoutLevel
const calcPayOutLevel = () => {
  if (numCreditsInserted > 0) {
    payOutLevel = numCreditsInserted - 1;
    console.log(payOutLevel, 'payoutlevel');
  }
};

// Calculate the score of the hand and add the score to a temp variable before adding to user's total
const calcHandScore = () => {
  const amtWon = payOutSchedule[payOutLevel][rankOfHand];
  currAmtWon += amtWon;
  console.log(amtWon, 'amtWon');
  return currAmtWon;
};

// Function that calculates the rank of the current hand
const compareCardRank = () => {
  let pointer = 0;
  let numOfCommonCards = 0;
  const numRemainingCards = playerHand.length;
  while (pointer < playerHand.length - 1) {
    let j = pointer + 1;
    while (j < playerHand.length) {
      if (playerHand[pointer].rank === playerHand[j].rank) {
        numOfCommonCards += 1;
        commonCardsArray.push(playerHand[pointer]);
      }
      j += 1;
    }
    numCommonCardsArray.push(numOfCommonCards);
    numOfCommonCards = 0;
    pointer += 1;
  }
};

// CheckForKinds scenarios checked
//                       Written    Tested
// Five of a kind          x          x
// Straight Flush          x          x
// Four of a kind          x          x
// Full House              x          x
// Flush                   x          x
// Straight                x          x
// Three of a kind         x          x
// Two Pair                x          x
// One Pair(J or Better)   x          x

// Function that checks for 1 pairs to 5 of a kind
const checkForKindsnPairs = () => {
  // Refers to the max number of common cards found through each round of comparison
  const maxNum = Math.max(...numCommonCardsArray);
  // Filter the array only for number of times
  // common card is 1 (i.e 1 pair) and copies into an array
  const numPairs = numCommonCardsArray.filter((num) => num === 1);
  // Check for 4 and 5 of a kind
  if (maxNum === 3) {
  // Next Check for a joker for 5 of a kind
    if (playerHand.some((card) => card.name === 'Joker')) {
      nameOfWinCombi = '5 of a kind!';
      rankOfHand = 0;
      isAnyKindOrPair = true;
      return isAnyKindOrPair;
    }
    nameOfWinCombi = '4 of a kind!';
    rankOfHand = 2;
    isAnyKindOrPair = true;

  // Check for 3 of a kind
  } else if (maxNum === 2) {
    // Get an array of unique cards
    // if only 2 unique cards and 1 of the cards occured 3 times...
    const uniqueCards = [...new Set(playerHand.map((card) => card.name))];
    if (uniqueCards.length === 2) {
      nameOfWinCombi = 'Full House';
      rankOfHand = 0;
      isFullHouse = true;
      return isFullHouse;
    }
    nameOfWinCombi = '3 of a kind';
    rankOfHand = 6;
    isAnyKindOrPair = true;
    return isAnyKindOrPair;

    // Check for pair(s)
  } else if (maxNum === 1) {
    // Check if there are Jacks or better
    const countJacksInHand = playerHand.filter((card) => card.rank === 11);
    const countQueensInHand = playerHand.filter((card) => card.rank === 12);
    const countKingsInHand = playerHand.filter((card) => card.rank === 13);
    const countAcesInHand = playerHand.filter((card) => card.rank === 1);

    if (numPairs.length === 2) {
      nameOfWinCombi = '2 Pairs';
      rankOfHand = 7;
      isAnyKindOrPair = true;
      return isAnyKindOrPair;
    } if (countJacksInHand.length === 2 || countQueensInHand.length === 2
      || countKingsInHand.length === 2 || countAcesInHand.length === 2) {
      nameOfWinCombi = 'Pair of Jacks or better';
      rankOfHand = 8;
      isAnyKindOrPair = true;
      return isAnyKindOrPair;
    }
  }
};

// Function that checks for a flush recursively,
// taking in playerHand.length-1 initially
const checkForFlush = (numCardsToCheck) => {
  let i = numCardsToCheck;
  if (i > 1) {
    if (playerHand[i].suit === playerHand[i - 1].suit) {
      i -= 1;
      return checkForFlush(i);
    }
    // If any 2 consecutive cards'suits don't match then immediately break
    // and declare that there is no flush;
    isFlush = false;
    return isFlush;
  }
  // Once we reached the base case (first 2 cards in playerHand array),
  // check if the 2 cards are the same
  if (playerHand[i].suit === playerHand[i - 1].suit) {
    nameOfWinCombi = 'Flush!';
    rankOfHand = 4;
    isFlush = true;
    return isFlush;
  }
};

// Function that checks for straight-combi
const checkForStraight = () => {
  // Sort hand by descending order by rank (use spread operator to prevent original hand array
  //  from changing)
  const sortedHand = [...playerHand].sort((a, b) => b.rank - a.rank);

  // loop through each element and check if difference between each is
  // exactly one...
  let countOfConsecutiveRankCards = 1;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    if (sortedHand[i].rank - sortedHand[i + 1].rank === 1) {
      countOfConsecutiveRankCards += 1;
    }
  }
  // For checking if 1st 2 card is K and Q first
  const highestCardName = sortedHand[0].name;
  const secondHighestCardName = sortedHand[1].name;
  const lowestCardName = sortedHand[sortedHand.length - 1].name;

  if (highestCardName === 'King' && secondHighestCardName === 'Queen' && countOfConsecutiveRankCards === 4) {
    // Check if last card in the sorted hand is an ace
    // because its rank is 0, it will not show up as a consecutive card
    if (lowestCardName.name === 'Ace') {
      nameOfWinCombi = 'Ace-high Straight';
      rankOfHand = 5;
      isStraight = true;
      // else this is a King-High Straight
    } else if (lowestCardName === '10') {
      nameOfWinCombi = `${highestCardName}-high Straight`;
      rankOfHand = 5;
      isStraight = true;
    }
    // else it is just a normal straight
  } else if (countOfConsecutiveRankCards === sortedHand.length) {
    nameOfWinCombi = `${highestCardName}-high Straight`;
    rankOfHand = 5;
    isStraight = true;
  }
};

// Function that checks for a straight flush
const checkForStraightFlush = () => {
  if (isFlush === true && isStraight === true) {
    isStraightFlush = true;
    nameOfWinCombi = 'Straight Flush!';
    rankOfHand = 1;
  }
};

// Function that resets all global trackers /(variables) of any winning combi
const resetAllWinningCombiStatus = () => {
  isAnyKindOrPair = false;
  isFullHouse = false;
  isFlush = false;
  isStraight = false;
  isStraightFlush = false;
  // reset the array that tracks number of common cards
  // per iteration of checks
  numCommonCardsArray.length = 0;
};

// Function that checks hand for any winning combination
const checkForWinCombi = () => {
  compareCardRank();
  checkForKindsnPairs();
  checkForStraight();
  checkForFlush(playerHand.length - 1);
  checkForStraightFlush();

  const statusWinCombiArray = [isAnyKindOrPair, isFullHouse, isFlush, isStraight, isStraightFlush];
  // Check for no winning combi scenario:
  const countTrueArray = statusWinCombiArray.filter((status) => status === true);
  console.log(statusWinCombiArray);
  if (countTrueArray.length === 0) {
    nameOfWinCombi = 'No combo';
  }
  // reset nameOfWinCombi to all false;
  resetAllWinningCombiStatus();
};

// Function that creates initial UI
const buildUI = () => {
  // Create the general structure of the display
  // Container that holds all the other elements inside
  overallScreen = document.createElement('div');
  overallScreen.classList.add('overallScreen');

  payOutLevelPointer = document.createElement('div');
  payOutLevelPointer.classList.add('arrow-down');

  payOutScheduleDisplay = document.createElement('div');
  payOutScheduleDisplay.classList.add('combinationsDisplay');

  cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cardsContainer');

  // Display generic card cover before game starts
  displayCoverCard();

  statsDisplay = document.createElement('div');
  statsDisplay.classList.add('statsDisplay');

  buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttonsContainer');

  // Create the elements and information of combinations
  generateCombinationsTopDisplay();
  overallScreen.appendChild(payOutLevelPointer);
  overallScreen.appendChild(payOutScheduleDisplay);
  overallScreen.appendChild(cardsContainer);
  overallScreen.appendChild(statsDisplay);
  overallScreen.appendChild(buttonsContainer);
  document.body.appendChild(overallScreen);
};

// Function that creates a deck
const makeDeck = () => {
  // create an empty deck at the start

  const deck = [];

  const suits = ['heart', 'diamond', 'club', 'spade'];

  let suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of current suit
    const currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1 - 13

    let rankCounter = 1; // start from card value = 1 or Ace
    while (rankCounter <= 13) {
      // Since rank counter is equals to cardName most of the time:
      let cardName = rankCounter;

      // For special cases where number is 1, 11, 12 ,13

      if (cardName == 1) {
        cardName = 'Ace';
      } else if (cardName == 11) {
        cardName = 'Jack';
      } else if (cardName == 12) {
        cardName = 'Queen';
      } else if (cardName == 13) {
        cardName = 'King';
      }

      // making a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // push the card into the deck
      deck.push(card);

      rankCounter = rankCounter + 1;
    }

    suitIndex = suitIndex + 1;
  }
  // Include in 2 jokers to make 5-of-a-kind
  const joker = {
    name: 'Joker',
    suit: 'Joker',
    rank: 0,
  };
  // Saving it to implement joker in some unknown future
  // deck.push(joker);
  // deck.push(joker);
  return deck;
};

// Function that rearranges the deck stack
const shuffleCards = (deck) => {
  var currentIndex = 0;
  // loop over the entire cards array
  while (currentIndex < deck.length) {
    // select a random position from the deck
    var randomIndex = getRandomIndex(deck.length);
    // get the current card in the loop
    var currentItem = deck[currentIndex];
    // get the random card
    var randomItem = deck[randomIndex];
    // swap the current card and the random card
    deck[currentIndex] = randomItem;
    deck[randomIndex] = currentItem;
    currentIndex = currentIndex + 1;
  }
  // give back the shuffled deck
  return deck;
};

// Function that generates a random index from an array given it's size
const getRandomIndex = (size) => Math.floor(Math.random() * size);

// Function that enables slotmachine animation on the winning combis on top
const topScoreScrollDisplay = () => {
  // delay is 500 milliseconds
  const delay = 500;
  // sum of oneCreditPayout.length -1 and rankofHand always yields 9, which
  // yields the number of times it scrolls up i.e:
  // steps to move:
  // 0 1 2 3 4 5 6 7 8 9
  // Rank of Hand:
  // 9 8 7 6 5 4 3 2 1 0
  // total length = 9 - rank of hand = 0
  const numTimesToScrollUp = oneCreditPayOut.length - 1 - rankOfHand;
  const animationDelay = delay * numTimesToScrollUp;
  if (numTimesToScrollUp > 0) {
    const combiRoller = setInterval(() => {
      combiDisplayMachine.next();
      switch (payOutLevel) {
        case 0:
          pOut1Machine.next();
          break;
        case 1:
          pOut2Machine.next();
          break;
        case 2:
          pOut3Machine.next();
          break;
        case 3:
          pOut4Machine.next();
          break;
        case 4:
          pOut5Machine.next();
          break;
        default:
          console.log('error');
      }

      setTimeout(() => {
        clearInterval(combiRoller);
        // not sure what animationDelay-100 works and animationDelay doesnt work
      }, animationDelay - 100);
    }, delay);
  }
};

// Function that generates the path to each individual card
const getCardPicUrl = (card) => {
  let imgSrc = '';
  // get directory for each of the cards
  imgSrc = './Single_Cards/' + card.suit.toUpperCase() + '-' + card.rank;
  if (card.rank >= 11 && card.rank <= 13) {
    imgSrc += '-' + card.name.toUpperCase();
  }
  imgSrc += '.png';
  // Returns the link to the image
  return imgSrc;
};

// Function that creates the initial cover cards before game is started
const displayCoverCard = () => {
  let imgSrc = '';
  imgSrc = './Single_Cards/COVER-CARD.png';

  for (let i = 0; i < 5; i += 1) {
    coverCardImage = document.createElement('img');
    coverCardImage.setAttribute('id', `cc${i}`);
    coverCardImage.classList.add('cover-card');
    coverCardImage.classList.add('animate__animated');
    coverCardImage.classList.add('animate__fadeInLeft');
    coverCardImage.src = imgSrc;
    cardsContainer.appendChild(coverCardImage);
    drawInitialHandAnimation(i, coverCardImage, 0.3);
  }
};

// Function that animates out the cover cards everytime a new hand is to be drawn
const coverCardAnimateOut = () => {
  let thisCoverCardImage = document.querySelector('#cc0');
  // Check if cover image exists before performing animation
  if (thisCoverCardImage) {
    for (let i = 0; i < 5; i += 1) {
      thisCoverCardImage = document.querySelector(`#cc${i}`);
      thisCoverCardImage.classList.remove('animate__fadeInLeft');
      thisCoverCardImage.classList.add('animate__flipOutY');
      thisCoverCardImage.style.setProperty('--animate-duration', '0.8s');
    }
  }
};

// Function that animates the card that is to be swapped
const swapCardAnimation = (thisCardImage) => {
  thisCardImage.classList.remove('animate__flipInY');
  thisCardImage.classList.add('animate__fadeInDown');
};

// Function that display the new drawn cards after swapping
const displayNewDrawnCards = (card, index) => {
  newCardImage = document.querySelector(`#cardImg${index + 1}`);
  swapCardAnimation(newCardImage);
  newCardImage.src = getCardPicUrl(card);
};

// Function that animates the initial drawing of cards upon 'deal'
const drawInitialHandAnimation = (index, thisCardImage, delayInS) => {
  thisCardImage.style.setProperty('--animate-duration', `${delayInS + index / 2}s`);
};

// Function that animates  - fades out current hand before next hand is drawn
const fadeOutCurrHandAnimation = () => {
  for (let i = 0; i < playerHand.length; i += 1) {
    newCardImage = document.querySelector(`#cardImg${i + 1}`);
    // Reset all the animations of the existing cards by removing all class names
    newCardImage.className = 'animate__animated';
    // Add back the relevant classes for proper animation;
    newCardImage.classList.add('cardImage');
    newCardImage.classList.add('animate__fadeOutRight');
  }
};

const createGameOverDisplay = () => {
  // First clear out holdstatus that will conflict with hold
  for (let i = 0; i < playerHand.length; i += 1) {
    const existingholdStatusDisplay = document.querySelector(`#holdStatus${i}`);
    existingholdStatusDisplay.classList.add('animate__animated');
    existingholdStatusDisplay.classList.add('animate__fadeOut');
  }

  // Create 'gameOver' display that will overlay the cards when game ends
  gameOverDisplay = document.createElement('div');
  gameOverDisplay.classList.add('gameOver');
  gameOverDisplay.classList.add('animate__animated');
  gameOverDisplay.classList.add('animate__fadeIn');
  gameOverDisplay.innerHTML = 'GAME OVER';

  insertCreditsToContinueDisplay = document.createElement('div');
  insertCreditsToContinueDisplay.innerText = 'Please insert credits to continue.';
  insertCreditsToContinueDisplay.classList.add('finalInsertCredits');
  insertCreditsToContinueDisplay.classList.add('animate__animated');
  insertCreditsToContinueDisplay.classList.add('animate__fadeIn');

  cardsContainer.appendChild(gameOverDisplay);
  cardsContainer.appendChild(insertCreditsToContinueDisplay);
};

const fadeOutGameOverDisplay = () => {
  gameOverDisplay.classList.remove('animate__fadeIn');
  gameOverDisplay.classList.add('animate__fadeOut');
  insertCreditsToContinueDisplay.classList.remove('animate__fadeIn');
  insertCreditsToContinueDisplay.classList.add('animate__fadeOut');
};

// Function that draws the initial hand when the game begins
const drawInitialHand = () => {
  for (let i = 0; i < 5; i += 1) {
    // Draw a card from top of deck

    // // For testing on different card combis
    // const card = simulatedHand.pop();
    const card = shuffledDeck.pop();
    card.holdStatus = false;

    playerHand.push(card);

    // Create 'hold' display on top of card pressed ;
    let holdStatus = false;
    const holdStatusDisplay = document.createElement('div');
    holdStatusDisplay.classList.add('holdStatus');
    holdStatusDisplay.setAttribute('id', `holdStatus${i}`);

    // Create a break element to separate hold status display and poker card display
    const breakElement = document.createElement('br');

    // Create image tag that holds path to current card's image
    cardImage = document.createElement('img');
    cardImage.classList.add('cardImage');
    cardImage.setAttribute('id', `cardImg${i + 1}`);
    cardImage.classList.add('animate__animated');
    cardImage.classList.add('animate__flipInY');
    cardImage.src = getCardPicUrl(card);

    // set animation delay (in seconds)
    drawInitialHandAnimation(i, cardImage, 0.5);

    // Create div container that holds the image, and enable output once card is clicked
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.setAttribute('id', `card${i + 1}`);

    cardDiv.addEventListener('click', () => {
      if (holdStatus === false) {
        holdStatus = true;
        holdStatusDisplay.innerText = 'HOLD';
        playerHand[i].holdStatus = holdStatus;
      } else {
        holdStatus = false;
        holdStatusDisplay.innerText = '';
        playerHand[i].holdStatus = holdStatus;
      }
    });

    cardDiv.appendChild(holdStatusDisplay);
    cardDiv.appendChild(breakElement);
    cardDiv.appendChild(cardImage);

    cardsContainer.appendChild(cardDiv);
  }
};

// Function that generates the static onscreen display of the different
// winning combinations (and their prize monies)
const generateCombinationsTopDisplay = () => {
  const winningCombiArray = ['Five-of-a-kind', 'Straight Flush', 'Four-of-a-kind', 'Full-House', 'Flush', 'Straight', 'Three-of-a-kind', 'Two-Pairs', 'Jacks-or-better', 'No Combo'];

  // Create column that describe winning combinations
  const nameOfCombiDisplay = document.createElement('div');
  nameOfCombiDisplay.classList.add('nameOfCombiDisplay');
  for (let i = 0; i < winningCombiArray.length; i += 1) {
    const winCombi = document.createElement('div');
    winCombi.innerText = winningCombiArray[i];
    winCombi.classList.add('pOutBox');
    winCombi.setAttribute('id', `winCombi${i}`);
    nameOfCombiDisplay.appendChild(winCombi);
  }
  payOutScheduleDisplay.appendChild(nameOfCombiDisplay);

  // Create the display for payoutSchedule
  for (let i = 0; i < payOutSchedule.length; i += 1) {
    const payOutColumn = document.createElement('div');
    payOutColumn.classList.add(`pCol${i + 1}`);
    for (let j = 0; j < payOutSchedule[i].length; j += 1) {
      const payOutBox = document.createElement('div');
      payOutBox.classList.add('pOutBox');
      payOutBox.innerText += payOutSchedule[i][j] + '\t';
      payOutColumn.appendChild(payOutBox);
    }
    payOutScheduleDisplay.appendChild(payOutColumn);
  }
};

// Function that creates a button that allows users to increment credits
const createInsertCreditsBtn = () => {
  const insertCreditsBtn = document.createElement('button');
  insertCreditsBtn.classList.add('btn');
  insertCreditsBtn.classList.add('btn-design5');
  insertCreditsBtn.innerText = 'INSERT \n 1 CREDIT';
  insertCreditsBtn.setAttribute('id', 'insertCreditsBtn');
  insertCreditsBtn.addEventListener('click', () => {
    if (numCreditsInserted < 5) {
      numCreditsInserted += 1;
      creditsInsertedDisplay.innerText = `Insert Credit(s): ${numCreditsInserted}`;
      const leftPxArray = ['490px', '598px', '707px', '816px', '925px'];
      switch (numCreditsInserted) {
        case 1:
          payOutLevelPointer.style.left = `${leftPxArray[0]}`;
          break;
        case 2:
          payOutLevelPointer.style.left = `${leftPxArray[1]}`;
          break;
        case 3:
          payOutLevelPointer.style.left = `${leftPxArray[2]}`;
          break;
        case 4:
          payOutLevelPointer.style.left = `${leftPxArray[3]}`;
          break;
        case 5:
          payOutLevelPointer.style.left = `${leftPxArray[4]}`;
          break;
        default:
          payOutLevelPointer.style.left = `${leftPxArray[0]}`;
      }
    }
  });
  buttonsContainer.appendChild(insertCreditsBtn);
};
// Helper Function that uses runDealCardsEngine and game state to output relevant msgs
const dealCardsAndAnimateMsg = () => {
  // Animation for output message in stats display when moving on to next round
  // When player begins gameRound 1
  if (gameState === 'startGame') {
    runDealCardsEngine();
    gameState = 'playerNextMove';
    // When player decides to either 'deal' or 'swap'
  } else if (gameState === 'playerNextMove' || gameState === 'gameOver') {
    calcHandScore();
    console.log(currAmtWon, 'currAmtWon');
    createGameOverDisplay();
    statsDisplay.innerText = '';
    // Empty currAmtWon to total credits left
    creditsLeft += currAmtWon;
    createGameStatsDisplay('Dealing...');
    if (currAmtWon > 0) {
      creditsLeftDisplay.classList.add('animate__animated');
      creditsLeftDisplay.classList.add('animate__pulse');
      creditsLeftDisplay.classList.add('animate__fast');
      creditsLeftDisplay.classList.add('animate__repeat-3');
    }
    // Reset curr amt won tracker to 0;
    currAmtWon = 0;
    // Reset rankOfHand after each calculation and animation
    rankOfHand = 9;
    gameState = 'playerNextMove';

    setTimeout(() => {
      runDealCardsEngine();
    }, 1500);
  }
};

// Perform the relevant animations, calculation of scores and displays of stats
// when cards are dealt
const runDealCardsEngine = () => {
  // Change delay in MS depending on whether covercards are present
  let delayInDrawingCardsAnimation;
  // Animate out cover-cards first if present
  if (coverCardShown === true) {
    coverCardAnimateOut();
    coverCardShown = false;
    delayInDrawingCardsAnimation = 800;
  } else if (coverCardShown === false) {
    fadeOutCurrHandAnimation();
    fadeOutGameOverDisplay();
    console.log('test2');

    setTimeout(() => {
      cardsContainer.innerText = '';
      displayCoverCard();
    }, 1000);

    setTimeout(() => {
      coverCardAnimateOut();
    }, 2500);

    delayInDrawingCardsAnimation = 3500;
  }
  shuffledDeck = shuffleCards(makeDeck());
  setTimeout(() => {
    cardsContainer.innerText = '';

    // clear playerHand first before drawing initial hand
    playerHand.length = 0;

    // clear cache of previous' hand's win combi
    nameOfWinCombi = 'No combo';
    drawInitialHand();
    checkForWinCombi();

    // Calculate the level of payout and allow relevant pointer to scroll
    calcPayOutLevel();

    // Scroll the top header to display the winning combi
    topScoreScrollDisplay();

    // reset insert credits and deduct from credits left:
    creditsLeft -= numCreditsInserted;
    numCreditsInserted = 0;

    // reset stats display and make a new one;
    statsDisplay.innerText = '';
    createGameStatsDisplay();
  }, delayInDrawingCardsAnimation);

  gameRound += 1;
};

// Function that creates a button for dealing cards and run corresponding events
const createDealCardsBtn = () => {
  const dealBtn = document.createElement('button');
  dealBtn.classList.add('btn');
  dealBtn.classList.add('btn-design1');
  dealBtn.setAttribute('id', 'dealBtn');
  dealBtn.innerText = 'DEAL';
  dealBtn.addEventListener('click', () => {
    // reset the top scrolling machine displays and recreate it
    if (numCreditsInserted > 0) {
      if (gameRound > 0) {
        refreshScrollMachineDisplay();
      }
      dealCardsAndAnimateMsg();
    } else {
      statsDisplay.innerText = '';
      createGameStatsDisplay('Please insert \ncredits to deal!');
      outputMsgDisplay.classList.add('animate__animated');
      outputMsgDisplay.classList.add('animate__flash');
    }
    gameRound += 1;
  });
  buttonsContainer.appendChild(dealBtn);
};

// Function that creates a button that allows user to swap cards
const createSwapCardsBtn = () => {
  const swapBtn = document.createElement('button');
  swapBtn.classList.add('btn');
  swapBtn.classList.add('btn-design5');
  swapBtn.setAttribute('id', 'swapBtn');
  swapBtn.innerText = 'SWAP';

  swapBtn.addEventListener('click', () => {
    if (gameState === 'playerNextMove') {
      gameState = 'gameOver';
      playerHand.map((currentCard, index) => {
        if (currentCard.holdStatus === false) {
          const newCard = shuffledDeck.pop();
          // const newCard = simulatedHand.pop();
          playerHand.splice(index, 1, newCard);
          displayNewDrawnCards(newCard, index);
        }
      });
      checkForWinCombi();
      refreshScrollMachineDisplay();

      // Scroll the top header to display the winning combi
      topScoreScrollDisplay();
      // reset stats display and make a new one;
      statsDisplay.innerText = '';
      createGameStatsDisplay();
      setTimeout(() => createGameOverDisplay(), 1500);
    } else if (gameState === 'gameOver') {
      statsDisplay.innerText = '';
      createGameStatsDisplay('Please insert \ncredits to deal!');
      outputMsgDisplay.classList.add('animate__animated');
      outputMsgDisplay.classList.add('animate__flash');
    }
  });
  buttonsContainer.appendChild(swapBtn);
};

const createMuteSoundBtn = () => {
  const muteSoundBtn = document.createElement('button');
  muteSoundBtn.innerText = 'Mute';
  muteSoundBtn.classList.add('helpButton');
  muteSoundBtn.addEventListener('click', () => {
    if (bgMusic.muted === true) {
      bgMusic.muted = false;
    } else {
      bgMusic.muted = true;
    }
  });
  document.body.appendChild(muteSoundBtn);
};

// Function that refreshes scroll machine display
const refreshScrollMachineDisplay = () => {
  const topDisplay = document.querySelector('.combinationsDisplay');
  topDisplay.innerText = '';
  generateCombinationsTopDisplay();
  destroyScrollDisplayMachines();
  createScrollDisplayMachines();
};
// Function that creates the display on the statistics on the gameplay below
const createGameStatsDisplay = (outputMsg) => {
  // Display how much credits to play for this game
  creditsInsertedDisplay = document.createElement('div');
  creditsInsertedDisplay.innerText = `Insert Credit(s): ${numCreditsInserted}`;
  creditsInsertedDisplay.setAttribute('id', 'creditsInserted');

  // Display what combination is present
  outputMsgDisplay = document.createElement('div');
  outputMsgDisplay.setAttribute('id', 'currentCombi');

  if (!outputMsg) {
    outputMsgDisplay.innerText = `${nameOfWinCombi}`;
  } else {
    outputMsgDisplay.innerText = `${outputMsg}`;
  }

  // Display how much credits the player has left
  creditsLeftDisplay = document.createElement('div');
  creditsLeftDisplay.innerText = `Credits Left: ${creditsLeft}`;
  creditsLeftDisplay.setAttribute('id', 'availCredits');

  statsDisplay.appendChild(creditsInsertedDisplay);
  statsDisplay.appendChild(outputMsgDisplay);
  statsDisplay.appendChild(creditsLeftDisplay);
};

// Function that creates a 'slotMachine' obj for each column of the display abv
const createScrollDisplayMachines = () => {
  combiDisplayCol = document.querySelector('.nameOfCombiDisplay');
  pOut1Col = document.querySelector('.pCol1');
  pOut2Col = document.querySelector('.pCol2');
  pOut3Col = document.querySelector('.pCol3');
  pOut4Col = document.querySelector('.pCol4');
  pOut5Col = document.querySelector('.pCol5');
  combiDisplayMachine = new SlotMachine(combiDisplayCol, { active: 9 });
  pOut1Machine = new SlotMachine(pOut1Col, { active: 9 });
  pOut2Machine = new SlotMachine(pOut2Col, { active: 9 });
  pOut3Machine = new SlotMachine(pOut3Col, { active: 9 });
  pOut4Machine = new SlotMachine(pOut4Col, { active: 9 });
  pOut5Machine = new SlotMachine(pOut5Col, { active: 9 });
};

// Function that destroys each of the 'slotMachine' objs previously created
const destroyScrollDisplayMachines = () => {
  combiDisplayCol = null;
  pOut1Col = null;
  pOut2Col = null;
  pOut3Col = null;
  pOut4Col = null;
  pOut5Col = null;
};

// Function that creates the music tag for bg music
const createBgMusicTag = () => {
  bgMusic = document.createElement('audio');
  bgMusic.setAttribute('id', 'bgMusic');
  bgMusic.mute = false;
  bgMusic.src = './music/zodiac.mp3';
  bgMusic.volume = 0.2;
  document.body.appendChild(bgMusic);
};

// Function that plays the music - note that chrome browsers require some user
// iteraction with the website before music can be played
const playMusic = () => {
  document.getElementById('bgMusic').play();
  document.removeEventListener('click', playMusic);
};

// Function that creates an alert that tells users how to play the game
const createInstructionsAlertBtn = () => {
  const helpButton = document.createElement('button');
  helpButton.innerText = 'Help';
  helpButton.classList.add('helpButton');
  helpButton.addEventListener('click', () => {
    window.alert('Instructions on how to play Video Poker:\n1. Insert at least 1 credits to play. The more credits inserted, the higher the payout.\n2. Press ‘Deal’ to deal cards.\n3. Hands are evaluated based on typical rank of poker card hands. \n4. Once cards are dealt, either choose to ‘hold’ the cards you want or insert credits to deal a new set of cards. \n5. To hold cards, simply press on the cards that you want to keep. Next, press ‘Swap’ to swap the cards that were not held.\n6. Finally, your score is evaluated and players have to insert credit(s) to deal cards again.\n');
  });
  document.body.appendChild(helpButton);
};

// Function that initializes the game with certain displays and cover-cards
const gameInit = () => {
  buildUI();
  shuffledDeck = shuffleCards(makeDeck());
  createGameStatsDisplay();
  createInsertCreditsBtn();
  createDealCardsBtn();
  createSwapCardsBtn();
  createScrollDisplayMachines();
  createBgMusicTag();
  createMuteSoundBtn();
  createInstructionsAlertBtn();
  document.addEventListener('click', playMusic);
};

// ==== EXECUTE GAME =====//

// Instructions on how to play

gameInit();
// setTimeout(() => {
//   instructionsAlert();
// }, 2000);
