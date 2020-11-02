//= =========GLOBAL VARIABLES============

const player = {
  setHandSize: 5,
  hand: [],
  tempHand: [],
  handScore: 0,
  credits: 100,
  fauxHand: [],
};
let deck = [];
let keepCardCanClick = true;
let bidTracker = 0;
let playerHasRedrawnCards = false;

//= =========HELPER FUNCTIONS===================
// get a random index from an array given it's size
const getRandomIndex = (size) => Math.floor(Math.random() * size);

// ----------SHUFFLE CARDS-------------------
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

// -------------MAKE A DECK------------------------------
// Make a deck
const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    // console.log(`current suit: ${currentSuit}`);

    let color = '';
    let suitSymbol = suitIndex;
    if (suitSymbol === 0) {
      suitSymbol = '♥';
      color = 'red';
    } else if (suitSymbol === 1) {
      suitSymbol = '♦';

      color = 'red';
    } else if (suitSymbol === 2) {
      suitSymbol = '♣';
      color = 'black';
    } else if (suitSymbol === 3) {
      suitSymbol = '♠';
      color = 'black';
    }

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      let display = '';
      display = rankCounter;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
        display = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        display = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        display = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        display = 'K';
      }

      // make a single card object variable
      const card = {
        display,
        suitSymbol,
        name: cardName,
        color,
        suit: currentSuit,
        rank: rankCounter,
      };

      // console.log(`rank: ${rankCounter}`);

      // add the card to the deck
      newDeck.push(card);
    }
  }

  return newDeck;
};

// ------------BUILD THE BOARD'S ELEMENTS----------------
const buildBoardElements = () => {
  // clear the card containers
  document.getElementById('arsenalID0').innerHTML = '';
  document.getElementById('arsenalID1').innerHTML = '';
  document.getElementById('arsenalID2').innerHTML = '';
  document.getElementById('arsenalID3').innerHTML = '';
  document.getElementById('arsenalID4').innerHTML = '';

  // display the back of cards in the cardconainters
  for (let i = 0; i < 5; i += 1) {
    // create an image element
    const backOfCard = document.createElement('img');
    backOfCard.classList.add('backOfPlayingCard');
    backOfCard.src = 'https://playcards.live/cards/back.jpg';

    // add the image to each cardContainer
    document.getElementById('arsenalID' + i).appendChild(backOfCard);
  }

  // display the player's credits via the credits display box
  document.getElementById('creditsDisplayElementID').innerText = `CREDITS: ${player.credits}`;
};

// -----------SHOW PLAYER'S CREDITS-----------
// this is a function that simplifies the code needed to update player his on credits
const showCredits = (message) => {
  document.getElementById('creditsDisplayElementID').innerHTML = `CREDITS: ${message}`;
};

// -------INITIALISE USER'S HAND----------
const intialiseHand = () => {
  // ensure the player's hand is empty
  player.hand = [];

  // Make a deck and shuffle it
  deck = shuffleCards(makeDeck());
  // push 5 cards to the hand
  for (let i = 0; i < player.setHandSize; i += 1) {
    player.hand.push(deck.pop());
  }
};

// ----------CREATE THE CARDS' ELEMENTS------------
const createCardsElements = () => {
  console.log('emptying cardContainer...');
  // empty out the containers (currently contains images of the back of cards)
  document.getElementById('arsenalID0').innerHTML = '';
  document.getElementById('arsenalID1').innerHTML = '';
  document.getElementById('arsenalID2').innerHTML = '';
  document.getElementById('arsenalID3').innerHTML = '';
  document.getElementById('arsenalID4').innerHTML = '';

  // Create elements that display the player's hand
  for (let i = 0; i < player.hand.length; i += 1) {
    console.log(player.hand[i]);
    // create a card element, and append it to the arsenal
    const cardElement = document.createElement('div');
    cardElement.classList.add('cardElement');
    cardElement.classList.add('btn-outline-dark');

    document.getElementById('arsenalID' + i).append(cardElement);
    // assign current cardElement the details for card[i]
    cardElement.innerHTML = player.hand[i].display + player.hand[i].suitSymbol;

    // make each card element clickable
    keepCardCanClick = true;
    cardElement.addEventListener('click', (event) => {
      if (keepCardCanClick === true) {
        keepCard(event.currentTarget, i);
        // event.currentTarget.appendChild(keepCardIndication);
      }
    });
  }
};

// ---------IDENTIFY WHICH CARDS TO KEEP-------
// concept: store the identified cards in a new array, then update player.hand w/ that new array
const keepCard = (cardElement, position) => {
  console.log('keepCard is running...');
  const clickedCard = player.hand[position];
  // on each card, create an element that will appear to show user that he has decided to keepCard
  const keepCardIndication = document.createElement('div');
  keepCardIndication.classList.add('keepCardIndication');
  keepCardIndication.innerText = 'Keep';

  // if the clicked card is alr in the array, remove it from the array:
  // go through the temphand array
  for (let j = 0; j < player.tempHand.length; j += 1) {
    // if the card at temphand[j] matches the clicked card, remove temphand[j] from tempHand array
    if ((clickedCard.display === player.tempHand[j].display) && (clickedCard.suit === player.tempHand[j].suit)) {
      player.tempHand.splice(j, 1);

      const keepDiv = cardElement.querySelector('div');
      cardElement.removeChild(keepDiv);
      return;
    }
  }
  // else if the clicked card is not at temphand[j], add it to tempHand
  player.tempHand.push(clickedCard);
  cardElement.appendChild(keepCardIndication);
};

// ----------DETERMINE THE BIDDING STAKES------------------
const getStakes = () => {
  const stakesArray = [{}, {}, {}, {}, {}];
  // make first object in array
  stakesArray[1] = {
    straightFlush: 50,
    fourOfAKind: 25,
    fullHouse: 9,
    flush: 6,
    straight: 4,
    threeOfAKind: 3,
    twoPair: 2,
    jacksOrLarger: 1,
    lose: -1,
  };
  stakesArray[2] = {
    straightFlush: 100,
    fourOfAKind: 50,
    fullHouse: 18,
    flush: 12,
    straight: 8,
    threeOfAKind: 6,
    twoPair: 4,
    jacksOrLarger: 2,
    lose: -2,
  };
  stakesArray[3] = {
    straightFlush: 150,
    fourOfAKind: 75,
    fullHouse: 27,
    flush: 18,
    straight: 12,
    threeOfAKind: 9,
    twoPair: 6,
    jacksOrLarger: 3,
    lose: -3,
  };
  stakesArray[4] = {
    straightFlush: 200,
    fourOfAKind: 100,
    fullHouse: 36,
    flush: 24,
    straight: 16,
    threeOfAKind: 12,
    twoPair: 8,
    jacksOrLarger: 4,
    lose: -4,
  };

  return stakesArray[bidTracker];
};
// -------------TOGGLE BID STAKES--------
const toggleBidStakesDisplay = () => {
// if the bid is 0, add the red box
  if (bidTracker === 0) {
    bidTracker += 1;
    // display the red box
    document.getElementById('');
    document.getElementById('bidstakes' + bidTracker).classList.add('currentBidStakes');
  }
  else if (bidTracker > 0 && bidTracker < 5) {
    // remove the red box from the bid display
    document.getElementById('bidstakes' + bidTracker).classList.remove('currentBidStakes');
    // increment the bid tracker
    bidTracker += 1;
    // add the red box to the display
    document.getElementById('bidstakes' + bidTracker).classList.add('currentBidStakes');
  }
  if (bidTracker === 4) {
    document.getElementById('bidButton').disabled = true;
  }
};

// ---------CLICK RESET-----------
const clickReset = () => {
  // reset the bidStakes Display
  document.getElementById('bidstakes' + bidTracker).removeAttribute('class', 'currentBidStakes');

  // reset bidTracker to 0
  bidTracker = 0;
  // display new bidtracker value
  document.getElementById('bidDisplayID').innerText = bidTracker;

  // reset bidding button to ensure it is click-able
  document.getElementById('bidButton').disabled = false;

  // emptythe outputbox
  document.getElementById('outputBox').innerHTML = '';

  // prevent user from reseting again
  document.getElementById('resetButtonID').disabled = true;

  // disable the deal/draw button
  document.getElementById('dealOrDrawButtonID').disabled = true;

  // remove event listeners: bidButton
  document.getElementById('bidButton').removeEventListener('click', bidButtonEventListener);

  // remove event listeners: dealOrDrawButton
  document.getElementById('dealOrDrawButtonID').removeEventListener('click', dealOrDrawEventListener);

  // remove event listeners: startButton
  document.getElementById('startButtonID').removeEventListener('click', startButtonEventListener);

  // initialise the game
  setupGame();
};
// ------------BID BUTTON EVENT LISTENER------------------
const bidButtonEventListener = () => {
// toggle the bidstakes
  toggleBidStakesDisplay();

  document.getElementById('bidDisplayID').innerText = bidTracker;

  // enable the user to start the game
  document.getElementById('startButtonID').disabled = false;
};
// ----------START BUTTON EVENT LISTENER--------------
const startButtonEventListener = () => {
  if (bidTracker > 0) {
    // prevent user from increasing bid
    document.getElementById('bidButton').disabled = true;
    // allow user to use the deal/draw button
    document.getElementById('dealOrDrawButtonID').disabled = false;

    // initialise the game
    initGame();

    // make the start game button unclickable
    document.getElementById('startButtonID').disabled = true;
  }
};
// ---------------------DEAL OR DRAW BUTTON EVENT LISTENER-----
const dealOrDrawEventListener = () => {
  // if the player has chosen to keep all cards:
  if (player.tempHand.length === player.setHandSize) {
    console.log('player is keeping all the cards');

    // Analyse the player's hand
    getHandScore();
  }

  // else if the player has chosen some cards to keep and others to dispose:
  else if (player.tempHand.length < player.setHandSize && (playerHasRedrawnCards === false)) {
    // empty the player.hand and push temphand objects into the player.hand
    player.hand = [];
    player.hand.push(...player.tempHand);
    // re-deal cards to player until his hand is full
    while (player.hand.length < player.setHandSize) {
      player.hand.push(deck.pop());
    }
    // display new hand
    createCardsElements();
    // turn off the ability for player to try and select cards(i.e. keeepCard)
    keepCardCanClick = false;
    // empty the temp hand so that the next time user clicks deal/draw,
    // it will getHandscore (by virture of logic)
    player.tempHand = [];
    playerHasRedrawnCards = true;
  } else if (playerHasRedrawnCards === true) {
    playerHasRedrawnCards = false;
    getHandScore();
  }
};

//= ===========GAME FLOW========================
const initGame = () => {
  // initialise the player's hand+ create his cards' elements
  createCardsElements();

  // Logic to decide whether player is going forward with his current hand,
  // or if he wants to return/draw new cards:

  // if player clicks the draw button and has selected cards to keep, then draw new cards for him;
  document.getElementById('dealOrDrawButtonID').addEventListener('click', dealOrDrawEventListener);
  // make the reset button click-able so that the user can play again
  //  functionality to let player reset game after he is finished:
  document.getElementById('resetButtonID').addEventListener('click', clickReset);
  document.getElementById('resetButtonID').disabled = false;
  console.log('HELLO WORLD');
};

const setupGame = () => {
  // build the board
  buildBoardElements();
  // initialise player's hand
  intialiseHand();

  // enable bidding via a button
  document.getElementById('bidButton').addEventListener('click', bidButtonEventListener);

  // when the user starts the game, prevent further bidding
  document.getElementById('startButtonID').addEventListener('click', startButtonEventListener);
};

setupGame();
