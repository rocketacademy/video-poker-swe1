// CREATING THE DECK
const handleCreateDeck = () => {
  const deckSuit = ['♠️', '♣️', '♥️', '♦️'];
  const deckValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  let newDeck = [];
  for (i = 0; i < deckSuit.length; i += 1) {
    const currentSuit = deckSuit[i];

    for (j = 0; j < deckValues.length; j += 1) {
      // CONVERT 1 , 11, 12, 13 TO RESPECTIVE deckValues
      switch (deckValues[j]) {
        case 1:
          deckValues[j] = 'A';
          break;
        case 11:
          deckValues[j] = 'J';
          break;
        case 12:
          deckValues[j] = 'Q';
          break;
        case 13:
          deckValues[j] = 'K';
          break;
        default:
          deckValues[j];
          break;
      }
      newDeck.push({
        suit: deckSuit[i],
        value: deckValues[j],
      });
    }
  }
  return newDeck;
};

// SHUFFLE CARDS
const handleShuffleCards = (cards) => {
  // Get a random index ranging from 0 (inclusive) to max (exclusive).
  const getRandomIndex = (max) => Math.floor(Math.random() * max);

  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

// DEAL CARDS SHOULD ONLY CARE ABOUT PUSHING 5 CARDS INTO USER HAND
const handleDealCard = (userHand) => {
  for (i = 0; i < 5; i += 1) {
    const r = Math.floor(Math.random() * gameState.deck.length);
    userHand.push(gameState.deck[r]);
  }
  console.log('THIS IS PLAYER HAND AFTER DEALING', user.hand);

  // // CHECK FOR EXISTING CARDS ON VISIBLE DOM
  // // THIS SHOULD GO INTO DOM.JS (handleDrawDom)
  // if (domSelector.deckList.firstChild) {
  //   while (domSelector.deckList.firstChild) {
  //     domSelector.deckList.removeChild(domSelector.deckList.firstChild);
  //     console.log("REMOVING ", domSelector.deckList.firstChild);
  //   }
  // }

  // //  LOOP THROUGH THE PLAYER HAND ARRAY AND DRAW CARD TO DOM
  // playerHand.forEach((cardOnHand) => {
  //   // console.log("THIS IS CARD FOREACH ", cardOnHand);

  //   // CREATE DOM ELEMENTS
  //   const deckItem = document.createElement("li");
  //   const card = document.createElement("div");
  //   const topLeftValue = document.createElement("div");
  //   const suit = document.createElement("div");
  //   const bottomRightValue = document.createElement("div");

  //   // ADD CLASS NAMES TO ELEMENTS
  //   deckItem.classList.add("deck-item");
  //   card.classList.add("card");
  //   topLeftValue.classList.add("top-left-value");
  //   suit.classList.add("suit");
  //   bottomRightValue.classList.add("bottom-right-value");

  //   // ADD INNERTEXT TO ELEMENTS
  //   topLeftValue.innerText = cardOnHand.value;
  //   bottomRightValue.innerText = cardOnHand.value;
  //   suit.innerText = cardOnHand.suit;

  //   // APPEND TO DOM

  //   // append all children
  //   card.appendChild(topLeftValue);
  //   card.appendChild(suit);
  //   card.appendChild(bottomRightValue);
  //   // <LI>
  //   deckItem.appendChild(card);
  //   // <UL> (parent DOM)
  //   domSelector.deckList.appendChild(deckItem);
  // });
};

// HANDLES GIVING OUT NEW CARDS TO PLAYER IF REQUESTED
// only care about replacing selected cards
const handleNewCards = (
  cardValueToChangeTop,
  cardValueToChangeBottom,
  suit,
  i,
  arr
) => {
  // NOT WORKING YET STILL STUCK HERE

  gameState.swap += 1;

  if (gameState.secondDeal === true) {
    domSelector.changeCardButton.classList.add('disable-click');
    domSelector.deckItem.classList.add('disable-click');
    // eslint-disable-next-line no-undef
    domSelector.cardDiv.classList.toggle('able-swap');
    // domSelector.cardDiv.classList.add("disable-swap");
  }

  // Mutate user.hand
  // user.hand[i] = { suit: "♠️", value: 3 };
  const r = Math.floor(Math.random() * gameState.deck.length);
  user.hand[i] = gameState.deck[r];
  cardValueToChangeTop.innerText = user.hand[i].value;
  cardValueToChangeBottom.innerText = user.hand[i].value;
  suit.innerText = user.hand[i].suit;

  console.log('NEW USER HAND ', user.hand);

  gameState.swap >= 2
    ? (gameState.secondDeal = true)
    : (gameState.secondDeal = false);
};
