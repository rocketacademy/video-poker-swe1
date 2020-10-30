// Global Variable
const playerHand = [];
let playerCard;
let bid = 5;
const winnings = 100;
let dealTurn = 'first';

// helper functions (Make Deck) (Shuffle Cards)

// cards is an array of card objects
const shuffleCards = (cards) => {
  // get a random index from an array given it's size
  const getRandomIndex = (size) => Math.floor(Math.random() * size);
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

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    let colorType;
    let suitSymbol;
    if (suitIndex == 0) {
      suitSymbol = '♥';
      colorType = 'red';
    } else if (suitIndex == 1) {
      suitSymbol = '♦';
      colorType = 'red';
    } else if (suitIndex == 2) {
      suitSymbol = '♣';
      colorType = 'black';
    } else {
      suitSymbol = '♠';
      colorType = 'black';
    }

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;
      let displayName;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }
      if (cardName === 'A') {
        displayName = 'A';
      } else if (cardName === 'J') {
        displayName = 'J';
      } else if (cardName === 'Q') {
        displayName = 'Q';
      } else if (cardName === 'K') {
        displayName = 'K';
      } else {
        displayName = cardName;
      }

      // make a single card object variable
      const cardInfo = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        symbol: suitSymbol,
        color: colorType,
        display: displayName,
      };

      // add the card to the deck
      newDeck.push(cardInfo);
    }
  }

  return newDeck;
};
// make deck
const deck = shuffleCards(makeDeck());

/* <==== Game element we need / what the user sees ===>
1. Username input box (Done)
2. Submit button (done)
3. Bid amount input box (done)
4. Display of 5 Cards + Card Container (done)
5. Winnings shown on screen (done)
6. Click to deal button (done)
*/

// Creating the elements on screen

// output message div
const outputMessageDiv = document.createElement('div');
outputMessageDiv.setAttribute('class', 'display');

// output Message helper function
const outputMessage = (message) => {
  outputMessageDiv.innerHTML = message;
};

// First screen display div to get user input for name
const firstDisplayDiv = document.createElement('div');
firstDisplayDiv.setAttribute('class', 'display');
firstDisplayDiv.setAttribute('id', 'first-display');

// Main display div to display all the elements
const mainDisplayDiv = document.createElement('div');
mainDisplayDiv.setAttribute('class', 'display');
mainDisplayDiv.setAttribute('id', 'second-display');

// bid amount display and label
const bidAmountInput = document.createElement('input');
bidAmountInput.setAttribute('type', 'number');
bidAmountInput.setAttribute('class', 'display');
bidAmountInput.setAttribute('id', 'bid-amount-user');
bidAmountInput.value = bid;
const bidAmountLabel = document.createElement('label');
bidAmountLabel.setAttribute('class', 'display');
bidAmountLabel.innerText = 'Bid Amount:';

// winnings display and label
const displayWinnings = document.createElement('input');
displayWinnings.setAttribute('type', 'number');
displayWinnings.setAttribute('class', 'display');
displayWinnings.setAttribute('id', 'winnings');
displayWinnings.value = winnings;
// disabling the input ability for the user
displayWinnings.disabled = true;
const displayWinningsLabel = document.createElement('label');
displayWinningsLabel.setAttribute('class', 'display');
displayWinningsLabel.innerText = 'Winnings:';

// background Div display
const cardContainer = document.createElement('div');
cardContainer.classList.add('cardContainer');

// creation of deal button element
const dealButton = document.createElement('button');
dealButton.innerText = 'Deal Cards';

// // function to auto create the back of the card element
// const cardBackCreation = () => {

// };
// creation of back of card element
const cardBack1 = document.createElement('img');
cardBack1.setAttribute('src', 'https://tinyurl.com/y4bvjuw9');
cardBack1.classList.add('cardback');

// creation of back of card element
const cardBack2 = document.createElement('img');
cardBack2.setAttribute('src', 'https://tinyurl.com/y4bvjuw9');
cardBack2.classList.add('cardback');

// card selection to trade
let selectedCardsArray = [];
let isCardSelected = false;
const cardSelection = (selectedCard) => {
  /* if a player chooses a card to trade and it has not been selected before, store it in an array
  if the card has been selected before, remove it from the array */
  // checking to see if there is any card in the array using the length of cards
  dealButton.disabled = false;
  dealButton.innerText = 'Click to Trade';
  dealTurn = 'second';
  if (selectedCardsArray.length > 0) {
    for (let i = 0; i < selectedCardsArray.length; i += 1) {
      if (selectedCard === selectedCardsArray[i]) {
        isCardSelected = true;
        selectedCardsArray.splice(i, 1); // remove the card from the array using splice
        i -= 1;
      }
    }
  }
  if (isCardSelected === false) {
    selectedCardsArray.push(selectedCard); // store the card in the card in the array
  }
};
// create the front of the card and add event listner to the card front
let cardIDCounter = 0;
const createCard = (cardInfo) => {
  const symbol = document.createElement('div');
  symbol.classList.add('suit');
  symbol.classList.add(cardInfo.display, cardInfo.color, 'card-corner-suit', 'card-topleft');
  symbol.innerText = cardInfo.symbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.display, cardInfo.color, 'card-corner-rank', 'card-topleft');
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('id', 'card');
  card.setAttribute('id', 'position' + cardIDCounter);
  card.appendChild(name);
  card.appendChild(symbol);
  return card;
};

const tradeCards = () => {
  // trade the selected cards in playerhand
  for (let i = 0; i < playerHand.length; i += 1) {
    for (let j = 0; j < selectedCardsArray.length; j += 1) {
      if (selectedCardsArray[j].rank === playerHand[i].rank
        && selectedCardsArray[j].suit === playerHand[i].suit) {
        playerHand.splice(i, 1, deck.pop());
      }
    }
  }
  // empty the cards in trade array after the trade is done
  selectedCardsArray = [];
  // clear display of current player's hand
  cardContainer.innerHTML = '';
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardEl = createCard(playerHand[i]);
    cardContainer.appendChild(cardEl);
  }
  dealTurn = 'null';
};

// appending child order/display order
mainDisplayDiv.appendChild(bidAmountLabel);
mainDisplayDiv.appendChild(bidAmountInput);
mainDisplayDiv.appendChild(displayWinningsLabel);
mainDisplayDiv.appendChild(displayWinnings);
mainDisplayDiv.appendChild(dealButton);
mainDisplayDiv.appendChild(cardContainer);

// store the cards based on rank, each rank has a different row in the array
let rankHandArray = [[]];

const arrangeCards = () => {
  // for each position of the playerhand starting from the 0th index
  // find higher rank cards and swap them in those position
  let j = 1;
  for (let i = 0; i < (playerHand.length - 1); i += 1) {
    for (let k = j; k < playerHand.length; k += 1) {
      if (playerHand[k].rank > playerHand[i].rank) {
        const lowerRankCard = playerHand[i];
        const higherRankCard = playerHand[k];
        playerHand[i] = higherRankCard;
        playerHand[k] = lowerRankCard;
      }
    }
    j += 1;
  }
};
const groupRankedPlayerCards = () => {
  // empty hand from previous games
  // playerHand[0].rank = 13;
  // playerHand[1].rank = 12;
  // playerHand[2].rank = 11;
  // playerHand[3].rank = 10;
  // playerHand[4].rank = 1;
  // playerHand[0].suit = 'diamonds';
  // playerHand[1].suit = 'diamonds';
  // playerHand[2].suit = 'diamonds';
  // playerHand[3].suit = 'diamonds';
  // playerHand[4].suit = 'diamonds';
  // arrangeCards();
  rankHandArray = [[]];
  rankHandArray[0].push(playerHand[0]);
  let rankRow = 0;
  for (let i = 1; i < playerHand.length; i += 1) {
    // store the current card in the row array containing same rank cards
    if (playerHand[i].rank === playerHand[i - 1].rank) {
      rankHandArray[rankRow].push(playerHand[i]);
    } else { // store the current card in the next row array if different rank
      rankHandArray.push([]);
      rankRow += 1;
      rankHandArray[rankRow].push(playerHand[i]);
    }
  }
};
let rankHandArrayLength = 0;
let straightFlush = null;
let fourOfAKind = null;
let fullHouse = null;
let flush = null;
let straights = null;
let straightsToAce = null;
let threeOfAKind = null;
let twoPairs = null;
let pair = null;
let highCard = null;
let royalFlush = null;

const checkForStraightFlush = () => {
  if (straights === true && flush === true && straightsToAce === null) {
    straightFlush = true;
    console.log('Straight Flush');
  } else if (straights === true && flush === true && straightsToAce === true) {
    royalFlush = true;
    console.log('Royal Flush');
  }
};
const checkForFourOfAKind = () => {
  if (rankHandArrayLength === 2
    && (rankHandArray[0].length === 4
    || rankHandArray[1].length === 4)) {
    fourOfAKind = true;
    console.log('Four of a kind!');
  }
};
const checkForFullHouse = () => {
  if (rankHandArrayLength === 2
    && (rankHandArray[0].length === 3
      || rankHandArray[1].length === 3)) {
    fullHouse = true;
    console.log('full house');
  }
};
const checkForStraights = () => {
  if (rankHandArray.length === 5 && rankHandArray[4][0].rank === 1) {
    rankHandArray[4][0].rank = 14;
    if (Math.abs(rankHandArray[0][0].rank - rankHandArray[1][0].rank
      + rankHandArray[1][0].rank - rankHandArray[2][0].rank
      + rankHandArray[2][0].rank - rankHandArray[3][0].rank) === 3) {
      straights = true;
      straightsToAce = true;
      console.log('straights to ace');
    } } else if (Math.abs((rankHandArray[0][0].rank - rankHandArray[1][0].rank)
        + (rankHandArray[1][0].rank - rankHandArray[2][0].rank)
        + (rankHandArray[2][0].rank - rankHandArray[3][0].rank)
        + (rankHandArray[3][0].rank - rankHandArray[4][0].rank)) == 4) {
    straights = true;
    console.log('straights');
  }
};
const checkForFlush = () => {
  if (rankHandArrayLength === 5 && (rankHandArray[0][0].suit === rankHandArray[1][0].suit
    && rankHandArray[1][0].suit === rankHandArray[2][0].suit
    && rankHandArray[2][0].suit === rankHandArray[3][0].suit
    && rankHandArray[3][0].suit === rankHandArray[4][0].suit)) {
    flush = true;
    console.log('flush');
  }
};
const checkForThreeOfAKind = () => {
  if (rankHandArrayLength === 3
        && (rankHandArray[0].length === 3
          || rankHandArray[1].length === 3
          || rankHandArray[2].length === 3)) {
    threeOfAKind = true;
    console.log('Three of a Kind!');
  } };

const checkForTwoPairs = () => {
  if (rankHandArrayLength === 3 && threeOfAKind === null
      && ((rankHandArray[0].length === 2 && rankHandArray[1].length == 2)
          || (rankHandArray[1].length === 2 && rankHandArray[2].length == 2)
          || (rankHandArray[2].length === 2 && rankHandArray[3].length == 2))) {
    twoPairs = true;
    console.log('Two Pairs');
  } };
const checkForPair = () => {
  if (rankHandArrayLength === 4
        && ((rankHandArray[0].length === 2)
            || (rankHandArray[1].length === 2)
            || (rankHandArray[2].length === 2)
            || (rankHandArray[3].length === 2)
            || (rankHandArray[4].length === 2))) {
    pair = true;
    console.log('One Pair');
  } };
const checkForHighCard = () => {
  if (rankHandArrayLength === 5
    && royalFlush === null
    && straightFlush === null
    && fourOfAKind === null
    && fullHouse === null
    && flush === null
    && straights === null
    && threeOfAKind === null
    && twoPairs === null
    && pair === null) {
    highCard = true;
    console.log('High Card');
  }
};

const checkPlayerHand = () => {
  rankHandArrayLength = 0;
  for (let i = 0; i < rankHandArray.length; i += 1) {
    rankHandArrayLength += 1;
  }
  console.log(rankHandArrayLength);
  checkForFourOfAKind();
  checkForFullHouse();
  checkForFlush();
  checkForStraights();
  checkForThreeOfAKind();
  checkForTwoPairs();
  checkForPair();
  checkForHighCard();
  checkForStraightFlush();
};

// const calHandScore = () => {
// //   // check for straight flush

/* Point Tabulation:
Check winning
1. High card = none of the below citerias are met

2. Pair = when the rank of only two cards are the same

3. Two pair = when there are 2 sets of 2 same rank cards

4. Three of a kind = when there is a set of 3 of the same rank cards

5. Straight - when there card rank are in numerical order
(possibly using absolute number = -1, total = -4 to check if it is a straight

6. Flush = when 5 suits are all the same
// Check hand to see if they are all

7. Full house = when there is a three of a kind and a pair

8. Four of a kind = where there is 4 of the same rank card
   // Check hand to see if there are 4 of the same cards.

9. Straight flush = when there is a straight together with the same suits
*/

// const calHandScore = (playerHand) => {
// Straight Flush - A flush and a straights logic.
// if (Math.abs(playerHand[4].rank - playerHand[3].rank
//     + playerHand[3].rank - playerHand[2].rank
//     + playerHand[2].rank - playerHand[1].rank
//     + playerHand[1].rank - playerHand[0].rank) === 4
//     && playerHand[0].suit === playerHand[1].suit
//       && playerHand[1].suit === playerHand[2].suit
//       && playerHand[2].suit === playerHand[3].suit
//       && playerHand[3].suit === playerHand[4].suit)
// {
//   console.log('straight flush');
// } else {
//   console.log('not straight');
// }

// Four of a Kind
// if (playerHand[0].rank === playerHand[1].rank
//   && playerHand[0].rank === playerHand[1].rank)
// {
//   console.log();
// }
// Full house

// Flush
// if (playerHand[0].suit === playerHand[1].suit
//   && playerHand[1].suit === playerHand[2].suit
//   && playerHand[2].suit === playerHand[3].suit
//   && playerHand[3].suit === playerHand[4].suit) {
//   console.log('flush');
// } else {
// //   console.log('no');
// }

// Straights - Sort out an array and then use absolute distance.
// If you have a total of 4, it is a straight
// if (Math.abs(playerHand[4].rank - playerHand[3].rank
//   + playerHand[3].rank - playerHand[2].rank
//   + playerHand[2].rank - playerHand[1].rank
//   + playerHand[1].rank - playerHand[0].rank) === 4) {
//   console.log('straight');
// } else {
//   console.log('not straight');
// }

// Three of a kind

// Two Pairs

// Pair
// if(playerHand[0].rank == playerHand[1].rank ||
//   playerHand[1].rank == playerHand[2].rank ||
//   playerHand[2].rank == playerHand[3].rank ||
//   playerHand[3].rank == playerHand[4].rank ||
//   )
// };

/*
Score ranking to return bet amount
1. High Card - User loses, minus bet amount from winning
2. Pair - bet amount * 1 , add to bet amount
3. Two pairs - bet amount * 2 , add to bet amount
4. Three of a kind - bet amount * 3, add to bet amount
5. Straights - bet amount * 4, add to bet amount
6. Flush- bet amount * 5, add to bet amount
7. Full house - bet amount * 6, add to bet amount
8. four of a kind - bet amount * 7, add to bet amount
9. Straight Flush - bet amount * 8, add to bet amount

*/

// creating username input and carry on the game after
const gamePlay = () => {
  // textbox display
  const inputBox = document.createElement('input');
  inputBox.setAttribute('type', 'text');
  inputBox.setAttribute('placeholder', 'Please input name');
  inputBox.setAttribute('class', 'display');
  inputBox.setAttribute('id', 'username-input');
  firstDisplayDiv.appendChild(inputBox);
  // creation of submit button
  const submitButton = document.createElement('button');
  submitButton.innerText = 'Submit';
  // adding eventlistener to submitbutton to retrieve userInput and displaying the other elements
  submitButton.addEventListener('click', () => {
    const usernameInput = document.querySelector('#username-input');
    outputMessage(`Hello ${usernameInput.value}! Please Enter Bid Amount And Click Deal to Start`);
    inputBox.value = '';
    document.body.removeChild(firstDisplayDiv);
    document.body.appendChild(mainDisplayDiv);
  });
  dealButton.addEventListener('click', () => {
    bid = document.querySelector('#bid-amount-user').value;
    // check for bid amount being bigger than winnings
    if (bid > winnings) {
      outputMessage('You do not have that much to bid! Please try again');
    } else if (dealTurn == 'first') {
      for (let i = 0; i < 5; i += 1) {
        playerCard = deck.pop();
        playerHand.push(playerCard);
      }
      console.log(`${(JSON.stringify(playerHand))} first hand`);
      dealButton.disabled = true;
      outputMessage('Please select card you wish to trade');
      bidAmountInput.disabled = true;
      for (let i = 0; i < playerHand.length; i += 1) {
        const cardEl = createCard(playerHand[i]);
        const selectedCard = playerHand[i];
        cardIDCounter += 1;
        cardContainer.appendChild(cardEl);
        const cardContainer2 = cardContainer;
        cardEl.addEventListener('click', () => {
          cardSelection(selectedCard);
          cardContainer.replaceChild(cardBack1, document.querySelector('.card:nth-child(2)'));
          cardContainer2.replaceChild(cardBack2, document.querySelector('.card:nth-child(3)'));
        });
      }
    } else if (dealTurn == 'second') {
      tradeCards();
      dealButton.disabled = true;
      // get array length to do comparison
      arrangeCards();
      groupRankedPlayerCards();
      checkPlayerHand();

      outputMessage('Result');
    }
  });
  firstDisplayDiv.appendChild(submitButton);
};

const gameInit = () => {
  gamePlay();
  outputMessage('Hello, please input your name to begin');
  document.body.appendChild(outputMessageDiv);
  document.body.appendChild(firstDisplayDiv);
  document.body.style.background = "url('https://i.imgur.com/nWiqT8A.png') no-repeat";
  document.body.style.backgroundSize = '1000px 1000px';
};
gameInit();
