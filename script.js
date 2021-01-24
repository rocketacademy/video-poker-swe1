// Video Poker V2

/**
 * Outputs a random integer.
 * @param {number} deckArr - Array of playing cards.
*/
const generateRandomIndex = (numCards) => {
  const randomInt = Math.floor(Math.random() * numCards);
  return randomInt;
};

/**
 * Outputs array of card objects.
*/
const makeDeck = () => {
  const deck = [];
  const suits = ['♦️', '♣️', '❤️', '♠️'];

  // For each card suit.
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const suitName = suits[suitIndex];
    // For each card value.
    for (let cardIndex = 1; cardIndex <= 13; cardIndex += 1) {
      let cardName = cardIndex;
      let rankCounter = cardIndex;

      // For non-number cards, adjust the naming.
      if (cardIndex === 1) {
        cardName = 'A';
        rankCounter = 14;
      } else if (cardIndex === 11) {
        cardName = 'J';
        rankCounter = 11;
      } else if (cardIndex === 12) {
        cardName = 'Q';
        rankCounter = 12;
      } else if (cardIndex === 13) {
        cardName = 'K';
        rankCounter = 13;
      }

      // Card object stores name & suit.
      const card = {
        name: String(cardName),
        suit: suitName,
        value: rankCounter,
      };
      deck.push(card);
    }
  }
  return deck;
};

/**
 * Randomises order of deck. Outputs shuffled deck.
 * @param {Array<string>} deckArr - Array of playing cards.
*/
const shuffleDeck = (deckArr) => {
  for (let i = 0; i < deckArr.length; i += 1) {
    const currentIndex = i;
    const randomIndex = generateRandomIndex(deckArr.length);

    const currentCard = deckArr[currentIndex];
    const randomCard = deckArr[randomIndex];

    deckArr[currentIndex] = randomCard;
    deckArr[randomIndex] = currentCard;
  }
  return deckArr;
};

// Global Variables
const deck = shuffleDeck(makeDeck());
let startCredits = 100;
// const playerCredits = window.sessionStorage.getItem('credits');
let roundEnd = false;
const playerHand = [];
// const playerHandTest = [
//   { name: 'J', suit: '♣️', value: 11 },
//   { name: 'K', suit: '♣️', value: 13 },
//   { name: 'A', suit: '♣️', value: 14 },
//   { name: 'Q', suit: '♣️', value: 12 },
//   { name: '10', suit: '❤️', value: 10 },
// ];

// Audio
const clickAudio = new Audio('sounds/click-sound.mp3');
const coinsAudio = new Audio('sounds/coins.mp3');
const flipAudio = new Audio('sounds/card-flip.mp3');
flipAudio.playbackRate = 4;

/**
 * Checks if an array of card suits are all similar.
 * @param {Array<string>} suitArr - Array of playing card suits.
*/
const suitsMatch = (suitArr) => {
  let trueCounter = 0;
  for (let i = 0; i < suitArr.length; i += 1) {
    const toCompare = suitArr[0];
    if (toCompare === suitArr[i]) {
      trueCounter += 1;
    }
  }
  if (trueCounter === suitArr.length) {
    return true;
  }
  return false;
};

/**
 * Checks if an array of card values is in running order.
 * @param {Array<string>} valueArr - Array of playing card values.
*/
const inRunningOrder = (valueArr) => {
  let trueCounter = 0;
  let sortedArr = valueArr.sort((a, b) => a - b);

  // Address scenario if Ace is lowest in hand.
  for (let n = 0; n < sortedArr.length; n += 1) {
    if (sortedArr[n] === 14 && sortedArr.includes(2)) {
      sortedArr[n] = 1;
      // Re-sort array after Ace has been converted.
      sortedArr = sortedArr.sort((a, b) => a - b);
    }
  }
  // Check array again to see if there is runningOrder.
  for (let n = 0; n < sortedArr.length; n += 1) {
    if (sortedArr[n + 1] - sortedArr[n] === 1) {
      trueCounter += 1;
    }
  }
  // True, if total of 4x truthy vals.
  if (trueCounter === sortedArr.length - 1) {
    return true;
  }
  return false;
};

/**
 * Determines if player's hand has a winning combination or not.
 * @param {Array<Object>} hand - Array of card objects
 */
const calcHandScore = (hand) => {
  const cardCounter = {};
  const suitsArr = [];
  const valArr = [];
  let matchedCardsTotal = 0;

  for (let i = 0; i < hand.length; i += 1) {
    const cardObj = hand[i];
    const cardName = cardObj.name;
    const cardVal = cardObj.value;
    const cardSuit = cardObj.suit;

    suitsArr.push(cardSuit);
    valArr.push(cardVal);

    // If cardName exists, increase, otherwise set to 1.
    if (cardCounter[cardName]) {
      cardCounter[cardName] += 1;
      matchedCardsTotal = cardVal * cardCounter[cardName];
    } else {
      cardCounter[cardName] = 1;
    }
  }

  let matchingType = ' ';
  const cardCounterKeys = Object.keys(cardCounter);

  // Run through cardCounter & extract cards that appear twice.
  cardCounterKeys.forEach((key) => {
    if (cardCounter[key] === 2 && matchedCardsTotal >= 22 && cardCounterKeys.length === 4) {
      matchingType = 'JACKS OR BETTER';
    } else if (cardCounter[key] === 2 && cardCounterKeys.length === 3) {
      matchingType = 'TWO PAIR';
    } else if (cardCounter[key] === 3 && cardCounterKeys.length === 3) {
      matchingType = 'THREE OF A KIND';
    } else if (cardCounter[key] === 3 && cardCounterKeys.length === 2) {
      matchingType = 'FULL HOUSE';
    } else if (cardCounter[key] === 4) {
      matchingType = 'FOUR OF A KIND';
    } else if (inRunningOrder(valArr) && !suitsMatch(suitsArr)) {
      matchingType = 'STRAIGHT';
    } else if (suitsMatch(suitsArr)) {
      matchingType = 'FLUSH';
    } else if (inRunningOrder(valArr) && suitsMatch(suitsArr)) {
      matchingType = 'STRAIGHT FLUSH';
    } else if (inRunningOrder(valArr) && suitsMatch(suitsArr) && matchedCardsTotal === 60 && valArr.includes('♠️')) {
      matchingType = 'ROYAL FLUSH';
    }
  });
  return matchingType;
};

/**
 * Calculates & updates player credits according to win.
 * @param {string>} matchingType - Winning card combination.
 */
const updatePlayerCredit = (matchingType) => {
  if (matchingType === 'JACKS OR BETTER') {
    startCredits += 5;
  } else if (matchingType === 'TWO PAIR') {
    startCredits += 10;
  } else if (matchingType === 'THREE OF A KIND') {
    startCredits += 15;
  } else if (matchingType === 'FULL HOUSE') {
    startCredits += 45;
  } else if (matchingType === 'FOUR OF A KIND') {
    startCredits += 45;
  } else if (matchingType === 'FULL HOUSE') {
    startCredits += 125;
  } else if (matchingType === 'STRAIGHT') {
    startCredits += 20;
  } else if (matchingType === 'FLUSH') {
    startCredits += 30;
  } else if (matchingType === 'STRAIGHT FLUSH') {
    startCredits += 250;
  } else if (matchingType === 'ROYAL FLUSH') {
    startCredits += 4000;
  }
  window.sessionStorage.setItem('credits', startCredits);
};

/**  Creates HTML element, assigns class & fills inner text.
 *  @param {document} element - HTML element tag type.
 *  @param {string} text - Fill inner text.
 *  @param {string} className - Assign CSS class name.
 */
const customCreate = (tagType, text, className) => {
  const element = document.createElement(tagType);
  element.innerHTML = text;
  element.classList.add(className);
  return element;
};

/**
 *  Toggles CSS class.
 *  @param {document} element - HTML element representing playing card.
 *  @param {string} className - Class name to be toggled to.
 */
const toggleCardClass = (element, className) => {
  element.classList.toggle(className);
};

/**
 *  Creates a <div> tag representing individual card & renders to the DOM.
 *  @param {Array<object>} deckArr - Contains shuffled array of card objects.
 */
const createCardElement = (deckArr) => {
  const cardElement = customCreate('div', '', 'card');
  const cardNameElement = customCreate('div', '', 'card-name');
  const cardSuitElement = customCreate('div', '', 'card-suit');

  // Take top card from global deckArr variable.
  const topCard = deckArr.pop();

  cardNameElement.innerHTML = `${topCard.name}`;
  cardSuitElement.innerHTML = `${topCard.suit}`;

  cardElement.appendChild(cardNameElement);
  cardElement.appendChild(cardSuitElement);

  // Store the components in an object.
  const cardElementObj = {
    jsObj: topCard,
    cardContainer: cardElement,
  };
  return cardElementObj;
};

/** Initialise Game */
const initGame = () => {
  // Create a local storage for player credits.
  if (window.sessionStorage.length === 0) {
    window.sessionStorage.setItem('credits', startCredits);
  } else {
    startCredits -= 5;
  }

  const playerCredits = window.sessionStorage.getItem('credits');

  // Create HTML Elements
  const title = customCreate('span', 'VIDEO POKER', 'title');
  const screenDiv = customCreate('div', '', 'main');
  const messageDiv = customCreate('div', 'HIT DEAL TO START', 'message');
  const cardsDiv = customCreate('div', '', 'cards-container');
  const creditsDiv = customCreate('div', 'CREDITS : ', 'credits');
  const creditUpdateDiv = customCreate('div', playerCredits, 'credits-update');
  const drawBtn = customCreate('button', 'DRAW', 'draw-btn');
  const dealBtn = customCreate('button', 'DEAL', 'deal-btn');
  const gameOverDiv = customCreate('div', 'GAME OVER', 'game-over');

  /** Create hand & attach an event listener to hold the cards */
  const createHandElements = (deckArr, numCards) => {
    for (let currentIndex = 0; currentIndex < numCards; currentIndex += 1) {
      // Call both card object & card HTML element.
      const cardElementObj = createCardElement(deckArr);

      // Attach return values of createCardElement() accordingly.
      const cardElement = cardElementObj.cardContainer;
      const topCard = cardElementObj.jsObj;
      const topCardName = String(topCard.name);
      const topCardSuit = topCard.suit;

      // eslint-disable-next-line no-loop-func
      cardElement.addEventListener('click', (e) => {
        clickAudio.play();

        // Add new CSS class to show selected (yellow border).
        toggleCardClass(e.currentTarget, 'clicked-card');

        // Push to playerHand if clicked
        const heldCard = document.getElementsByClassName('card')[currentIndex];
        const heldCardName = heldCard.children[0].innerHTML;
        const heldCardSuit = heldCard.children[1].innerHTML;

        // Only push cards that have been intended by user to be held.
        if (topCardName === heldCardName && topCardSuit === heldCardSuit) {
          // Only push to playerHand if it doesn't currently exist
          if (!playerHand.some((existingCard) => existingCard === topCard)) {
            playerHand.push(topCard);
          }
        }
        // Ensure deselected cards are removed from playerHand.
        const topCardIndex = playerHand.indexOf(topCard);
        if (heldCard.classList.value === 'card') {
          playerHand.splice(topCardIndex, 1);
        }
      });
      // Render to DOM.
      cardsDiv.appendChild(cardElement);
    }
    return cardsDiv;
  };

  // Render 5x cards to the DOM.
  createHandElements(deck, 5); // 5 represents a standard poker hand.

  // Add event listeners to Deal & Draw buttons.
  dealBtn.addEventListener('click', () => {
    // Upon dealing the cards, replace dealBtn with drawBtn.
    setTimeout(() => {
      if (roundEnd === true) {
        window.location.reload();
      }

      // Hide "Hit Deal to Start" message.
      messageDiv.style.visibility = 'hidden';
      creditUpdateDiv.innerText = playerCredits;

      // Turn over cards face-up.
      const cardArr = document.getElementsByClassName('card');
      const cardNameArr = document.getElementsByClassName('card-name');
      const cardSuitArr = document.getElementsByClassName('card-suit');

      let i = 0;
      const turnOverCards = setInterval(() => {
        cardArr[i].style.backgroundImage = 'none';
        cardNameArr[i].style.visibility = 'visible';
        cardSuitArr[i].style.visibility = 'visible';
        flipAudio.play();

        i += 1;
        if (i === cardArr.length) {
          clearInterval(turnOverCards);
        }
      }, 250);

      dealBtn.style.visibility = 'hidden';
    }, 200);
  });

  drawBtn.addEventListener('click', () => {
    // Remove cards that are not held.
    const firstHandElementsArr = document.getElementsByClassName('card');
    for (let i = 0; i < firstHandElementsArr.length; i += 1) {
      const newCard = createCardElement(deck);
      newCard.cardContainer.children[0].style.visibility = 'visible';
      newCard.cardContainer.children[1].style.visibility = 'visible';

      const currentCardElement = firstHandElementsArr[i];

      // Replace playerHand card objects with NEW card elements drawn from top of deck
      if (!currentCardElement.classList.contains('clicked-card')) {
        currentCardElement.innerHTML = newCard.cardContainer.innerHTML;
        playerHand.push(newCard.jsObj);
      }
      flipAudio.play();
    }

    // const winningMsg = calcHandScore(playerHandTest); // Used for testing custom hand.
    const winningMsg = calcHandScore(playerHand);
    updatePlayerCredit(winningMsg);

    // Determine player hand condition.
    messageDiv.innerHTML = winningMsg;
    messageDiv.style.visibility = 'visible';

    // Play coin sound only if not empty.
    if (winningMsg !== ' ') {
      coinsAudio.play();
    }

    // Blinking behaviour for win message.
    let blinkTimes = 9;
    const ref = setInterval(() => {
      messageDiv.classList.toggle('message-blink');
      blinkTimes -= 1;

      if (blinkTimes === 0) {
        clearInterval(ref);
      }
    }, 200);

    // Update game state, credits & messages accordingly
    roundEnd = true;
    creditUpdateDiv.innerHTML = playerCredits;
    gameOverDiv.style.visibility = 'visible';
    dealBtn.style.visibility = 'visible';
  });

  // Render to DOM
  cardsDiv.appendChild(gameOverDiv);
  screenDiv.appendChild(title);
  creditsDiv.appendChild(creditUpdateDiv);
  screenDiv.appendChild(creditsDiv);
  screenDiv.appendChild(messageDiv);
  screenDiv.appendChild(cardsDiv);
  screenDiv.appendChild(dealBtn);
  screenDiv.appendChild(drawBtn);
  document.body.appendChild(screenDiv);
};

/** Initalises game */
initGame();
