// The below es lint rule is disabled to remove the error got while adding
// variables defined in other js files into this file.
/* eslint-disable no-undef */

// The below es lint rule is disabled, because if continue is not used
// most of the for loops will have numerous nested conditions and loops
// which makes the code less readable.
/* eslint-disable no-continue */

// Global variables
// DOM Elements
// Table container to hold the result of the game.
let divScoreCardGrid = null;

// Button to show and hide the score card
let buttonShowHideScore = null;

// Button to Deal / Draw
let buttonDealDraw = null;

// Game Status element
let divGameStatus = null;

// Container that holds the dealt cards board
let divDealtCardBoardElement = null;

// Element to show the current credit in hand
let divCurrentCreditHand = null;

let inputBetAmountElement = null;

let deck = null;
let isGameOver = false;
let gameResultType = '';
let betAmount = 0;

// Variable that holds the credits with the player at a given time
// This is taken based on the bet amount placed and game type he won ( gameRank * 10)
let currentCreditsInHand = INITIAL_CREDIT_PLAYER;

// Holds the number of games the player lost
let numOfGamesLost = 0;

// Holds the number of games the player won
let numOfGamesWon = 0;

// Holds the overall credits he won.
// Calculated based on the Credits for each game type
// This different from the current credits in Hand
let totalCreditsWon = 0;

// This is the total amount of bet money player put
let totalCreditsPlayed = 0;

// This variable holds the net amount lost / win in the game
// let netWinLossCredits = 0;
// Credits tht will be added to player hand, if it's a win
const AddedCredits = 10;

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

  for (let suitIndex = 0; suitIndex < SuitsInfo.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = SuitsInfo[suitIndex][0];
    const currentSuitSymbol = SuitsInfo[suitIndex][1];
    const currentCardColor = SuitsInfo[suitIndex][2];
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
        displayName = ACE_DISPLAY_NAME;
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = JACK_DISPLAY_NAME;
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = QUEEN_DISPLAY_NAME;
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = KING_DISPLAY_NAME;
      }
      // Get the path of the image file
      const cardImageInfo = CardRankToImagePath.find((tempCardImageInfo) => (
        (rankCounter === tempCardImageInfo.cardRank)
        && (currentSuitSymbol === tempCardImageInfo.cardSymbol)));
      // make a single card object variable
      const card = {
        name: cardName,
        display: displayName,
        suit: currentSuit,
        suitSymbol: currentSuitSymbol,
        rank: rankCounter,
        color: currentCardColor,
        imagePath: cardImageInfo.cardImagePath,
        hold: false, // Indicates whether this card is on hold or not
      };

      /*
      console.log(`name: ${card.name},
      display: ${card.display},
      suit: ${card.suit},
      suitSymbol: ${card.suitSymbol},
      rank: ${card.rank},
      color: ${card.color},
      imagePath: ${card.imagePath},
      hold: ${card.hold}`); */

      // add the card to the deck
      newDeck.push(card);
    }
  }
  return newDeck;
};

// To check whether it's a pair of Jack or better
// Pair of jacks or better: Two jacks, queens, kings, or aces.
const isPairOfJacksOrBetter = () => {
  let hasPairFound = false;
  for (let i = 0; i < boardOfDealtCards.length - 1; i += 1)
  {
    const currentCard = boardOfDealtCards[i];
    // If the current cards display name is neither of A, J, K and Q, proceed with next card
    if (!((currentCard.display === JACK_DISPLAY_NAME)
    || (currentCard.display === KING_DISPLAY_NAME)
    || (currentCard.display === QUEEN_DISPLAY_NAME)
    || (currentCard.display === ACE_DISPLAY_NAME)))
    {
      // eslint-disable-next-line no-continue
      continue;
    }
    // Compare with each other elements in the array
    for (let j = i + 1; j < boardOfDealtCards.length; j += 1)
    {
      const nextCard = boardOfDealtCards[j];
      // If atleast one pair is found, no further checking is done.
      // It's confirmed as PairOfJacksOrBetter
      if (currentCard.display === nextCard.display)
      {
        hasPairFound = true;
        break;
      }
    }
    if (hasPairFound)
    {
      break;
    }
  }
  return hasPairFound;
};

// Is Two Pair - Two cards of one rank, two cards of another rank;
// for example, ace of spades, ace of hearts, 7 of clubs, 7 of diamonds.
const isTwoPair = () => {
  let numOfPairsFound = 0;
  const totalCardCount = boardOfDealtCards.length;
  // Variable to store the indices that are already a part of a pair
  const isPairFoundArray = [];
  for (let i = 0; i < totalCardCount; i += 1)
  {
    isPairFoundArray.push(false);
  }
  for (let i = 0; i < totalCardCount - 1; i += 1)
  {
    // If the this card is already a part of pair, skip to next
    if (isPairFoundArray[i])
    {
      continue;
    }
    const currentCard = boardOfDealtCards[i];
    // Compare with each other elements in the array
    for (let j = i + 1; j < totalCardCount; j += 1)
    {
      // If the this card is already a part of pair, skip to next
      if (isPairFoundArray[j])
      {
        continue;
      }
      const nextCard = boardOfDealtCards[j];
      if (currentCard.rank === nextCard.rank)
      {
        numOfPairsFound += 1;
        isPairFoundArray[i] = true;
        isPairFoundArray[j] = true;
      }
    }
  }

  console.log(`boardOfDealtCards: ${boardOfDealtCards}`);
  console.log(`numOfPairsFound: ${numOfPairsFound}`);
  console.log(`isPairFoundArray: ${isPairFoundArray}`);
  // If 2 pairs are found, return true;
  return (numOfPairsFound >= 2);
};

// Three of a kind - Three cards of the same rank;
// for example, 6 of hearts, 6 of clubs, 6 of diamonds.
const isThreeOfAKind = () => {
  const totalCardCount = boardOfDealtCards.length;
  // The below array stores the indexes.
  // When a three of kind match is found, all those values will
  // be turned true. Remaining elements will be the ones that are having indices
  // This is later used as part of FullHouse checking
  const indexThreeOfAKindFound = [];
  for (let i = 0; i < totalCardCount; i += 1)
  {
    indexThreeOfAKindFound.push(i);
  }
  for (let i = 0; i < totalCardCount - 2; i += 1)
  {
    for (let j = i + 1; j < totalCardCount - 1; j += 1)
    {
      // If the current card's rank is not same as the ith card, continue with next card
      if (boardOfDealtCards[i].rank !== boardOfDealtCards[j].rank)
      {
        continue;
      }
      for (let k = j + 1; k < totalCardCount; k += 1)
      {
        if (boardOfDealtCards[j].rank !== boardOfDealtCards[k].rank)
        {
          continue;
        }
        indexThreeOfAKindFound[i] = true;
        indexThreeOfAKindFound[j] = true;
        indexThreeOfAKindFound[k] = true;
        return { match: true, indices: indexThreeOfAKindFound };
      } // third loop end
    } // second loop end
  }
  return { match: false, indices: indexThreeOfAKindFound };
};

// 'Straight', 'Five consecutive cards of mixed suits;
// for example, 2 of diamonds, 3 of hearts, 4 of diamonds, 5 of clubs, 6 of spades.'
const isStraight = () => {
  let previousCardRank = 0;
  let isStraightCards = true;
  for (let i = 0; i < boardOfDealtCards.length; i += 1)
  {
    const currentCardRank = boardOfDealtCards[i].rank;
    if (i === 0)
    {
      // If the first card is Ace, take it's rank as 14 and compare
      previousCardRank = (boardOfDealtCards[i].display === ACE_DISPLAY_NAME)
        ? 14 : currentCardRank;
      continue;
    }
    if ((previousCardRank - currentCardRank) !== 1)
    {
      isStraightCards = false;
      break;
    }
  }
  return isStraightCards;
};

// 'Flush', 'Five cards of the same suit;
// for example, ace, 10, 7, 4, 3, all of diamonds.'
const isFlush = () => {
  let prevoiusCardSuit = '';
  for (let i = 0; i < boardOfDealtCards.length; i += 1)
  {
    const currentCardSuit = boardOfDealtCards[i].suit;
    if (i === 0)
    {
      prevoiusCardSuit = currentCardSuit;
      continue;
    }
    // If any card suit is different from others, return false
    if (!(prevoiusCardSuit === currentCardSuit))
    {
      return false;
    }
    prevoiusCardSuit = currentCardSuit;
  }
  return true;
};

// 'Full house', 'Three cards of one rank, two cards of another rank;
// for example, 3 of diamonds, 3 of hearts, 3 of spades, 6 of hearts, 6 of spades.'
const isFullHouse = () => {
  // First check whether there are 3 cards of same kind.
  const resThreeKind = isThreeOfAKind();
  if (!resThreeKind.match) {
    // If three of a kind match is not found return false.
    return false;
  }
  // Filter out all the values that are not having value as "true".
  // This will give the index of the remaining 2 (?) cards that are to be verified
  const remIndexArray = resThreeKind.indices.filter((index) => (index !== true));

  // If 3 same kind cards are found, check for the other pair
  let tempCard = null;
  for (let i = 0; i < remIndexArray.length; i += 1)
  {
    if (tempCard === null) {
      tempCard = boardOfDealtCards[remIndexArray[i]];
    }
    else { // compare both the card elements
      const nextCard = boardOfDealtCards[remIndexArray[i]];
      if (nextCard.rank === tempCard.rank) {
        // It's a pair.
        return true;
      }
    }
  }
  return false;
};

// 'Four of a kind', 'Four cards of the same rank;
// for example, ace of hearts, ace of spades, ace of clubs, ace of diamonds.'
const isFourOfAKind = () => {
  const totalCardCount = boardOfDealtCards.length;
  for (let i = 0; i < totalCardCount - 3; i += 1)
  {
    for (let j = i + 1; j < totalCardCount - 2; j += 1)
    {
      // If the current card's rank is not same as the ith card, continue with next card
      if (boardOfDealtCards[i].rank !== boardOfDealtCards[j].rank)
      {
        continue;
      }
      for (let k = j + 1; k < totalCardCount - 1; k += 1)
      {
        if (boardOfDealtCards[j].rank !== boardOfDealtCards[k].rank)
        {
          continue;
        }
        for (let m = k + 1; m < totalCardCount; m += 1)
        {
          if (boardOfDealtCards[k].rank !== boardOfDealtCards[m].rank)
          {
            continue;
          }
          return true;
        } // fourth loop
      } // third loop end
    } // second loop end
  }

  return false;
};

// 'Straight flush', 'Five consecutive cards of the same suit;
// for example, 2-3-4-5-6, all of clubs.'
const isStraightFlush = () => {
  let prevoiusCardSuit = '';
  let previousCardRank = 0;
  let prevRankDiff = 0;
  for (let i = 0; i < boardOfDealtCards.length; i += 1)
  {
    const currentCardSuit = boardOfDealtCards[i].suit;
    const currentCardRank = boardOfDealtCards[i].rank;
    if (i === 0)
    {
      prevoiusCardSuit = currentCardSuit;
      previousCardRank = currentCardRank;
      continue;
    }
    // If any card suit is different from others, return false
    if (!(prevoiusCardSuit === currentCardSuit))
    {
      return false;
    }
    const diffRank = previousCardRank - currentCardRank;
    if (Math.abs(diffRank) !== 1) {
      // If the rank difference is not equal to one, the cards are not
    // in consecutive order in either direction
      return false;
    }
    // To check if the cards are in consecutive order (either low to high or high to low)
    // subtract the 2 consecutive differences. It should be qual to zero.
    if ((prevRankDiff !== 0) && ((prevRankDiff - diffRank) !== 0))
    {
      return false;
    }

    prevRankDiff = diffRank;
    prevoiusCardSuit = currentCardSuit;
    previousCardRank = currentCardRank;
  }
  return true;
};

// 'Royal flush', 'Ace-king-queen-jack-10 all of the same suit
// (hearts, clubs, spades, or diamonds)'
const isRoyalFlush = () => {
  // First check whether all the cards are of the same suit
  if (!isFlush()) {
    return false;
  }
  if (boardOfDealtCards[0].display === ACE_DISPLAY_NAME
    && boardOfDealtCards[1].display === KING_DISPLAY_NAME
    && boardOfDealtCards[2].display === QUEEN_DISPLAY_NAME
    && boardOfDealtCards[3].display === JACK_DISPLAY_NAME
    && boardOfDealtCards[4].rank === 10) {
    return true;
  }
  return false;
};

// This function calculates the points user scored for the cards in hand.
const calcHandScore = () => {
  // Start from the highest rank
  let comparisonResult = false;
  let finalRank = 0;
  for (let index = GameTypeList.length - 1; index >= 0; index -= 1)
  {
    const currentGameRank = GameTypeList[index];
    const gameTypeInfo = PayTableObjects.find((tempGameInfo) => (tempGameInfo.gameRank
      === currentGameRank));
    console.log(gameTypeInfo.gameName);
    switch (currentGameRank)
    {
      case RoyalFlushRank: {
        comparisonResult = isRoyalFlush();
        break; }
      case StraightFlushRank: {
        comparisonResult = isStraightFlush();
        break; }
      case FourOfKindRank: {
        comparisonResult = isFourOfAKind();
        break; }
      case FullHouseRank: {
        comparisonResult = isFullHouse();
        break; }
      case FlushRank: {
        comparisonResult = isFlush();
        break; }
      case StraightRank: {
        comparisonResult = isStraight();
        break; }
      case ThreeOfKindRank: {
        const resThreeKind = isThreeOfAKind();
        comparisonResult = resThreeKind.match;
        break; }
      case TwoPairRank: {
        comparisonResult = isTwoPair();
        break; }
      case PairOfJacksBetterRank: {
        comparisonResult = isPairOfJacksOrBetter();
        break; }
      default: { break; }
    }
    // If atleast one comparison is success break the loop to check for other game types
    if (comparisonResult) {
      gameResultType = gameTypeInfo.gameName;
      // adding 1, so as not to take value as 0
      finalRank = (gameTypeInfo.gameRank + 1);
      totalCreditsWon += gameTypeInfo.gameCredit;
      break;
    }
  }

  // Calculating the total credits won
  totalCreditsPlayed += betAmount;
  console.log(totalCreditsPlayed);
  if (comparisonResult) {
    currentCreditsInHand += (finalRank * AddedCredits);
    numOfGamesWon += 1;
  }
  else
  {
    gameResultType = 'No Matches';
    numOfGamesLost += 1;
  }
};

// Function to set the game status
const setGameStatus = (message) => {
  divGameStatus.innerHTML = message;
};

const setCurrentCreditInfo = () => {
  divCurrentCreditHand.innerHTML = `Credits: ${currentCreditsInHand}`;
};

const toggleScoreDisplayButton = () => {
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
  cardElement.appendChild(divHoldStatusElement);

  const imageUnturnedCard = document.createElement('img');
  imageUnturnedCard.classList.add('image-card');
  imageUnturnedCard.src = 'Images\\card_back.jpg';
  imageUnturnedCard.alt = 'card image';
  cardElement.appendChild(imageUnturnedCard);
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

  // Display the corresponding image for the card
  const imageTurnedCard = document.createElement('img');
  imageTurnedCard.classList.add('image-card');
  imageTurnedCard.src = cardInfo.imagePath;
  imageTurnedCard.alt = 'card image';
  cardElement.appendChild(imageTurnedCard);

  // Card element is returned from this function
  return cardElement;
};

// Function that handles the Bet SUbmit button click
const onClickSubmitBet = () => {
  setGameStatus('');
  betAmount = inputBetAmountElement.valueAsNumber;
  // Have to check whether the input given by the user is a number or not
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(betAmount)) {
    betAmount = 0;
    setGameStatus('Please provide a valid number as bet amount');
  }
};

// Function to create a table cell that displays the cards that are finally drawn
const createCardCell = (cardDeck) => {
  const cellFinalCardSet = document.createElement('div');
  cellFinalCardSet.classList.add('result-cards');
  for (let i = 0; i < cardDeck.length; i += 1)
  {
    const divSingleCardElement = document.createElement('div');
    divSingleCardElement.classList.add('single-card', 'reduced-card');
    displayCardElement(divSingleCardElement, cardDeck[i], true);
    // Add the class 'reduced-image' to each card element div for name and suit
    divSingleCardElement.childNodes.forEach((childNode) => {
      childNode.classList.add('reduced-image');
    });
    cellFinalCardSet.appendChild(divSingleCardElement);
  }
  return cellFinalCardSet;
};

// Function to add the result of a game to the total score card table
const addScoreCard = (dealtCardBoard) => {
  const cellGameCount = document.createElement('div');
  cellGameCount.innerText = numOfGamesWon + numOfGamesLost;
  divScoreCardGrid.appendChild(cellGameCount);

  const cellGameResult = document.createElement('div');
  cellGameResult.innerText = gameResultType;
  divScoreCardGrid.appendChild(cellGameResult);

  const cellBetAmount = document.createElement('div');
  cellBetAmount.innerText = betAmount;
  divScoreCardGrid.appendChild(cellBetAmount);

  const cellCreditsPlayed = document.createElement('div');
  cellCreditsPlayed.innerText = totalCreditsPlayed;
  divScoreCardGrid.appendChild(cellCreditsPlayed);

  const cellTotalCreditsWon = document.createElement('div');
  cellTotalCreditsWon.innerText = totalCreditsWon;
  divScoreCardGrid.appendChild(cellTotalCreditsWon);

  const cellWinLoss = document.createElement('div');
  cellWinLoss.innerText = `${numOfGamesWon} - ${numOfGamesLost}`;
  divScoreCardGrid.appendChild(cellWinLoss);

  divScoreCardGrid.appendChild(createCardCell(dealtCardBoard));
};

// Function to handle result score card display
const displayScoreCard = () => {
  setGameStatus(`Game Over.<br>
  <b>${gameResultType}</b>. <br>
  Please check score card for more details.`);
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
  if (!drawAndReplaceCards) {
    currentCreditsInHand -= betAmount;
    setCurrentCreditInfo();
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
      // Check whether there are cards in the deck
      if (deck.length === 0)
      {
        isGameOver = true;
        setGameStatus('Not enough cards to deal. Please restart the game by refreshing the page.');
        break;
      }
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
    setCurrentCreditInfo();
    isGameOver = true;
    buttonDealDraw.innerText = TXT_DEAL;
    return;
  }
  buttonDealDraw.innerText = TXT_DRAW;
};

// Function to fill the pay-table data
const fillPayTableData = (divCreditListGrid) => {
  for (let i = 0; i < PayTableObjects.length; i += 1)
  {
    // Define the column headers for rows
    const cellGameType = document.createElement('div');
    cellGameType.classList.add('tooltip');
    cellGameType.innerText = PayTableObjects[i].gameName;
    const spanGameDesc = document.createElement('span');
    spanGameDesc.classList.add('tooltip-text');
    spanGameDesc.innerText = PayTableObjects[i].gameDesc;
    cellGameType.appendChild(spanGameDesc);
    divCreditListGrid.appendChild(cellGameType);

    const cellGamePoints = document.createElement('div');
    cellGamePoints.innerText = PayTableObjects[i].gameRank + 1;
    divCreditListGrid.appendChild(cellGamePoints);

    const cellGameCredit = document.createElement('div');
    cellGameCredit.innerText = PayTableObjects[i].gameCredit;
    divCreditListGrid.appendChild(cellGameCredit);
  }
};

// Function that displays the list of possible hands that gives a score
const createPayTableGrid = () => {
  // Pay Table container
  const divPayTableContainer = document.createElement('div');
  divPayTableContainer.classList.add('modal');
  divPayTableContainer.id = 'credit-list';
  document.body.appendChild(divPayTableContainer);

  // Container to hold the result
  const divContentContainer = document.createElement('div');
  divContentContainer.classList.add('modal-content');
  divPayTableContainer.appendChild(divContentContainer);

  // Span element to display the close button for the pop-up
  const spanCloseElement = document.createElement('span');
  spanCloseElement.classList.add('close');
  spanCloseElement.id = 'close-credit-list';
  spanCloseElement.innerHTML = '&times;';
  divContentContainer.appendChild(spanCloseElement);

  const divCreditListGrid = document.createElement('div');
  divCreditListGrid.classList.add('credit-grid-container');
  divContentContainer.appendChild(divCreditListGrid);

  // Define the column headers
  const rowHeaderGameType = document.createElement('div');
  rowHeaderGameType.classList.add('grid-col-header');
  rowHeaderGameType.innerText = 'Game Type';
  divCreditListGrid.appendChild(rowHeaderGameType);

  const rowHeaderGameRank = document.createElement('div');
  rowHeaderGameRank.classList.add('grid-col-header');
  rowHeaderGameRank.innerText = 'Rank';
  divCreditListGrid.appendChild(rowHeaderGameRank);

  const rowHeaderCredit = document.createElement('div');
  rowHeaderCredit.classList.add('grid-col-header');
  rowHeaderCredit.innerText = 'Credit';
  divCreditListGrid.appendChild(rowHeaderCredit);

  fillPayTableData(divCreditListGrid);
};

// Function that creates an element for submitting Bet amount
// Also it shows the credits with player at a given time
const createInputContainer = () => {
  const divGameInputContainer = document.createElement('div');
  divGameInputContainer.classList.add('inputs');

  inputBetAmountElement = document.createElement('input');
  inputBetAmountElement.classList.add('bet-amount');
  inputBetAmountElement.setAttribute('type', 'Number');
  inputBetAmountElement.placeholder = 'Enter bet Amount';
  divGameInputContainer.appendChild(inputBetAmountElement);

  const buttonSubmitBet = document.createElement('button');
  buttonSubmitBet.classList.add('button-common');
  buttonSubmitBet.innerText = 'Submit Bet Amount';
  buttonSubmitBet.addEventListener('click', onClickSubmitBet);
  divGameInputContainer.appendChild(buttonSubmitBet);
  return divGameInputContainer;
};

// Set of functions that creates all the elements for game play div
const createGameContainerElements = (divGameContainer) => {
  // Game playing container
  // <div class="game-play">
  const divGamePlayContainer = document.createElement('div');
  divGamePlayContainer.classList.add('game-play');

  // For adding the Bet submit elements
  const divGameInputContainer = createInputContainer();
  divGamePlayContainer.appendChild(divGameInputContainer);

  // For displaying the current player credits
  divCurrentCreditHand = document.createElement('div');
  divCurrentCreditHand.classList.add('status');
  setCurrentCreditInfo();
  divGamePlayContainer.appendChild(divCurrentCreditHand);

  // Button to Deal/Draw cards
  // The initial text on the button will be "Deal".
  // Once a deal is made and player has clicked any of the cards,
  // the text on the button should change to "Draw/Deal"
  const divDealDrawScoreButton = document.createElement('div');
  divDealDrawScoreButton.classList.add('buttons');

  // Button for Deal / draw
  buttonDealDraw = document.createElement('button');
  buttonDealDraw.classList.add('button-common', 'stand-alone-button');
  buttonDealDraw.innerText = TXT_DEAL;
  buttonDealDraw.addEventListener('click', onClickDealDrawButton);
  divDealDrawScoreButton.appendChild(buttonDealDraw);

  // Button for Show/Hide the score card
  buttonShowHideScore = document.createElement('button');
  buttonShowHideScore.classList.add('button-common', 'stand-alone-button');
  buttonShowHideScore.id = 'result-card';
  buttonShowHideScore.innerText = `${TXT_SHOW_RESULT}`;
  // Associate the button to the container display function
  buttonShowHideScore.addEventListener('click', () => { toggleScoreDisplayButton(); });
  divDealDrawScoreButton.appendChild(buttonShowHideScore);

  divGamePlayContainer.appendChild(divDealDrawScoreButton);

  // Initialize the board of cards to be displayed
  for (let i = 0; i < NUM_OF_CARDS_DRAWN; i += 1)
  {
    boardOfDealtCards.push(null);
  }
  // Container to hold the cards that are played
  divDealtCardBoardElement = createDealtCardsElement(boardOfDealtCards);
  divGamePlayContainer.appendChild(divDealtCardBoardElement);

  // Status element
  divGameStatus = document.createElement('div');
  divGameStatus.classList.add('status');
  divGamePlayContainer.appendChild(divGameStatus);

  divGameContainer.appendChild(divGamePlayContainer);
};

// Function to define column headers for the Score Grid
const createScoreCardGrid = () => {
  // Table that shows the whole result of the game
  divScoreCardGrid = document.createElement('div');
  divScoreCardGrid.classList.add('grid-container');

  // Define the column headers
  const rowHeaderGameCount = document.createElement('div');
  rowHeaderGameCount.classList.add('grid-col-header');
  rowHeaderGameCount.innerText = 'Game Counter';
  divScoreCardGrid.appendChild(rowHeaderGameCount);

  const rowHeaderGameResult = document.createElement('div');
  rowHeaderGameResult.classList.add('grid-col-header');
  rowHeaderGameResult.innerText = 'Result';
  divScoreCardGrid.appendChild(rowHeaderGameResult);

  const rowHeaderBetAmount = document.createElement('div');
  rowHeaderBetAmount.classList.add('grid-col-header');
  rowHeaderBetAmount.innerText = 'Bet Amount';
  divScoreCardGrid.appendChild(rowHeaderBetAmount);

  const rowHeaderCreditsPlayed = document.createElement('div');
  rowHeaderCreditsPlayed.classList.add('grid-col-header');
  rowHeaderCreditsPlayed.innerText = 'Total Credits Played';
  divScoreCardGrid.appendChild(rowHeaderCreditsPlayed);

  const rowHeaderTotalCreditsWon = document.createElement('div');
  rowHeaderTotalCreditsWon.classList.add('grid-col-header');
  rowHeaderTotalCreditsWon.innerText = 'Total Credits Won';
  divScoreCardGrid.appendChild(rowHeaderTotalCreditsWon);

  const rowHeaderWinLoss = document.createElement('div');
  rowHeaderWinLoss.classList.add('grid-col-header');
  rowHeaderWinLoss.innerText = 'Win-Loss Count';
  divScoreCardGrid.appendChild(rowHeaderWinLoss);

  const rowHeaderFinalCardSet = document.createElement('div');
  rowHeaderFinalCardSet.classList.add('grid-col-header');
  rowHeaderFinalCardSet.innerText = 'Final Set of Cards Played';
  divScoreCardGrid.appendChild(rowHeaderFinalCardSet);
};

// Function to create all the elements for displaying the Score Card
const createResultContainerElements = () => {
  // Main container to hold the result of the game
  const divGameResultContainer = document.createElement('div');
  divGameResultContainer.classList.add('modal');
  divGameResultContainer.id = 'result';

  // Container to hold the result
  const divScoreContainer = document.createElement('div');
  divScoreContainer.classList.add('score-card-container', 'modal-content');
  divGameResultContainer.appendChild(divScoreContainer);

  // Span element to display the close button for the pop-up
  const spanCloseElement = document.createElement('span');
  spanCloseElement.classList.add('close');
  spanCloseElement.id = 'close-score-card';
  spanCloseElement.innerHTML = '&times;';
  divScoreContainer.appendChild(spanCloseElement);

  // Table that shows the whole result of the game
  createScoreCardGrid();
  divScoreContainer.appendChild(divScoreCardGrid);
  document.body.appendChild(divGameResultContainer);
};

const createHowToPlayModal = () => {
  const divHowToPlayModal = document.createElement('div');
  divHowToPlayModal.classList.add('modal');
  divHowToPlayModal.id = 'how-to-play-modal';
  document.body.appendChild(divHowToPlayModal);

  // Container to hold the result
  const divModalContent = document.createElement('div');
  divModalContent.classList.add('modal-content');
  divHowToPlayModal.appendChild(divModalContent);

  // Span element to display the close button for the pop-up
  const spanCloseElement = document.createElement('span');
  spanCloseElement.classList.add('close');
  spanCloseElement.id = 'close-how-to-play';
  spanCloseElement.innerHTML = '&times;';
  divModalContent.appendChild(spanCloseElement);

  const parContent = document.createElement('p');
  divModalContent.appendChild(parContent);
  const orderedList = document.createElement('ol');
  parContent.appendChild(orderedList);
  // const listItem = document.createElement('li');
  // orderedList.appendChild(listItem);
  orderedList.innerHTML = `<li>Enter the bet amount and press "Submit Bet Amount"</li>
  <li>Press the Deal Button for starting the game</li>
  <li>Initially drawn cards will be shown</li>
  <li>Press on those cards which you wish to hold on</li>
  <li>If you wish to release a held card, press on the card again</li>
  <li>Press the "Draw" button for swapping the cards that are not held</li>
  <li>Result will be displayed in the screen</li>
  <li>Press "Show Score Card" button to view the history of the game</li>`;
};

const handleModalBoxDisplay = () => {
  // Get the modal
  const modalHowToPlay = document.getElementById('how-to-play-modal');
  const linkHowToPlay = document.getElementById('how-to-play');
  linkHowToPlay.addEventListener('click', () => { modalHowToPlay.style.display = 'block'; });
  const closeHowToPlay = document.getElementById('close-how-to-play');
  closeHowToPlay.addEventListener('click', () => { modalHowToPlay.style.display = 'none'; });

  const creditModal = document.getElementById('credit-list');
  const creditLink = document.getElementById('pay-table');
  creditLink.addEventListener('click', () => { creditModal.style.display = 'block'; });
  const closeCreditList = document.getElementById('close-credit-list');
  closeCreditList.addEventListener('click', () => { creditModal.style.display = 'none'; });

  const resultModal = document.getElementById('result');
  const scoreCardButton = document.getElementById('result-card');
  scoreCardButton.addEventListener('click', () => { resultModal.style.display = 'block'; });
  const scoreCardClose = document.getElementById('close-score-card');
  scoreCardClose.addEventListener('click', () => {
    resultModal.style.display = 'none';
    toggleScoreDisplayButton();
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', (event) => {
    if (event.target === modalHowToPlay) {
      modalHowToPlay.style.display = 'none';
    }
    else if (event.target === resultModal) {
      resultModal.style.display = 'none';
    }
    else if (event.target === creditModal) {
      creditModal.style.display = 'none';
    }
  });
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

  // Make and shuffle the card deck
  deck = makeDeck();
  deck = shuffleCards(deck);

  // Create all elements to show the result
  createResultContainerElements();
  // Create the list to show the credits for each game type
  createPayTableGrid();
  // Displays instructions for the user
  createHowToPlayModal();
  // Function to display the pop-up boxes
  handleModalBoxDisplay();
};

gameInit();
