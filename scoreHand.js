//= =========GLOBAL VARIABLES============

const player = {
  setHandSize: 5,
  hand: [],
  tempHand: [],
  handScore: 0,
  credits: 100,
};
let deck = [];
let keepCardCanClick = true;

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

//= =========HELPER FUNCTIONS==========

// ------------Build the board element----------------
const buildBoardElements = () => {
  // create the primary container
  const priContainter = document.createElement('div');
  priContainter.classList = 'priContainer';

  // build the secondary container: Arsenal
  const arsenal = document.createElement('div');
  arsenal.classList = 'arsenal';
  arsenal.setAttribute('id', 'arsenalID');

  // build the secondary container: player interactionConsole
  const interactionConsole = document.createElement('div');
  interactionConsole.classList = 'interactionConsole';

  // build the credits display: creditsDisplay
  const creditsDisplay = document.createElement('div');
  creditsDisplay.classList = 'creditsDisplay';
  creditsDisplay.setAttribute('id', 'creditsDisplayID');
  creditsDisplay.innerText = player.credits;

  // build the start game button: starGame
  const startGameButton = document.createElement('button');
  startGameButton.classList = 'startGameButton';
  startGameButton.innerText = ' Start';
  // build the deal/draw button: dealOrDraw
  const dealOrDrawButton = document.createElement('button');
  dealOrDrawButton.classList = 'dealOrDrawButton';
  dealOrDrawButton.setAttribute('id', 'dealOrDrawButtonID');
  dealOrDrawButton.innerText = 'Deal/Draw';

  // append child according to logic: parent> child1>child nodes, child2>nodes
  document.body.appendChild(priContainter);
  priContainter.appendChild(arsenal);
  priContainter.appendChild(interactionConsole);
  interactionConsole.appendChild(creditsDisplay);
  interactionConsole.appendChild(startGameButton);
  interactionConsole.appendChild(dealOrDrawButton);
};

// -------initialise user's hand----------(fn w/in fn)
const intialiseHand = () => {
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
    cardElement.setAttribute('id', 'cardElementID');
    cardElement.classList = 'cardElement';
    document.getElementById('arsenalID').appendChild(cardElement);
    // assign current cardElement the details for card[i]
    cardElement.innerHTML = player.hand[i].display + player.hand[i].suitSymbol;

    // make each card element clickable
    // eslint-disable-next-line
    cardElement.addEventListener('click', (event) => {
      if (keepCardCanClick === true) {
        keepCard(event.currentTarget, i);
      }
    });
  }
};

// ---------Identify which cards to keep-------
// ----concept: store the identified cards in a new array, then update player.hand w/ that new array
const keepCard = (cardElement, position) => {
  console.log('card element is: ');
  console.log(cardElement);

  const clickedCard = player.hand[position];
  console.log('clicked card is:');
  console.log(clickedCard);

  // if the clicked card is alr in the array, remove it from the array
  for (let j = 0; j < player.tempHand.length; j += 1) {
    if ((clickedCard.display === player.tempHand[j].display) && (clickedCard.suit === player.tempHand[j].suit)) {
      player.tempHand.splice(j, 1);
      console.log('splicing this card');
      console.log(player.tempHand[j]);
      return;
    }
  }
  // if user clicks a card, add it to new array
  console.log('pushing....');
  player.tempHand.push(clickedCard);
};

// -----------GET THE SCORE IN PLAYER'S HAND--------
const getHandScore = () => {
  if (player.hand.length >= 5) {
    player.credits += 100;
  }
  else { player.credits -= 50; }
  // Display the user's credits
  document.getElementById('creditsDisplayID').innerText = `Your credits${player.credits}`;
  console.log(`Your credits: ${player.credits}`);
};

//= ===========GAME FLOW========================
// deal cards to player and store in his hand
const gameInit = () => {
  // build the board
  buildBoardElements();

  // initialise the player's hand
  intialiseHand();
  createCardsElements();

  // Display the user's credits
  // note: 100 credits were assigned to the player via default (as a global V)
  console.log(`Your credits: ${player.credits}`);

  // if player clicks the draw button and has selected cards to keep, then draw new cards for him;
  document.getElementById('dealOrDrawButtonID').addEventListener('click', () => {
    console.log('pressing \'deal/draw...');
    if (player.tempHand.length === 0) {
      console.log('player temp hand is null');
    } else if (player.tempHand.length !== 0) {
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
    }
  });
  // Analyse the player's hand
  getHandScore();
};
gameInit();
