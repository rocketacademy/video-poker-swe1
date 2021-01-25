// global variables
let cardInfo;
let credits = 100;
let betAmount = 0;
let winnings = 0;
let holdButton;
let points = 0;
const holdButtonArray = [];
const playerCardArray = [];
// for determining whether to deal/ draw when the deal/ draw button is clicked
let canDeal = false;
let canDraw = false;
let canBet = true;
// for detecting player hands
let cardRankCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let cardSuitCount = [0, 0, 0, 0];
// for checking of 2 pairs condition
let pairs = 0;
// for checking of full house condition
let threeOfAKind = 0;
let cardHand;

const getRandomIndex = (size) => Math.floor(Math.random() * size);

// cards is an array of card objects
const shuffleCards = (cards) => {
  // loop over the entire cards array
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // select a random position from the deck
    const randomIndex = getRandomIndex(cards.length);

    // get the current card in the loop
    const currentItem = cards[currentIndex];

    // get the random card
    const randomItem = cards[randomIndex];

    // swap the current card and the random card
    cards[currentIndex] = randomItem;
    cards[randomIndex] = currentItem;
  }

  // give back the shuffled deck
  return cards;
};

const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbols = ['♥️', '♦️', '♣️', '♠️'];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbols[suitIndex];
    console.log(`current suit: ${currentSuit}`);
    console.log(`current suitSymbol: ${currentSuitSymbol}`);

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;
      let cardDisplay = `${cardName}`;
      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      if (cardDisplay === '1') {
        cardDisplay = 'A';
      } else if (cardDisplay === '11') {
        cardDisplay = 'J';
      } else if (cardDisplay === '12') {
        cardDisplay = 'Q';
      } else if (cardDisplay === '13') {
        cardDisplay = 'K';
      }

      // make a single card object variable
      cardInfo = {
        suitSymbol: currentSuitSymbol,
        name: cardName,
        suit: currentSuit,
        display: cardDisplay,
        rank: rankCounter,
      };

      console.log(`rank: ${rankCounter}`);

      newDeck.push(cardInfo);
    }
  }

  return newDeck;
};

const deck = shuffleCards(makeDeck());

// creating the player card's display
const createCard = (cardInfo) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  if (cardInfo.suit === 'hearts' || cardInfo.suit === 'diamonds') {
    card.classList.add('red');
    console.log('color');
  } else if (cardInfo.suit === 'spades' || cardInfo.suit === 'clubs') {
    card.classList.add('black');
    console.log('color black');
  }

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.display;

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// creating the board where the heading/ messages will be displayed
const mainContainer = document.createElement('div');
mainContainer.classList.add('main');

const messageBoard = document.createElement('div');
messageBoard.classList.add('messageBoard');
messageBoard.innerText = 'VIDEO POKER';
mainContainer.appendChild(messageBoard);

const messageBoard2 = document.createElement('div');
messageBoard2.classList.add('messageBoard2');
messageBoard2.innerText = 'Enter a bet to start the game';
mainContainer.appendChild(messageBoard2);

// creating the board where the bets/ winnings are displayed

const creditDisplayDiv = document.createElement('div');
creditDisplayDiv.classList.add('text');
creditDisplayDiv.innerText = 'CREDITS';

const creditDisplay = document.createElement('div');
creditDisplay.classList.add('display');
creditDisplay.innerText = `${credits}`;

const creditDisplayContainer = document.createElement('div');
creditDisplayContainer.classList.add('box');

// box
// creating the 'box' where the player's cards will be displayed
const cardContainer = document.createElement('div');
cardContainer.classList.add('cardContainer');

// creating the console where hold buttons are
const playerConsole = document.createElement('div');
playerConsole.classList.add('console');
// creating where winnings, credits and amount bet will be displayed
const moneyDisplayContainer = document.createElement('div');
moneyDisplayContainer.classList.add('money');
mainContainer.appendChild(moneyDisplayContainer);

// individual displays within moneyDisplayContainer
creditDisplayContainer.appendChild(creditDisplayDiv);
creditDisplayContainer.appendChild(creditDisplay);
moneyDisplayContainer.appendChild(creditDisplayContainer);

// bet amount
const betDisplayDiv = document.createElement('div');
betDisplayDiv.classList.add('text');
betDisplayDiv.innerText = 'BET AMOUNT';
moneyDisplayContainer.appendChild(betDisplayDiv);

const betDisplay = document.createElement('div');
betDisplay.classList.add('display');
betDisplay.innerText = betAmount;
moneyDisplayContainer.appendChild(betDisplay);

const betDisplayContainer = document.createElement('div');
betDisplayContainer.classList.add('box');

betDisplayContainer.appendChild(betDisplayDiv);
betDisplayContainer.appendChild(betDisplay);
moneyDisplayContainer.appendChild(betDisplayContainer);

// winnings
const winningsDisplayDiv = document.createElement('div');
winningsDisplayDiv.classList.add('text');
winningsDisplayDiv.innerText = 'WINNINGS';
moneyDisplayContainer.appendChild(winningsDisplayDiv);

const winningsDisplay = document.createElement('div');
winningsDisplay.classList.add('display');
winningsDisplay.innerText = '0';
moneyDisplayContainer.appendChild(winningsDisplay);

const winningsDisplayContainer = document.createElement('div');
winningsDisplayContainer.classList.add('box');

winningsDisplayContainer.appendChild(winningsDisplayDiv);
winningsDisplayContainer.appendChild(winningsDisplay);
moneyDisplayContainer.appendChild(winningsDisplayContainer);

// container for cardContainer and console
const cardAndConsole = document.createElement('div');
cardAndConsole.classList.add('cardAndConsole');
cardAndConsole.appendChild(cardContainer);
cardAndConsole.appendChild(playerConsole);
mainContainer.appendChild(cardAndConsole);

// creating the buttons for betting
const creditsContainer = document.createElement('div');
creditsContainer.classList.add('credits');
mainContainer.appendChild(creditsContainer);

// helper function for resetting hold buttons
const resetHoldButtons = () => {
  playerConsole.innerHTML = '';
  for (let j = 0; j < 5; j += 1) {
    holdButtonArray[j] = false;
    holdButton = document.createElement('button');
    holdButton.classList.add('holdButton');
    holdButton.innerText = 'HOLD/ CANCEL';
    console.log('hold button', j);
    holdButton.addEventListener('click', (event) => {
      holdButtonClick(event.currentTarget, j);
    });
    playerConsole.appendChild(holdButton);
  }
};

// results displayed on message board
const showWinMessage = (input) => {
  messageBoard.innerText = input;
  return messageBoard.innerText;
};
const showWinnings = () => {
  messageBoard.innerText = `You win $${winnings} !!`;
  messageBoard2.innerHTML = 'Enter another bet to continue';
  return messageBoard.innerText, messageBoard2.innerText;
};

const displayWinningsAndMsg = () => {
  showWinMessage(cardHand);

  setTimeout(() => {
    showWinnings();
  }, 2000);
};

const displayGameResult = () => {
  winningsDisplay.innerText = `${winnings}`;
  messageBoard.innerText = cardHand;
  messageBoard2.innerText = 'Enter another bet to continue';
  // resetting the hold/draw buttons
  resetHoldButtons();

  displayWinningsAndMsg();
};

// detecting winning player hands
const calcHandScore = () => {
  // counting the number of cards of a rank in the player's hand
  // starts with ace at position 0
  for (let x = 0; x < 5; x += 1) {
    for (let y = 0; y <= 13; y += 1) {
      if (playerCardArray[x].rank === y + 1) {
        cardRankCount[y] += 1;
      }
    }
  }
  // console.log(cardRankCount);

  // counting the number of cards of a suit in the player's hand
  // hearts = playerCardArray[0]
  // diamonds = playerCardArray[1]
  // spades = playerCardArray[2]
  // clubs = playerCardArray[3]
  for (let a = 0; a < 5; a += 1) {
    if (playerCardArray[a].suit === 'hearts') {
      cardSuitCount[0] += 1;
    } else if (playerCardArray[a].suit === 'diamonds') {
      cardSuitCount[1] += 1;
    } else if (playerCardArray[a].suit === 'spades') {
      cardSuitCount[2] += 1;
    } else {
      cardSuitCount[3] += 1;
    }
  }
  // console.log(cardSuitCount);

  // checking for straight flush
  for (let d = 0; d < cardSuitCount.length; d += 1) {
    if (cardSuitCount[d] === 5) {
      for (let e = 0; e < cardRankCount.length; e += 1) {
        if (cardRankCount[e] === 1
      && cardRankCount[e + 1] === 1
      && cardRankCount[e + 2] === 1
      && cardRankCount[e + 3] === 1
      && cardRankCount[e + 4] === 1) {
          points = 50;
          winnings += (points * betAmount) - betAmount;
          cardHand = 'STRAIGHT FLUSH';
          return displayGameResult();
        }
      }
    }
  }

  // checking for 2 pairs, straight and 4 of a kind
  for (let z = 0; z < cardRankCount.length; z += 1) {
    if (cardRankCount[z] === 2) {
      pairs += 1;
      // checking for 2 pairs
      if (pairs === 2) {
        points = 2;
        winnings = (points * betAmount) - betAmount;
        cardHand = '2 PAIRS';
        return displayGameResult();
      }
      // checking for straight
    } else if (cardRankCount[z] === 1
      && cardRankCount[z + 1] === 1
      && cardRankCount[z + 2] === 1
      && cardRankCount[z + 3] === 1
      && cardRankCount[z + 4] === 1) {
      points = 4;
      winnings = (points * betAmount) - betAmount;
      cardHand = 'STRAIGHT';
      return displayGameResult();

      // checking for 4 of a kind
    } else if (cardRankCount[z] === 4) {
      points = 25;
      winnings = (points * betAmount) - betAmount;
      cardHand = '4 OF A KIND';
      return displayGameResult();

      // checking for full house
    } else if (cardRankCount[z] === 3) {
      threeOfAKind += 1;
      if (pairs === 1 && threeOfAKind === 1) {
        points = 6;
        winnings = (points * betAmount) - betAmount;
        cardHand = 'FULL HOUSE';
        return displayGameResult();
        // checking for 3 of a kind
      } if (threeOfAKind === 1) {
        points = 3;
        winnings = (points * betAmount) - betAmount;
        cardHand = 'THREE OF A KIND';
        return displayGameResult();
      }
    }
  }

  // checking for flush
  for (let b = 0; b < cardSuitCount.length; b += 1) {
    if (cardSuitCount[b] === 5) {
      points = 6;
      winnings = (points * betAmount) - betAmount;
      cardHand = 'FLUSH';
      return displayGameResult();
    }
  }

  if (points === 0) {
    messageBoard.innerText = 'You lose';
    messageBoard2.innerText = 'Please enter another bet';
    resetHoldButtons();
  }
  return messageBoard.innerText, messageBoard2.innerText;
};

// function that executes when deal/draw button is clicked
const dealingOrDrawing = () => {
  if (canDraw === true && canDeal === false) {
    cardContainer.innerHTML = '';
    // messageBoard.innerText = '';
    // replacing the cards that do not have 'hold' on them
    for (let k = 0; k < 5; k += 1) {
      if (holdButtonArray[k] === false) {
        playerCardArray[k] = deck.pop();
      }
      // console.log('second card array', playerCardArray);
      const secondCardElement = createCard(playerCardArray[k]);
      cardContainer.appendChild(secondCardElement);
    }
    console.log(playerCardArray);
    console.log(cardRankCount);
    calcHandScore();
    canDraw = false;
    betAmount = 0;
    canBet = true;
  } else if (canDraw === false && canDeal === true) {
    // creating the card elements
    for (let i = 0; i < 5; i += 1) {
      playerCardArray[i] = deck.pop();
      console.log('player card', i);
      console.log('playerCard array', playerCardArray);
      const cardElement = createCard(playerCardArray[i]);
      cardContainer.appendChild(cardElement);
    }
    canDeal = false;
    canDraw = true;
    messageBoard2.innerText = 'Choose the cards you want to hold & click draw';
  } else if (canDeal === false && canDraw === false) {
    messageBoard2.innerText = 'Please enter a bet';
  }
};

// player chooses which cards to 'hold'
const holdButtonClick = (holdButtonElement, j) => {
  // console.log('hold button number', j);
  if (holdButtonArray[j] === false) {
    holdButtonArray[j] = true;
    console.log('hold button array', holdButtonArray);
    holdButtonElement.innerText = 'HOLD';
  } else {
    holdButtonArray[j] = false;
    holdButtonElement.innerText = 'HOLD/ CANCEL';
  }
};

// player bets helper function
const creditButtonsClick = (input) => {
  messageBoard.innerText = 'VIDEO POKER';
  cardRankCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cardSuitCount = [0, 0, 0, 0];
  points = 0;

  if (input + betAmount > 5) {
    input = 0;
    canBet = false;
    messageBoard2.innerHTML = 'Bet limit exceeded<br>Click deal';
    return messageBoard2.innerHTML;
  }

  if (input + betAmount <= 5) {
    cardContainer.innerHTML = '';
    credits -= input;
    betAmount += input;
    canDeal = true;
    creditDisplay.innerText = credits;
    betDisplay.innerText = betAmount;
    messageBoard2.innerText = 'Click the deal button next';
    return creditDisplay.innerText, betDisplay.innerText, messageBoard2.innerText;
  }
};

const gameInit = () => {
  // append game layout into main container
  document.body.appendChild(mainContainer);

  // initialising betting buttons functionality
  // 1 credit
  const bet1Credit = document.createElement('button');
  bet1Credit.classList.add('creditButton');
  bet1Credit.innerText = 'BET 1 CREDIT';
  bet1Credit.addEventListener('click', () => {
    creditButtonsClick(1);
  });
  creditsContainer.appendChild(bet1Credit);

  // 5 credits
  const betMaxCredits = document.createElement('button');
  betMaxCredits.classList.add('creditButton');
  betMaxCredits.innerText = 'BET MAX CREDITS';
  betMaxCredits.addEventListener('click', () => {
    creditButtonsClick(5);
  });
  creditsContainer.appendChild(betMaxCredits);

  // creating the reset button
  const resetButton = document.createElement('button');
  resetButton.classList.add('reset');
  resetButton.innerText = 'RESET';
  creditsContainer.appendChild(resetButton);
  resetButton.addEventListener('click', () => {
    cardInfo;
    credits = 100;
    betAmount = 0;
    winnings = 0;
    holdButton;
    points = 0;
    const holdButtonArray = [];
    const playerCardArray = [];
    canDeal = false;
    canDraw = false;
    canBet = true;
    cardRankCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    cardSuitCount = [0, 0, 0, 0];
    pairs = 0;
    threeOfAKind = 0;
    cardHand;
    cardContainer.innerText = '';
    winningsDisplay.innerText = '0';
    betDisplay.innerText = betAmount;
    creditDisplay.innerText = `${credits}`;
  });

  // initialising the deal/draw button
  const dealOrdraw = document.createElement('button');
  dealOrdraw.classList.add('drawButton');
  dealOrdraw.innerText = 'DEAL/ DRAW';
  dealOrdraw.addEventListener('click', dealingOrDrawing);
  creditsContainer.appendChild(dealOrdraw);

  // initialising the 'hold/ cancel' buttons
  for (let j = 0; j < 5; j += 1) {
    holdButtonArray[j] = false;
    holdButton = document.createElement('button');
    holdButton.classList.add('holdButton');
    holdButton.innerText = 'HOLD/ CANCEL';
    console.log('hold button', j);
    holdButton.addEventListener('click', (event) => {
      holdButtonClick(event.currentTarget, j);
    });

    playerConsole.appendChild(holdButton);
  }
};

gameInit();
