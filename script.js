// Global variables
// DOM Elements
// Table container to hold the result of the game.
let tableScoreCard = null;
// Button to show and hide the score card
let buttonShowHideScore = null;
// Button to Deal / Draw
let buttonDealDraw = null;
// Game Status element
let divGameStatus = null;
// Container that holds the dealt cards board
let divDealtCardBoardElement = null;
let deck = null;
let isGameOver = false;
const gameResultType = '';

// Variable that holds the score at a given time
const currentGameScore = INITIAL_CREDIT_PLAYER;
const numOfGamesLost = 0;
const numOfGamesWon = 0;

// Variable to store data other than DOM elements
const boardOfDealtCards = [];

// Get a random number, given a maximum value
const getRandomNumber = (maxValue) => Math.floor(Math.random() * maxValue);

// Function to shuffle a set of cards
const shuffleCards = (cardArray) => {
  // loop over the entire cards array
  for (let currentIndex = 0; currentIndex < cardArray.length; currentIndex += 1) {
    // select a random position from the deck
    const randomIndex = getRandomNumber(cardArray.length);
    // get the current card in the loop
    const currentItem = cardArray[currentIndex];
    // get the random card
    const randomItem = cardArray[randomIndex];
    // swap the current card and the random card
    cardArray[currentIndex] = randomItem;
    cardArray[randomIndex] = currentItem;
  }
  // give back the shuffled deck
  return cardArray;
};

// Function to create a deck of cards
const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  // Array to store the details of the card like Suit, Symbol and Color for respective suit
  const suits = [['hearts', '♥', 'red'], ['diamonds', '♦', 'red'],
    ['clubs', '♣', 'black'], ['spades', '♠', 'black']];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex][0];
    const currentSuitSymbol = suits[suitIndex][1];
    const currentCardColor = suits[suitIndex][2];
    // console.log(`current suit: ${currentSuit}`);

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;
      let displayName = cardName;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
        displayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K';
      }

      // make a single card object variable
      const card = {
        name: cardName,
        display: displayName,
        suit: currentSuit,
        suitSymbol: currentSuitSymbol,
        rank: rankCounter,
        color: currentCardColor,
        hold: false, // Indicates whether this card is on hold or not
      };

      // console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(card);
    }
  }
  return newDeck;
};

// This function calculates the points user scored for the cards in hand.
const calcHandScore = () => {
  let totalScore = 0;
  for (let i = 0; i < boardOfDealtCards.length; i += 1)
  {
    totalScore += boardOfDealtCards[i].rank;
  }

  // Check for each value
  // Check whether the card is pinned or not
  // Update the current score, if it was already a draw
  // Update the lost and won game count
  // If it's a win set the game type result too

  return totalScore;
};

// Checks who is the winner
const hasPlayerWon = () => {
  if (currentGameScore <= 0)
  {
    // Score is zero or negative may be
    return false;
  }
  if (numOfGamesLost > numOfGamesWon)
  {
    return false;
  }
  return true;
};

// Function to set the game status
const setGameStatus = (message) => {
  divGameStatus.innerHTML = message;
};

const toggleElementDisplay = (elementToToggle) => {
  elementToToggle.style.display = (elementToToggle.style.display === 'none') ? 'block' : 'none';
  buttonShowHideScore.innerText = (buttonShowHideScore.innerText === TXT_SHOW_RESULT)
    ? TXT_HIDE_RESULT : TXT_SHOW_RESULT;
};

// Function to display the default view of a card
// Used, when there is no card is drawn for a particular element
const displayEmptyCard = (cardElement) =>
{
  cardElement.innerHTML = '';

  const divHoldStatusElement = document.createElement('div');
  divHoldStatusElement.classList.add('hold-status', 'default-fill');

  const divNameElement = document.createElement('div');
  divNameElement.classList.add('name', 'default-fill');
  // divNameElement.innerText = '***';

  const divSuitElement = document.createElement('div');
  divSuitElement.classList.add('suit', 'default-fill');

  cardElement.appendChild(divNameElement);
  cardElement.appendChild(divSuitElement);

  return cardElement;
};

// Function to display the card details in the respective card element
const displayCardElement = (cardElement, cardInfo, isScoreCardElement = false) => {
  if (cardInfo === null)
  {
    return displayEmptyCard(cardElement);
  }
  // The parent element that holds both the display name and suit symbol
  // This element represents a whole single card
  cardElement.innerHTML = '';
  if (!isScoreCardElement) {
    // Creating element to display the Holding status of the card
    const divHoldStatusElement = document.createElement('div');
    divHoldStatusElement.classList.add('hold-status');
    divHoldStatusElement.innerText = (cardInfo.hold) ? '📌' : '';
    cardElement.appendChild(divHoldStatusElement);
  }

  // Creating the element for storing the card display name
  // 2 Class names are applicable "name, <color>"
  const divNameElement = document.createElement('div');
  divNameElement.classList.add('name', cardInfo.color);
  divNameElement.innerText = cardInfo.display;
  cardElement.appendChild(divNameElement);

  // Creating the element for storing the suit symbol of the card
  // Class = "suit, <color>"
  const divSuitElement = document.createElement('div');
  divSuitElement.classList.add('suit', cardInfo.color);
  divSuitElement.innerText = cardInfo.suitSymbol;
  cardElement.appendChild(divSuitElement);
  // Card element is returned from this function
  return cardElement;
};

// Function to create a table cell that displays the card
const createCardCell = (cardDeck) => {
  /**
   * <div class="single-card reduced-card">
   *   <div class="name red reduced-size">A</div>
   *   <div class="suit red reduced-size">💗</div>
   * </div>
   */
  const cellFinalCardSet = document.createElement('td');
  for (let i = 0; i < cardDeck.length; i += 1)
  {
    const divSingleCardElement = document.createElement('div');
    divSingleCardElement.classList.add('single-card', 'reduced-card');
    displayCardElement(divSingleCardElement, cardDeck[i], true);
    // Add the class 'reduced-size' to each card element div for name and suit
    divSingleCardElement.childNodes.forEach((childNode) => {
      childNode.classList.add('reduced-size');
    });
    cellFinalCardSet.appendChild(divSingleCardElement);
  }
  return cellFinalCardSet;
};

// Function to add the result of a game to the total score card table
const addScoreCard = (dealtCardBoard) => {
  // Define the column headers for rows
  const rowElement = document.createElement('tr');
  const cellGameCount = document.createElement('td');
  cellGameCount.innerText = numOfGamesWon + numOfGamesLost;
  rowElement.appendChild(cellGameCount);

  const cellGameResult = document.createElement('td');
  cellGameResult.innerText = ''; // Game type he won if it's a win
  rowElement.appendChild(cellGameResult);

  const cellCurrentScore = document.createElement('td');
  cellCurrentScore.innerText = currentGameScore;
  rowElement.appendChild(cellCurrentScore);

  rowElement.appendChild(createCardCell(dealtCardBoard));
  tableScoreCard.appendChild(rowElement);
};

// Function to handle result score card display
const displayScoreCard = () => {
  const gameInfoMessage = (hasPlayerWon()) ? 'You won!!' : 'You lost!!';
  setGameStatus(`Game Over. 
  ${gameInfoMessage}.
  Please check score card for details.`);
  // Display the current cards in the score cards
  addScoreCard(boardOfDealtCards);
};

const onClickSingleCard = (singleCardElement, indexCard) => {
  if (isGameOver)
  {
    // If the game is over, click on the cards should not be handled.
    return;
  }
  boardOfDealtCards[indexCard].hold = !boardOfDealtCards[indexCard].hold;
  // Show the hold status over the card
  displayCardElement(singleCardElement, boardOfDealtCards[indexCard]);
};

// Function to create dealt card container and card elements
const createDealtCardsElement = (dealtCardBoard) => {
  // Container to hold the cards that are played
  const divDealtCardContainer = document.createElement('div');
  divDealtCardContainer.classList.add('dealt-cards');

  // Creating seperate element for each card
  for (let i = 0; i < dealtCardBoard.length; i += 1)
  {
    const divSingleCardElement = document.createElement('div');
    divSingleCardElement.classList.add('single-card');
    displayCardElement(divSingleCardElement, dealtCardBoard[i]);
    // Event is passed to the click handler function to change the display
    divSingleCardElement.addEventListener('click', () => { onClickSingleCard(divSingleCardElement, i); });
    divDealtCardContainer.appendChild(divSingleCardElement);
  }
  return divDealtCardContainer;
};

// Function that handles Deal or Draw
const onClickDealDrawButton = () =>
{
  const buttonText = buttonDealDraw.innerText;
  // Check whether the button string is Deal/Draw.
  // If so, the current request is considered as to draw cards,
  // in place of cards that are not selected.
  let drawAndReplaceCards = (String(buttonText).includes(TXT_DRAW));
  // consider it as a new deal, if the game is starting over.
  if (isGameOver)
  {
    drawAndReplaceCards = false;
    isGameOver = false;
    setGameStatus('');
  }
  for (let i = 0; i < boardOfDealtCards.length; i += 1)
  {
    // The card is replaced in following cases:
    // 1. It's a new deal
    // 2. It's a draw and the current card is not on hold
    // If it is a draw, need to replace only if the card is not held by player.
    // So, if draw request is made, but the card is on hold, skip the loop.
    if ((!drawAndReplaceCards) || ((drawAndReplaceCards && !boardOfDealtCards[i].hold)))
    {
      boardOfDealtCards[i] = deck.pop();
    }
    // Change the display of the card
    displayCardElement(divDealtCardBoardElement.childNodes[i], boardOfDealtCards[i]);
  }
  // Check Hand Score and decide the winner, if it's already a draw request
  if (drawAndReplaceCards)
  {
    calcHandScore();
    displayScoreCard();
    isGameOver = true;
    buttonDealDraw.innerText = TXT_DEAL;
    return;
  }
  buttonDealDraw.innerText = TXT_DRAW;
};

// Function to fill the pay-table data
const fillPayTableData = (tablePayEl) => {
  for (let i = 0; i < PAY_TABLE_ARRAY.length; i += 1)
  {
    // Define the column headers for rows
    const rowElement = document.createElement('tr');
    const cellGameType = document.createElement('td');
    cellGameType.classList.add('tooltip');
    cellGameType.innerText = PAY_TABLE_ARRAY[i][0];
    const spanGameDesc = document.createElement('span');
    spanGameDesc.classList.add('tooltip-text');
    spanGameDesc.innerText = PAY_TABLE_ARRAY[i][1];
    cellGameType.appendChild(spanGameDesc);
    rowElement.appendChild(cellGameType);

    const cellGamePoints = document.createElement('td');
    cellGamePoints.innerText = PAY_TABLE_ARRAY.length - i;
    rowElement.appendChild(cellGamePoints);

    // const cellCurrentDesc = document.createElement('td');
    // cellCurrentDesc.innerText = PAY_TABLE_ARRAY[i][1];
    // rowElement.appendChild(cellCurrentDesc);

    tablePayEl.appendChild(rowElement);
  }
};

// Function that displays the list of possible hands that gives a score
const createPayTableContainer = (divGameParentContainer) => {
  // Pay Table container
  const divPayTableContainer = document.createElement('div');
  divPayTableContainer.classList.add('pay-table');
  divGameParentContainer.appendChild(divPayTableContainer);

  const tablePayEl = document.createElement('table');
  tablePayEl.createCaption('Pay Table');
  // Define the column headers for rows
  const rowElement = document.createElement('tr');
  tablePayEl.appendChild(rowElement);
  const rowHeaderGameType = document.createElement('th');
  rowHeaderGameType.innerText = 'Game Type';
  rowElement.appendChild(rowHeaderGameType);
  const rowHeaderGamePoints = document.createElement('th');
  rowHeaderGamePoints.innerText = 'Points';
  rowElement.appendChild(rowHeaderGamePoints);
  // const rowHeaderDesc = document.createElement('th');
  // rowHeaderDesc.innerText = 'Description';
  // rowElement.appendChild(rowHeaderDesc);

  fillPayTableData(tablePayEl);
  divPayTableContainer.appendChild(tablePayEl);
};

// Set of functions that creates all the elements for game play div
/**
 * <div class="game">
 *   <div class="game-play">
 *     <h1>Play</h1>
 *     <div class="buttons">
 *       <button>Start or Draw/Deal or Deal</button>
 *     </div>
 *     <div class="dealt-cards">
 *       <div class="single-card">
 *         <div class="name red">A</div>
 *         <div class="suit red">💗</div>
 *       </div>
 *       <div class="single-card">
 *         <div class="name red">A</div>
 *         <div class="suit red">💗</div>
 *       </div>
 *     </div>
 *     <div class="status">
 *       Display the status of the last game
 *     </div>
 *   </div >
 *
 *   <div class="pay-table">
 *     <table class>Pay Table
 *       <tr>
 *         <th>Game Type</th>
 *         <th>Points</th>
 *       </tr>
 *       <tr>
 *         <td>Five of a kind</td>
 *         <td>2</td>
 *       </tr>
 *     </table>
 *   </div>
 * </div>
 *  */
const createGameContainerElements = (divGameContainer) => {
  // Game playing container
  // <div class="game-play">
  const divGamePlayContainer = document.createElement('div');
  divGamePlayContainer.classList.add('game-play');

  // Button to Deal/Draw cards
  // The initial text on the button will be "Deal".
  // Once a deal is made and player has clicked any of the cards,
  // the text on the button should change to "Draw/Deal"
  const divDealDrawButton = document.createElement('div');
  divDealDrawButton.classList.add('buttons');

  // Button for Deal / draw
  buttonDealDraw = document.createElement('button');
  buttonDealDraw.innerText = TXT_DEAL;
  buttonDealDraw.addEventListener('click', onClickDealDrawButton);

  // Initialize the board of cards to be displayed
  for (let i = 0; i < NUM_OF_CARDS_DRAWN; i += 1)
  {
    boardOfDealtCards.push(null);
  }

  // Status element
  divGameStatus = document.createElement('div');
  divGameStatus.classList.add('status');

  divDealDrawButton.appendChild(buttonDealDraw);
  divGamePlayContainer.appendChild(divDealDrawButton);
  // Container to hold the cards that are played
  divDealtCardBoardElement = createDealtCardsElement(boardOfDealtCards);
  divGamePlayContainer.appendChild(divDealtCardBoardElement);
  divGamePlayContainer.appendChild(divGameStatus);
  divGameContainer.appendChild(divGamePlayContainer);

  createPayTableContainer(divGameContainer);
};

// Function to create all the elements for displaying the Score Card
const createResultContainerElements = () => {
  // Main container to hold the result of the game
  const divGameResultContainer = document.createElement('div');
  divGameResultContainer.classList.add('result');

  // Button to show and hide the result details
  const divScoreButtonContainer = document.createElement('div');
  buttonShowHideScore = document.createElement('button');
  buttonShowHideScore.innerText = `${TXT_SHOW_RESULT}`;
  divScoreButtonContainer.appendChild(buttonShowHideScore);
  divGameResultContainer.appendChild(divScoreButtonContainer);

  // Container to hold the result
  const divScoreContainer = document.createElement('div');
  divScoreContainer.classList.add('score-card-container');
  // In the intial Stage this container will not be displayed.
  divScoreContainer.style.display = 'none';
  divGameResultContainer.appendChild(divScoreContainer);

  // Associate the button to the container display function
  buttonShowHideScore.addEventListener('click', () => {
    toggleElementDisplay(divScoreContainer);
  });

  // Table that shows the whole result of the game
  tableScoreCard = document.createElement('table');
  tableScoreCard.classList.add('result-table');
  tableScoreCard.createCaption('Score Card');
  // Define the column headers for rows
  const rowElement = document.createElement('tr');
  tableScoreCard.appendChild(rowElement);

  const rowHeaderGameCount = document.createElement('th');
  rowHeaderGameCount.innerText = 'Game Counter';
  rowElement.appendChild(rowHeaderGameCount);

  const rowHeaderGameResult = document.createElement('th');
  rowHeaderGameResult.innerText = 'Result';
  rowElement.appendChild(rowHeaderGameResult);

  const rowHeaderCurrentScore = document.createElement('th');
  rowHeaderCurrentScore.innerText = 'Current Score';
  rowElement.appendChild(rowHeaderCurrentScore);

  const rowHeaderFinalCardSet = document.createElement('th');
  rowHeaderFinalCardSet.innerText = 'Final Set of Cards Played';
  rowElement.appendChild(rowHeaderFinalCardSet);

  divScoreContainer.appendChild(tableScoreCard);
  document.body.appendChild(divGameResultContainer);
};

// Function that initializes the DOM element during the game load
const gameInit = () => {
  // Container that holds the playing area and Pay details for each game type
  // <div class="game">
  const divGameContainer = document.createElement('div');
  divGameContainer.classList.add('game');
  // Create all the elements for the game play sector
  createGameContainerElements(divGameContainer);
  document.body.appendChild(divGameContainer);

  // Create all elements to show the result
  createResultContainerElements();

  deck = makeDeck();
  deck = shuffleCards(deck);
};

gameInit();
