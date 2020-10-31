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

// ------------Build the board elements----------------
const buildBoardElements = () => {
  // create the primary container
  // const priContainter = document.createElement('div');
  // priContainter.classList = 'priContainer';

  // build the secondary container: Arsenal
  // const arsenal = document.createElement('div');
  // arsenal.classList = 'arsenal';
  // arsenal.setAttribute('id', 'arsenalID');

  // build secondary container1: credits management console
  // const creditsManagementConsoleElement = document.createElement('div');
  // creditsManagementConsoleElement.classList = 'creditsManagementConsoleElement';

  // build the secondary container2: player interactionConsoleElement
  // const interactionConsoleElement = document.createElement('div');
  // interactionConsoleElement.classList = 'interactionConsoleElement';

  // build the bidding/ betting button:
  // const addBidButton = document.createElement('button');
  // addBidButton.classList = 'addBidButton';
  // addBidButton.innerText = 'Bid/Add Bid';
  // addBidButton.setAttribute('id', 'addBidButtonID');
  document.getElementById('bidButton').addEventListener('click', () => {
    if (bidTracker < 5) {
      bidTracker += 1;
    }
    console.log(bidTracker);
  });

  // update the bid display
  document.getElementById('bidDisplayID').innerText = bidTracker;

  // add a display to show the

  // build the credits display: creditsDisplayElement
  // const creditsDisplayElement = document.createElement('div');
  // creditsDisplayElement.classList = 'creditsDisplayElement';
  // creditsDisplayElement.setAttribute('id', 'creditsDisplayElementID');
  document.getElementById('creditsDisplayElementID').innerText = `CREDITS: ${player.credits}`;

  // build the start game button: starGame
  // const startGameButton = document.createElement('button');
  // startGameButton.classList = 'startGameButton';
  // startGameButton.innerText = ' Start';

  // build the deal/draw button: dealOrDraw
  // const dealOrDrawButton = document.createElement('button');
  // dealOrDrawButton.classList = 'dealOrDrawButton';
  // dealOrDrawButton.setAttribute('id', 'dealOrDrawButtonID');
  // dealOrDrawButton.innerText = 'Deal/Draw';

  // append child according to logic: parent> child1>child nodes, child2>nodes
  // document.body.appendChild(priContainter);
  // priContainter.appendChild(arsenal);
  // priContainter.appendChild(creditsManagementConsoleElement);
  // creditsManagementConsoleElement.appendChild(addBidButton);
  // creditsManagementConsoleElement.appendChild(creditsDisplayElement);

  // priContainter.appendChild(interactionConsoleElement);
  // interactionConsoleElement.appendChild(startGameButton);
  // interactionConsoleElement.appendChild(dealOrDrawButton);
};

// -----------SHOW PLAYER CREDITS-----------
// this is a function that simplifies the code needed to update player his on credits
const showCredits = (message) => {
  document.getElementById('creditsDisplayElementID').innerHTML = `CREDITS: ${message}`;
};

// -------initialise user's hand----------
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
const createCardsElements = () => {
  // ensure that the container is empty before creating anything:
  document.getElementById('arsenalID').innerHTML = '';

  // display the player's hand
  for (let i = 0; i < player.hand.length; i += 1) {
    console.log(player.hand[i]);
    // create a card element, and append it to the arsenal
    const cardElement = document.createElement('div');
    cardElement.classList.add('cardElement');
    cardElement.classList.add('btn-outline-dark');
    cardElement.classList.add('col-md-2');
    cardElement.classList.add('col-lg-4');
    cardElement.setAttribute('id', 'cardElementID');
    document.getElementById('arsenalID').appendChild(cardElement);
    // assign current cardElement the details for card[i]
    cardElement.innerHTML = player.hand[i].display + player.hand[i].suitSymbol;

    // make each card element clickable
    // eslint-disable-next-line
    // cardElement.addEventListener('click', keepCard)
    cardElement.addEventListener('click', (event) => {
      if (keepCardCanClick === true) {
        keepCard(event.currentTarget, i);
        // event.currentTarget.appendChild(keepCardIndication);
      }
    });
  }
};

// ---------Identify which cards to keep-------
// ----concept: store the identified cards in a new array, then update player.hand w/ that new array
const keepCard = (cardElement, position) => {
  // console.log('card element is: ');
  // console.log(cardElement);

  const clickedCard = player.hand[position];
  // console.log('clicked card is:');
  // console.log(clickedCard);

  // on each card, create an element that will appear to show user that he has decided to keepCard
  const keepCardIndication = document.createElement('div');
  keepCardIndication.setAttribute('id', 'keepCardIndicationID');
  keepCardIndication.innerText = 'Keep';

  // if the clicked card is alr in the array, remove it from the array
  // go through the temphand array
  for (let j = 0; j < player.tempHand.length; j += 1) {
    // if the card at temphand[j] matches the clicked card, then remove temphand[j] from the tempHand array
    if ((clickedCard.display === player.tempHand[j].display) && (clickedCard.suit === player.tempHand[j].suit)) {
      player.tempHand.splice(j, 1);
      // console.log('splicing this card');
      // console.log(player.tempHand[j]);
      // const keepDiv = document.getElementById('keepCardIndicationID');
      const keepDiv = cardElement.querySelector('div');
      console.log(keepDiv);
      cardElement.removeChild(keepDiv);
      return;
    }
  }
  // if user clicks a card, add it to new array
  // console.log('pushing....');
  player.tempHand.push(clickedCard);
  cardElement.appendChild(keepCardIndication);
};

// ----------determine bet type------------------
const getStakes = () => {
  const stakesArray = [{}, {}, {}, {}];
  // make first object in array
  stakesArray[0] = {
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
  // using first object, makes subsequent objects by using multiples of first object's properties.
  for (let i = 1; i < stakesArray.length; i += 1) {
    stakesArray[i] = {
      straightFlush: stakesArray[0].straightFlush * (i + 1),
      fourOfAKind: stakesArray[0].fourOfAKind * (i + 1),
      fullHouse: stakesArray[0].fullHouse * (i + 1),
      flush: stakesArray[0].flush * (i + 1),
      straight: stakesArray[0].straight * (i + 1),
      threeOfAKind: stakesArray[0].threeOfAKind * (i + 1),
      twoPair: stakesArray[0].twoPair * (i + 1),
      jacksOrLarger: stakesArray[0].jacksOrLarger * (i + 1),
      lose: stakesArray[0].jacksOrLarger * (i + 1),
    };
  }
  console.log(stakesArray);
  return stakesArray[bidTracker];
};

const clickRestart = () => {
// reset bidTracker to 0
  bidTracker = 0;
  // reset bidding button to ensure it is click-able
  document.getElementById('bidButton').removeAttribute('disabled');
  // initialise the game
  initGame();
};
//= ===========GAME FLOW========================
const initGame = () => {
  // build the board
  buildBoardElements();

  // initialise the player's hand+ create his cards' elements
  intialiseHand();
  createCardsElements();

  // Display the user's credits

  // Logic to decide whether player is going forward with his current hand,
  // or if he wants to return/draw new cards:

  // if player clicks the draw button and has selected cards to keep, then draw new cards for him;
  document.getElementById('dealOrDrawButtonID').addEventListener('click', () => {
    console.log('pressing \'deal/draw...');
    // if the player has chosen to keep all cards:
    if (player.tempHand.length === 0) {
      console.log('player temp hand is empty');

      // prevent user from increasing bid here-on-out
      document.getElementById('bidButton').setAttribute('disabled', 'disabled');
      // Analyse the player's hand
      getHandScore();
    }

    // else if the player has chosen some cards to keep and others to dispose:
    else if (player.tempHand.length !== 0) {
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
    }
  });
  // give functionality to let player restart game after he is finished:
  document.getElementById('restartButtonID').addEventListener('click', clickRestart);
};

initGame();
