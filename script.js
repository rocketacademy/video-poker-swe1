// Global variables
let gameMode = 'welcome!';
let credits = 100;
let betAmt = 0;
let deck;
const resultArray = ['LOSE', 'JACKS OR BETTER', 'TWO PAIR', 'THREE OF A KIND', 'STRAIGHT', 'FLUSH', 'FULL HOUSE', 'FOUR OF A KIND', 'STRAIGHT FLUSH', 'ROYAL FLUSH'];
const resultFactor = [0, 1, 2, 3, 4, 6, 9, 25, 50, 250];
const deckStatus = [];
const playerHand = [];

// Declare game elements
const cardGif1 = document.createElement('img');
const cardGif2 = document.createElement('img');
const projectTitle = document.createElement('h1');
const headerContainer = document.createElement('div');
const gameContainer = document.createElement('div');
// const bettingTableRef = document.createElement('div');
// const imgTable = document.createElement('img');
const gameMessage = document.createElement('div');
const cardStatusContainer = document.createElement('div');
const cardsContainer = document.createElement('div');
const popUpMsgContainer = document.createElement('div');
const msgGameOver = document.createElement('div'); // don't append yet
const bottomContainer = document.createElement('div');
const betContainer = document.createElement('div');
const creditContainer = document.createElement('div');
const dealDrawBtn = document.createElement('button');
const betAmtElement = document.createElement('div');
const betUpBtn = document.createElement('button');
const betDownBtn = document.createElement('button');
const beepSound = new Audio('short-beep.mp3');
beepSound.volume = 0.2;

// Apply CSS styles
gameContainer.classList.add('mainContainer');
cardGif1.src = 'img/chip2-webthumb.gif';
cardGif2.src = 'img/chip2-webthumb.gif';
// imgTable.src = 'img/bet-table.png';
// imgTable.classList.add('image');
cardGif1.classList.add('header-gif-style');
cardGif2.classList.add('header-gif-style');
popUpMsgContainer.classList.add('popUpMsgContainer');
msgGameOver.classList.add('pop-up-style');
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

// Special: HTML and CSS: Create table
const tableContainer = document.createElement('div');
tableContainer.classList.add('tableElement');
const tableCol = [];

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

// Function 5: Update credits on Hand
const updateCreditsOnHand = (outcomeIndex) => {
  const winFactor = [0, 1, 2, 3, 4, 6, 9, 25, 50, 250];
  let winnings;

  if (outcomeIndex === 9 && betAmt === 5) {
    winnings = 4000;
  } else {
    winnings = winFactor[outcomeIndex] * betAmt;
  }
  console.log(`Beg Credit Bal: ${credits}`);
  console.log(`Winnings: ${winnings}`);
  console.log(`End Credit Bal: ${credits + winnings}`);
  // credits += winnings;
  let counter = 0;
  const msgBoardRun = setInterval(() => {
    if (counter === winnings) {
      clearInterval(msgBoardRun);
    } else {
      counter += 1;
      credits += 1;
      console.log(counter);
    }
    creditContainer.innerHTML = `CREDITS: ${credits}`;
  }, 100);

  creditContainer.innerHTML = `CREDITS: ${credits}`;
};

// Function 6: Flash message banner across screen
const flashPopUpMsg = (message, flashCount) => {
  popUpMsgContainer.style.zIndex = 10;
  let timeEndCounter = 0;
  msgGameOver.innerText = message;
  const timeEnd = setInterval(() => {
    console.log(timeEndCounter);
    if (timeEndCounter % 2 === 0) {
      msgGameOver.style.visibility = 'hidden';
    } else {
      console.log('on');
      msgGameOver.style.visibility = 'visible';
    }
    timeEndCounter += 1;
    if (timeEndCounter > flashCount * 2) {
      clearInterval(timeEnd);
      msgGameOver.style.visibility = 'hidden';
      popUpMsgContainer.style.zIndex = -1;
    }
  }, 500);
};

// Function 6: Calculate score on player's hand
const calcHandScore = () => {
  let outcome;
  const sortedHand = sortArray(playerHand);

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
  // console.log(matchesArray);
  // Determine result
  if (matchesArray.length === 1 && (matchesArray[0] > 10 || matchesArray[0] === 1)) {
    outcome = 1; // JACKS OR BETTER
  } else if (matchesArray.length === 2 && matchesArray[0] !== matchesArray[1]) {
    outcome = 2; // TWO PAIR
  } else if (matchesArray.length === 2 && matchesArray[0] === matchesArray[1]) {
    outcome = 3; // THREE OF A KIND
  } else if (straightStatus === true && flushStatus === false) {
    outcome = 4; // STRAIGHT
  } else if (flushStatus === true && straightStatus === false && royalFlushStatus === false) {
    outcome = 5; // FLUSH
  } else if (matchesArray.length === 3 && matchesArray[0] !== matchesArray[2]) {
    outcome = 6; // FULL HOUSE
  } else if (matchesArray.length === 3 && matchesArray[0] === matchesArray[2]) {
    outcome = 7; // FOUR OF A KIND
  } else if (straightStatus === true && flushStatus === true) {
    outcome = 8; // STRAIGHT FLUSH
  } else if (royalFlushStatus === true && flushStatus === true) {
    outcome = 9; // ROYAL FLUSH
  } else {
    outcome = 0; // LOSE
  }

  // result array
  const resultArray = ['LOSE', 'JACKS OR BETTER', 'TWO PAIR', 'THREE OF A KIND', 'STRAIGHT', 'FLUSH', 'FULL HOUSE', 'FOUR OF A KIND', 'STRAIGHT FLUSH', 'ROYAL FLUSH'];
  updateCreditsOnHand(outcome);

  // Flash message banner here
  flashPopUpMsg(resultArray[outcome], 3);

  return resultArray[outcome];
};

// Function 7: Click card
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

// Function 8: Update visual cards being displayed
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
      clickCard(i, singleStatus);
    });

    // Add card image and status based on gameMode
    if (gameMode === 'welcome!') {
      singleCard.src = 'Single_Cards/Card_back.png';
      singleStatus.innerHTML = '';
      singleCard.style.visibility = 'hidden';
      setTimeout(() => {
        beepSound.play();
        singleCard.style.visibility = 'visible';
      }, 50 + i * 50);
      beepSound.pause();
    } else {
      singleCard.src = `Single_Cards/${playerHand[i].suit}-${playerHand[i].rank}.png`;
      singleStatus.innerHTML = deckStatus[i];
      if (deckStatus[i] === 'cancel') {
        singleCard.style.visibility = 'hidden';
        setTimeout(() => {
          beepSound.play();
          singleCard.style.visibility = 'visible';
        }, 50 + i * 50);
        beepSound.pause();
      }
    }
  }
};

// Function 9: Initialise the game
const initGame = () => {
  // Create page layout
  document.body.appendChild(headerContainer);
  document.body.appendChild(popUpMsgContainer);
  headerContainer.appendChild(cardGif1);
  headerContainer.appendChild(projectTitle);
  headerContainer.appendChild(cardGif2);
  document.body.appendChild(gameContainer);
  // gameContainer.appendChild(bettingTableRef);
  gameContainer.appendChild(tableContainer);
  // bettingTableRef.appendChild(imgTable);
  gameContainer.appendChild(gameMessage);
  gameContainer.appendChild(cardStatusContainer);
  gameContainer.appendChild(cardsContainer);
  // gameContainer.appendChild(popUpMsgContainer);
  popUpMsgContainer.appendChild(msgGameOver);
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

  // Specially for table
  for (let i = 0; i < 6; i += 1) {
    tableCol[i] = document.createElement('div');
    tableContainer.appendChild(tableCol[i]);
    if (i === 0) {
      for (let j = 9; j > 0; j -= 1) {
        tableCol[i].classList.add('firsttableCol');
        tableCol[i].innerHTML += `${resultArray[j]} </br>`;
      }
    }
    if (i > 0) {
      for (let j = 9; j > 0; j -= 1) {
        tableCol[i].classList.add('numbertableCol');
        if (i === 5 && j === 9) {
          tableCol[i].innerHTML += '4000 </br>';
        } else {
          tableCol[i].innerHTML += `${resultFactor[j] * i} </br>`;
        }
      }
    }
  }

  // Initial layout
  buildCardTable();

  // Add functionality to buttons
  // to refactor
  betUpBtn.addEventListener('click', () => {
    msgGameOver.style.visibility = 'hidden';
    if (gameMode === 'result') {
      credits -= betAmt;
      gameMode = 'welcome!';
      buildCardTable();
    } else if (betAmt < 5 && gameMode === 'welcome!') {
      betAmt += 1;
      credits -= 1;
    }
    betAmtElement.innerHTML = `BET: ${betAmt}`;
    creditContainer.innerHTML = `CREDITS: ${credits}`;
    for (let i = 1; i < 6; i += 1) {
      if (i === betAmt) {
        tableCol[i].style.backgroundColor = '#df0029';
      } else {
        tableCol[i].style.backgroundColor = 'transparent';
      }
    }
  });

  betDownBtn.addEventListener('click', () => {
    msgGameOver.style.visibility = 'hidden';
    if (gameMode === 'result') {
      credits -= betAmt;
      gameMode = 'welcome!';
      buildCardTable();
    }
    if (betAmt > 0 && gameMode === 'welcome!') {
      betAmt -= 1;
      credits += 1;
    }
    betAmtElement.innerHTML = `BET: ${betAmt}`;
    creditContainer.innerHTML = `CREDITS: ${credits}`;
    for (let i = 1; i < 6; i += 1) {
      if (i === betAmt) {
        tableCol[i].style.backgroundColor = '#df0029';
      } else {
        tableCol[i].style.backgroundColor = 'transparent';
      }
    }
  });

  dealDrawBtn.addEventListener('click', () => {
    console.log('------------ Submitted ------------');
    console.log(`Beg game mode: ${gameMode}`);
    msgGameOver.innerHTML = '';
    // update gameMode
    if (gameMode === 'welcome!') {
      gameMode = 'deal1';
    }
    if (gameMode === 'result') {
      // credits -= betAmt;
      creditContainer.innerHTML = `CREDITS: ${credits}`;
      let counter = 0;
      const msgBoardRun = setInterval(() => {
        if (counter === betAmt) {
          clearInterval(msgBoardRun);
        } else {
          counter += 1;
          credits -= 1;
          console.log(counter);
        }
        creditContainer.innerHTML = `CREDITS: ${credits}`;
      }, 100);
      gameMode = 'deal1';
    }

    // if user did not bet, don't start

    if (betAmt === 0) {
      gameMessage.innerHTML = 'Please place a bet amount';
      gameMode = 'welcome!';
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
      calcHandScore();
      gameMessage.innerHTML = 'Change your bet and deal again';
      gameMode = 'result';
    }

    // update gameMode
    console.log(`End game mode: ${gameMode}`);
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
