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
let nameOfWinCombi = 'No winning hand';

// -------- Html Elements---------------------//
let overallScreen;
let payOutScheduleDisplay;
let cardsContainer;
let statsDisplay;
let buttonsContainer;

// -------- Game Stats - Credits Mgmt & Display-----------//
// Html elements for credits displays
let creditsLeftDisplay;
let currentCombiDisplay;
let creditsInsertedDisplay;
// Track number of credits
let numCreditsInserted = 1;
let creditsLeft = 100;

// Hardcoded individual credit payouts for X amount of credits used
const oneCreditPayOut = [250, 50, 25, 9, 6, 4, 3, 2, 1];
const twoCreditPayout = [500, 100, 50, 18, 12, 8, 6, 4, 2];
const threeCreditPayout = [750, 150, 75, 27, 18, 12, 9, 6, 3];
const fourCreditPayout = [1000, 200, 100, 36, 24, 16, 12, 8, 4];
const fiveCreditPayout = [4000, 250, 125, 45, 30, 20, 15, 10, 5];

const payOutSchedule = [[...oneCreditPayOut], [...twoCreditPayout],
  [...threeCreditPayout], [...fourCreditPayout], [...fiveCreditPayout]];

// Management of game state//
const canDeal = false;

// Track Rank of Hand
// Five of a kind being 0 and Jacks or Better being 8, no winning hand = 0;
let rankOfHand = 0;

// Calculate the score of the hand and add to user's credits
const calcHandScore = () => {
  let amtWon = 0;
  console.log(amtWon, 'amtWon');
  console.log(rankOfHand, 'rank of hand');
  if (rankOfHand > 0) {
    amtWon = payOutSchedule[numCreditsInserted - 1][rankOfHand];
    creditsLeft += amtWon;
    // creditsLeftDisplay.innerText = `CREDITS LEFT: ${creditsLeft}`;
    console.log(amtWon, 'amtWon');
  }
  // reset rankOfHand after each calculation
  rankOfHand = 0;
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
  console.log('completed');
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
  console.log(numPairs, 'numPairs');
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

const checkForStraight = () => {
  // Sort hand by descending order by rank (use spread operator to prevent original hand array
  //  from changing)
  const sortedHand = [...playerHand].sort((a, b) => b.rank - a.rank);
  console.log(playerHand, 'playerHand');

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

  if (highestCardName === 'King' && secondHighestCardName === 'Queen' && countOfConsecutiveRankCards >= 4) {
    // Check if last card in the sorted hand is an ace
    // because its rank is 0, it will not show up as a consecutive card
    if (sortedHand[sortedHand.length - 1].name === 'Ace') {
      nameOfWinCombi = 'Ace-high Straight';
      rankOfHand = 5;
      isStraight = true;
    }
  } else if (countOfConsecutiveRankCards === sortedHand.length) {
    nameOfWincombi = `${highestCardName}-high Straight`;
    rankOfHand = 5;
    isStraight = true;
  }
};

const checkForStraightFlush = () => {
  if (isFlush === true && isStraight === true) {
    isStraightFlush = true;
    nameOfWinCombi = 'Straight Flush!';
    rankOfHand = 1;
  }
};

const resetAllWinningCombiStatus = () => {
  isAnyKindOrPair = false;
  isFullHouse = false;
  isFlush = false;
  isStraight = false;
  isStraightFlush = false;
  // reset the array that tracks number of common cards
  // per iteration of checks
  numCommonCardsArray.length = 0;
  console.log('status is reset');
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
    console.log('You have no winning combination');
  } else {
    console.log(`You have a ${nameOfWinCombi}.`);
  }
  // reset nameOfWinCombi to all false;
  resetAllWinningCombiStatus();
};

const buildUI = () => {
  // Create the general structure of the display
  // Container that holds all the other elements inside
  overallScreen = document.createElement('div');
  overallScreen.classList.add('overallScreen');

  payOutScheduleDisplay = document.createElement('div');
  payOutScheduleDisplay.classList.add('combinationsDisplay');

  cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cardsContainer');

  // Display generic card cover before game starts
  displayCardCover();

  statsDisplay = document.createElement('div');
  statsDisplay.classList.add('statsDisplay');

  buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttonsContainer');

  // Create the elements and information of combinations
  generateDisplayCombinations();

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
    // console.log("current suit : " + currentSuit)

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

const displayCardCover = () => {
  let imgSrc = '';
  imgSrc = './Single_Cards/COVER-CARD.png';

  for (let i = 0; i < 5; i += 1) {
    const coverCardPic = document.createElement('img');
    coverCardPic.classList.add('cover-card');
    coverCardPic.src = imgSrc;
    cardsContainer.appendChild(coverCardPic);
  }
};

const displayNewDrawnCards = (card, index) => {
  const newCardImage = document.querySelector(`#cardImg${index + 1}`);
  console.log(newCardImage, 'newCardImage');
  newCardImage.src = getCardPicUrl(card);
};

const drawInitialHand = () => {
  for (let i = 0; i < 5; i += 1) {
    // Draw a card from top of deck

    const card = shuffledDeck.pop();
    card.holdStatus = false;
    // For testing on different card combis
    // const card = simulatedHand.pop();
    playerHand.push(card);

    // Create 'hold' display on top of card pressed ;
    let holdStatus = false;
    const holdStatusDisplay = document.createElement('div');
    holdStatusDisplay.classList.add('holdStatus');

    // Create a break element to separate hold status display and poker card display
    const breakElement = document.createElement('br');

    // Create image tag that holds path to current card's image
    const cardImage = document.createElement('img');
    cardImage.classList.add('cardImage');
    cardImage.setAttribute('id', `cardImg${i + 1}`);
    cardImage.src = getCardPicUrl(card);

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

// Function that generates onscreen the different
// winning combinations (and their prize monies [WIP])
const generateDisplayCombinations = () => {
  const winningCombiArray = ['Five-of-a-kind', 'Straight Flush', 'Four-of-a-kind', 'Full-House', 'Flush', 'Straight', 'Three-of-a-kind', 'Two-Pair', 'Jacks-or-better'];

  // Create column that describe winning combinations
  const nameOfCombiDisplay = document.createElement('div');
  nameOfCombiDisplay.classList.add('nameOfCombiDisplay');
  for (let i = 0; i < winningCombiArray.length; i += 1) {
    const winCombi = document.createElement('div');
    winCombi.innerText = winningCombiArray[i];
    winCombi.classList.add('winCombi');
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

// Function that creates an input that takes in user's input on
// how much credits to play per game
const createCreditsInput = () => {
  const creditsInput = document.createElement('input');
  creditsInput.setAttribute('type', 'number');
  creditsInput.setAttribute('id', 'inputCredits');
  creditsInput.setAttribute('placeholder', 'Type in credits');
  buttonsContainer.appendChild(creditsInput);
};

// Function that creates a button that allows users to increment credits
const createInsertCreditsBtn = () => {
  const insertCreditsBtn = document.createElement('button');
  insertCreditsBtn.innerText = 'INSERT \n 1 CREDIT';
  insertCreditsBtn.setAttribute('id', 'insertCreditsBtn');
  insertCreditsBtn.addEventListener('click', () => {
    if (numCreditsInserted < 5) {
      numCreditsInserted += 1;
      creditsInsertedDisplay.innerText = `INSERT CREDITS: ${numCreditsInserted}`;
      console.log(numCreditsInserted, 'creditsToBeInserted');
    }
  });
  buttonsContainer.appendChild(insertCreditsBtn);
};

// Function that creates a button for dealing cards
const createDealCardsBtn = () => {
  const dealBtn = document.createElement('button');
  dealBtn.setAttribute('id', 'dealBtn');
  dealBtn.innerText = 'DEAL';
  dealBtn.addEventListener('click', () => {
    if (numCreditsInserted > 0) {
      shuffledDeck = shuffleCards(makeDeck());
      cardsContainer.innerText = '';

      // clear playerHand first before drawing initial hand
      playerHand.length = 0;

      // clear cache of previous' hand's win combi
      nameOfWinCombi = 'No winning hand';
      drawInitialHand();
      checkForWinCombi();

      // calculate score and add to creditsLeft
      calcHandScore();

      // reset insert credits and deduct from credits left:
      creditsLeft -= numCreditsInserted;
      numCreditsInserted = 0;

      // reset stats display and make a new one;
      statsDisplay.innerText = '';
      createGameStatsDisplay();
    } else {
      console.log('cannot deal until you insert credits!');
    }
  });
  buttonsContainer.appendChild(dealBtn);
};

// Function that creates a button that allows user to swap cards
const createSwapCardsBtn = () => {
  const swapBtn = document.createElement('button');
  swapBtn.setAttribute('id', 'swapBtn');
  swapBtn.innerText = 'SWAP';
  swapBtn.addEventListener('click', () => {
    playerHand.map((currentCard, index) => {
      if (currentCard.holdStatus === false) {
        const newCard = shuffledDeck.pop();
        playerHand.splice(index, 1, newCard);
        displayNewDrawnCards(newCard, index);
      }
    });
    checkForWinCombi();
  });
  buttonsContainer.appendChild(swapBtn);
};

const createGameStatsDisplay = () => {
  // Display how much credits to play for this game
  creditsInsertedDisplay = document.createElement('div');
  creditsInsertedDisplay.innerText = `INSERT CREDITS: ${numCreditsInserted}`;
  creditsInsertedDisplay.setAttribute('id', 'creditsInserted');

  // Display what combination is present
  currentCombiDisplay = document.createElement('div');
  currentCombiDisplay.setAttribute('id', 'currentCombi');
  currentCombiDisplay.innerText = `${nameOfWinCombi}`;

  // Display how much credits the player has left
  creditsLeftDisplay = document.createElement('div');
  creditsLeftDisplay.innerText = `CREDITS LEFT: ${creditsLeft}`;
  creditsLeftDisplay.setAttribute('id', 'availCredits');

  statsDisplay.appendChild(creditsInsertedDisplay);
  statsDisplay.appendChild(currentCombiDisplay);
  statsDisplay.appendChild(creditsLeftDisplay);
};

const gameInit = () => {
  buildUI();
  shuffledDeck = shuffleCards(makeDeck());
  createGameStatsDisplay();
  createCreditsInput();
  createInsertCreditsBtn();
  createDealCardsBtn();
  createSwapCardsBtn();
};
// ==== EXECUTE GAME =====//

gameInit();
