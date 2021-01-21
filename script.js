// Global variables
let gameMode = 'welcome!';
let credits = 100;
let betAmt = 0;
let deck;
const deckStatus = [];
const playerHand = [];

// Declare game elements
const projectTitle = document.createElement('h1');
const gameContainer = document.createElement('div');
const bettingTableRef = document.createElement('div');
const imgTable = document.createElement('img');
const gameMessage = document.createElement('div');
const cardStatusContainer = document.createElement('div');
const cardsContainer = document.createElement('div');
const msgGameOver = document.createElement('div'); // don't append yet
const bottomContainer = document.createElement('div');
const betContainer = document.createElement('div');
const creditContainer = document.createElement('div');
const dealDrawBtn = document.createElement('button');
const betAmtElement = document.createElement('div');
const betUpBtn = document.createElement('button');
const betDownBtn = document.createElement('button');

// Apply CSS styles
gameContainer.classList.add('mainContainer');
imgTable.src = 'img/bet-table.png';
imgTable.classList.add('image');
gameMessage.classList.add('gameMessage');
cardStatusContainer.classList.add('grey-background', 'cardStatusContainer');
cardsContainer.classList.add('grey-background', 'cardsContainer');
bottomContainer.classList.add('bottomContainer');
betContainer.classList.add('bottomContainerElements');
creditContainer.classList.add('bottomContainerElements', 'big-words');
dealDrawBtn.classList.add('bottomContainerElements', 'dealDrawBtn');
betAmtElement.classList.add('betAmtElement', 'big-words');
betUpBtn.classList.add('betBtns');
betDownBtn.classList.add('betBtns');

// Function 1: Create Deck
const createDeck = () => {
  const newDeck = [];
  const suits = ['DIAMOND', 'CLUB', 'HEART', 'SPADE'];

  for (let i = 0; i < suits.length; i += 1) {
    const currentSuit = suits[i];
    for (let j = 1; j <= 13; j += 1) {
      const currentRank = j;
      let currentName = j;
      if (currentName === 1) {
        currentName = 'Ace';
      } else if (currentName === 11) {
        currentName = 'Jack';
      } else if (currentName === 12) {
        currentName = 'Queen';
      } else if (currentName === 13) {
        currentName = 'King';
      }

      // create card object
      const card = {
        name: currentName,
        suit: currentSuit,
        rank: currentRank,
      };
      // push the cards
      newDeck.push(card);
      // console.log(`${card.name} of ${card.suit}`);
    }
  }
  return newDeck;
};

// Function 2: Select random number
const returnRandomNo = (ceiling) => Math.floor(Math.random() * ceiling);

// Function 3: Shuffle Deck
const shuffleDeck = (array) => {
  const deckLen = array.length;
  console.log(deckLen);
  for (let i = 0; i < deckLen; i += 1) {
    const randomNumber = returnRandomNo(deckLen);
    const currentCard = array[i];
    const randomCard = array[randomNumber];
    array[i] = randomCard;
    array[randomNumber] = currentCard;
  }
  return array;
};

// Function 4: Sort an Array
const sortArray = (inputArray) => {
  let sorted = false;
  while (sorted === false) {
    let swapCounts = 0;
    for (let i = 0; i < inputArray.length - 1; i += 1) {
      if (inputArray[i].rank > inputArray[i + 1].rank) {
        const tempObj = inputArray[i + 1];
        inputArray[i + 1] = inputArray[i];
        inputArray[i] = tempObj;
        swapCounts += 1;
      } else if (i === inputArray.length - 2 && swapCounts === 0) {
        sorted = true;
      }
    }
  }
  return inputArray;
};

// Function 4: Calculate score on player's hand
const calcHandScore = () => {
  // if () TO DOO!!! ####################################################
  let result = 'lose';
  const sortedHand = sortArray(playerHand);
  const winFactor = [1, 2, 3, 4, 6, 9, 25, 50, 250];

  // Create comparison arrays
  const royalFlushArray = [1, 10, 11, 12, 13];

  // Create status arrays
  const matchesArray = [];
  let straightStatus = true;
  let flushStatus = true;
  let royalFlushStatus = true;

  // Loop through sortedHand
  for (let i = 0; i < 4; i += 1) {
    // if matches are found, push to matchesArray
    if (sortedHand[i].rank === sortedHand[i + 1].rank) {
      matchesArray.push(sortedHand[i].rank);
    }
    // if any two have a different suit, set flush status to false
    if (sortedHand[i].suit !== sortedHand[i + 1].suit) {
      flushStatus = false;
    }
    // if any two numbers are not consecutive, set straight status to false
    if (sortedHand[i].rank !== sortedHand[i + 1].rank - 1) {
      straightStatus = false;
    }
    if (sortedHand[i].rank !== royalFlushArray[i]) {
      royalFlushStatus = false;
    }
  }
  console.log(matchesArray);
  // Determine result
  if (matchesArray.length === 1 && (matchesArray[0] > 10 || matchesArray[0] === 1)) {
    result = 'JACKS OR BETTER';
  } else if (matchesArray.length === 2 && matchesArray[0] !== matchesArray[1]) {
    result = 'TWO PAIR';
  } else if (matchesArray.length === 2 && matchesArray[0] === matchesArray[1]) {
    result = 'THREE OF A KIND';
  } else if (straightStatus === true && flushStatus === false) {
    result = 'STRAIGHT';
  } else if (flushStatus === true && straightStatus === false && royalFlushStatus === false) {
    result = 'FLUSH';
  } else if (matchesArray.length === 3 && matchesArray[0] !== matchesArray[2]) {
    result = 'FULL HOUSE';
  } else if (matchesArray.length === 3 && matchesArray[0] === matchesArray[2]) {
    result = 'FOUR OF A KIND';
  } else if (straightStatus === true && flushStatus === true) {
    result = 'STRAIGHT FLUSH';
  } else if (royalFlushStatus === true && flushStatus === true) {
    result = 'ROYAL FLUSH';
  }
  return result;
};

// Function 5: Click card
const clickCard = (cardIndex, statusObj) => {
  if (gameMode === 'deal2') {
    if (deckStatus[cardIndex] === 'cancel') {
      deckStatus[cardIndex] = 'hold';
    } else {
      deckStatus[cardIndex] = 'cancel';
    }
    statusObj.innerHTML = deckStatus[cardIndex];
  }
};

// Function 6: Update cards on the
const buildCardTable = () => {
  cardStatusContainer.innerHTML = '';
  cardsContainer.innerHTML = '';
  for (let i = 0; i < 5; i += 1) {
    // Create status element for each card
    const singleStatus = document.createElement('div');
    singleStatus.classList.add('card-style');
    cardStatusContainer.appendChild(singleStatus);

    // Create img element for each card
    const singleCard = document.createElement('img');
    singleCard.classList.add('card-style');
    cardsContainer.appendChild(singleCard);
    singleCard.addEventListener('click', () => {
      console.log('clicked');
      clickCard(i, singleStatus);
    });

    // Add card image and status based on gameMode
    if (gameMode === 'welcome!') {
      singleCard.src = 'Single_Cards/Card_back.png';
      singleStatus.innerHTML = '';
    } else {
      singleCard.src = `Single_Cards/${playerHand[i].suit}-${playerHand[i].rank}.png`;
      singleStatus.innerHTML = deckStatus[i];
    }
  }
};

// Function 7: The game
const initGame = () => {
  // Create page layout
  document.body.appendChild(projectTitle);
  document.body.appendChild(gameContainer);
  gameContainer.appendChild(bettingTableRef);
  bettingTableRef.appendChild(imgTable);
  gameContainer.appendChild(gameMessage);
  gameContainer.appendChild(cardStatusContainer);
  gameContainer.appendChild(cardsContainer);
  gameContainer.appendChild(msgGameOver);
  gameContainer.appendChild(bottomContainer);
  bottomContainer.appendChild(creditContainer);
  bottomContainer.appendChild(betContainer);
  bottomContainer.appendChild(dealDrawBtn);
  betContainer.appendChild(betAmtElement);
  betContainer.appendChild(betUpBtn);
  betContainer.appendChild(betDownBtn);

  projectTitle.innerHTML = 'Video Poker';
  creditContainer.innerHTML = `CREDITS: ${credits}`;
  betUpBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
  betDownBtn.innerHTML = '<i class="fa fa-arrow-down"></i>';
  dealDrawBtn.innerText = 'Deal / Submit';
  betAmtElement.innerHTML = `BET: ${betAmt}`;
  // Temp placeholders
  gameMessage.innerHTML = 'Place your bet';
  cardStatusContainer.innerHTML = 'card status will be updated here';
  cardsContainer.innerHTML = 'cards will be placed here';

  // Initial layout
  buildCardTable();

  // Add functionality to buttons
  // to refactor
  betUpBtn.addEventListener('click', () => {
    if (betAmt < 5 && (gameMode === 'welcome!' || gameMode === 'result')) {
      betAmt += 1;
      credits -= 1;
      betAmtElement.innerHTML = `BET: ${betAmt}`;
      creditContainer.innerHTML = `CREDITS: ${credits}`;
    }
  });
  betDownBtn.addEventListener('click', () => {
    if (betAmt > 0 && (gameMode === 'welcome!' || gameMode === 'result')) {
      betAmt -= 1;
      credits += 1;
      betAmtElement.innerHTML = `BET: ${betAmt}`;
      creditContainer.innerHTML = `CREDITS: ${credits}`;
    }
  });
  dealDrawBtn.addEventListener('click', () => {
    // update gameMode
    console.log(gameMode);
    console.log(playerHand);
    if (gameMode === 'welcome!' || gameMode === 'result') {
      gameMode = 'deal1';
    }

    // if user did not bet, don't start
    if (betAmt === 0) {
      gameMessage.innerHTML = 'Please place a bet amount';
      gameMode = 'result';
      // If player submits bet, create new deck and deal first hand
    } else if (gameMode === 'deal1' && betAmt > 0) {
      deck = shuffleDeck(createDeck());
      for (let i = 0; i < 5; i += 1) {
        deckStatus[i] = 'cancel';
        playerHand[i] = deck.pop();
      }
      buildCardTable();
      gameMessage.innerHTML = 'Click on cards to hold/cancel';
      gameMode = 'deal2';
      // if second time, replce 'cancel' cards and determine result
    } else if (gameMode === 'deal2' && betAmt > 0) {
      for (let i = 0; i < 5; i += 1) {
        if (deckStatus[i] === 'cancel') {
          playerHand[i] = deck.pop();
        }
      }
      buildCardTable();
      gameMessage.innerHTML = `Game result: ${calcHandScore()} </br> Change your bet and deal again`;
      gameMode = 'result';
    }

    // update gameMode
    console.log(gameMode);
    console.log(playerHand);
  });

  // Deal cards to player
};

initGame();
const testHand = [
  {
    rank: 10,
    suit: 'DIAMOND',
    name: '10',
  },
  {
    rank: 1,
    suit: 'DIAMOND',
    name: 'ace',
  },
  {
    rank: 13,
    suit: 'DIAMOND',
    name: 'King',
  },
  {
    rank: 11,
    suit: 'DIAMOND',
    name: 'Jack',
  },
  {
    rank: 12,
    suit: 'DIAMOND',
    name: 'Queen',
  },
];
