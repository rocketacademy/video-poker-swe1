// Global variables
const playerHand = [];
const gameMode = 'placeBet';
const credits = 100;
const betAmt = 5;
let deck;

// Declare game elements
const projectTitle = document.createElement('h1');
const gameContainer = document.createElement('div');
const bettingTableRef = document.createElement('div');
const imgTable = document.createElement('img');
const msgResult = document.createElement('div');
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
msgResult.classList.add('msgResult');
cardStatusContainer.classList.add('flexContainers');
cardsContainer.classList.add('flexContainers');
cardStatusContainer.classList.add('cardStatusContainer');
cardsContainer.classList.add('cardsContainer');
msgResult.classList.add('msgResult');
bottomContainer.classList.add('bottomContainer');
betContainer.classList.add('bottomContainerElements');
betAmtElement.classList.add('betAmtElement');
creditContainer.classList.add('bottomContainerElements');
betUpBtn.classList.add('betBtns');
betDownBtn.classList.add('betBtns');
dealDrawBtn.classList.add('dealDrawBtn');

// Function 1: Create Deck
const createDeck = () => {
  const deck = [];
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];

  for (let i = 0; i < suits.length; i += 1) {
    const currentSuit = suits[i];
    for (let j = 1; j <= 13; j += 1) {
      currentRank = j;
      currentName = j;
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
      deck.push(card);
    }
  }
  return deck;
};

// Function 2: Select random number
const returnRandomNo = (ceiling) => Math.floor(Math.random() * ceiling + 1);

// Function 3: Shuffle Deck
const shuffleDeck = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    const randomNumber = returnRandomNo(array.length);
    const currentCard = array[i];
    array[i] = array[randomNumber];
    array[randomNumber] = currentCard;
  }
  return array;
};

// Function 4: Calculate score on player's hand
const calcHandScore = () => {};

// Function 5: Click card
const clickCard = () => {};

// Function 6: Update cards on the
const updateTableCards = () => {};

// Function 7: The game
const initGame = () => {
  deck = shuffleDeck(createDeck());

  // Create page layout
  document.body.appendChild(projectTitle);
  document.body.appendChild(gameContainer);
  gameContainer.appendChild(bettingTableRef);
  bettingTableRef.appendChild(imgTable);
  gameContainer.appendChild(msgResult);
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
  msgResult.innerHTML = 'Game Message will come here';
  cardStatusContainer.innerHTML = 'card status will be updated here';
  cardsContainer.innerHTML = 'cards will be placed here';

  // Add functionality to buttons

  // Deal cards to player
  for (let i = 0; i < 5; i += 1) {
    playerHand.push(deck.pop());
  }
};

initGame();
