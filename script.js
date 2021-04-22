// 1 player plays
// start the game with 100 points.
// on "deal" => 5 cards will be dealt.
// player can ask for different cards.
// ranking given based on players hand.

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
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

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  // const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suits = ['❤️', '♦️', '♣️', '♠️'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // ### add a joker to the deck
  // const card = {
  //   name: 'joker',
  //   suit: 'none',
  //   rank: 0,
  // };
  // ####newDeck.push(card);

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

let resultText = '';

function viewResult() {
  const resultBtn = document.createElement('button');
  resultBtn.innerText = 'Result';
  resultBtn.setAttribute('id', 'result-btn');
  document.body.appendChild(resultBtn);
  return resultBtn;
}

function playerCardsRankArr(drawnCardsArr) {
  const ranksOnlyArr = [];
  for (let i = 0; i < drawnCardsArr.length; i += 1) {
    const card = drawnCardsArr[i].rank;
    ranksOnlyArr.push(card);
  }
  return ranksOnlyArr;
}

function playerCardsSuitArr(drawnCardsArr) {
  const suitsOnlyArr = [];
  for (let i = 0; i < drawnCardsArr.length; i += 1) {
    const card = drawnCardsArr[i].suit;
    suitsOnlyArr.push(card);
  }
  console.log(`cardRanks: ${suitsOnlyArr}`);
  return suitsOnlyArr;
}

// check for suits
function checkForSuits(cards) {
  const cardSuits = playerCardsSuitArr(cards);
  let count = 0;
  for (let i = 0; i < 1; i += 1) {
    for (let j = i + 1; j < cardSuits.length; j += 1) {
      if (cardSuits[i] === cardSuits[j]) {
        count += 1;
      }
    }
  }
  console.log(`count of suits: ${count}`);
  if (count === 4) {
    return 'flush';
  }
}

function checkForStraight(cards) {
  const smallest = Math.min(...cards);
  const largest = Math.max(...cards);
  let sum = 0;

  for (let i = 0; i < cards.length; i += 1) {
    sum += cards[i];
  }
  if (smallest === 6 && largest === 10 && sum === 40) {
    return 'straight';
  }
}

// takes dealt cards object as input
function checkForStraightFlush(cards) {
  const cardsSuits = checkForSuits(cards);
  const cardRanks = playerCardsRankArr(cards);
  const largestRank = Math.max(...cardRanks);
  const smallestRank = Math.min(...cardRanks);
  let sum = 0;

  for (let i = 0; i < cardRanks.length; i += 1) {
    sum += cardRanks[i];
  }
  // if (largestRank === 11 && smallestRank === 7 && sum === 45 && cardsSuits === 'flush') {
  //   return 'straight flush';
  // }

  const checkSum = (smallestRank) * 5 + 10;
  if (sum === checkSum && cardsSuits === 'flush') {
    return 'straight flush';
  }
}

function checkForPair(dealtCardsArr) {
  const cardTypes = {};
  for (let i = 0; i < dealtCardsArr.length; i += 1) {
    const singleCard = dealtCardsArr[i].rank;
    if (cardTypes[singleCard] === undefined) {
      cardTypes[singleCard] = 1;
    }
    else {
      cardTypes[singleCard] += 1;
    }
  }
  return cardTypes;
}
function countPairs(pairObj) {
  console.log(pairObj);
  let result = 'no match found';
  let numOfPair = 0;
  //
  let foundThree = false;
  let foundFour = false;
  let foundJoker = false;
  for (let i = 0; i < Object.keys(pairObj).length; i += 1) {
    const value = Object.values(pairObj)[i];
    if (Object.keys(pairObj)[i] == 0) {
      foundJoker = true;
    }
    if (value === 2) {
      result = 'pair';
      numOfPair += 1;
      if (numOfPair === 2) {
        result = 'two pairs';
        return result;
      }
    }
    else if (value === 3) {
      result = 'three of a kind';
      // return result;
      foundThree = true;
    }
    else if (value === 4) {
      result = 'four of a kind';
      foundFour = true;
      // return result;
    }
    if (foundThree === true && numOfPair === 1) {
      result = 'full house';
      foundThree = false;
    }
    if (foundFour === true && foundJoker === true) {
      result = 'five of a kind';
    }
  }
  return result;
}

// takes player's cards(objects) array and returns the winning combination if any.
function checkForWinningCond(dealtCardsArr) {
  const cardRanks = playerCardsRankArr(dealtCardsArr);
  // game condition for flush
  const flushCards = checkForSuits(dealtCardsArr);
  if (flushCards === 'flush') {
    return 'flush';
  }

  // game condition for straight
  const straightCards = checkForStraight(cardRanks);
  if (straightCards === 'straight') {
    return 'straight';
  }
}

// function takes an array of card objects and returns the round's result & number of points.

function calcHandScore(cardsArr) {
  let totalPoints = 100;
  const matchedNum = checkForWinningCond(cardsArr);
  const straightFlush = checkForStraightFlush(cardsArr);
  // game condition for pair/s
  const pairs = checkForPair(cardsArr);
  const pairResult = countPairs(pairs);
  const resultMessage = `Total points: ${totalPoints}`;

  if (matchedNum === 'straight') {
    totalPoints += 50;
    return `Straight. Earned 50 points in the round. Total points: ${totalPoints}`;
  }
  if (straightFlush === 'straight flush') {
    totalPoints += 90;
    return `Straight flush. Earned 90 points in the round.Total points: ${totalPoints}`;
  }
  if (matchedNum === 'flush') {
    totalPoints += 60;
    return `Flush. Earned 60 points in the round.Total points: ${totalPoints}`;
  }

  if (pairResult === 'no match found') {
    totalPoints -= 10;
    return `No match found. Lost 10 points in the round.Total points: ${totalPoints}`;
  }
  if (pairResult === 'pair') {
    totalPoints += 20;
    return `Pair. Earned 20 points in the round. Total points: ${totalPoints}`;
  }
  if (pairResult === 'two pairs') {
    totalPoints += 30;
    return `Two Pairs. Earned 30 points in the round.Total points: ${totalPoints}`;
  }
  if (pairResult === 'three of a kind') {
    totalPoints += 40;
    return `Three of a kind. Earned 40 points in the round. Total points: ${totalPoints}`;
  }
  if (pairResult === 'four of a kind') {
    totalPoints += 80;
    return `Four of a kind. Earned 80 points in the round. Total points: ${totalPoints}`;
  }
  if (pairResult === 'full house') {
    totalPoints += 70;
    return `Full House. Earned 70 points in the round. Total points: ${totalPoints}`;
  }
  if (pairResult === 'five of a kind') {
    totalPoints += 100;
    return `Five of a kind. Earned 100 points in the round. Total points: ${totalPoints}`;
  }

  return `either no match or something went wrong.${resultMessage}`;
}

// deals the cards
function gameStarted(cards) {
  const dealtCardsArr = [];
  for (let i = 0; i < 5; i += 1) {
    const dealtCard = cards.pop();
    dealtCardsArr.push(dealtCard);
  }
  return dealtCardsArr;
}

function removeCard(cardId) {
  const selectedCard = document.getElementById(cardId);
  selectedCard.remove();
}

function displayCards(cardsArr) {
  const parentDiv = document.getElementById('display-cards');
  for (let i = 0; i < cardsArr.length; i += 1) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', i);
    card.innerText = `${cardsArr[i].rank}  ${cardsArr[i].suit}`;
    parentDiv.appendChild(card);

    card.addEventListener('click', () => {
      removeCard(i);
      // get a new card for replacement.
      const newDealtCard = deck.pop();
      cardsArr.splice(i, 1, newDealtCard);

      setTimeout(() => {
        parentDiv.innerHTML = '';
        displayCards(cardsArr);
      }, 3000);
    });
  }
  const finalScore = calcHandScore(cardsArr);
  console.log(`final score: ${finalScore}`);

  resultText = finalScore;

  return cardsArr;
}

// click the button to start the game.
const startBtn = document.createElement('button');
startBtn.innerText = 'Play';
startBtn.setAttribute('id', 'play-btn');
document.body.appendChild(startBtn);
startBtn.addEventListener('click', () => {
  // cards are dealt to the player.
  const fiveDealtcards = gameStarted(deck);

  // ****example hand code starts
  // const playerHand = [
  //   { rank: 7, suit: 'hearts', name: '7' },
  //   { rank: 8, suit: 'hearts', name: '8' },
  //   { rank: 6, suit: 'hearts', name: '9' },
  //   { rank: 5, suit: 'hearts', name: '10' },
  //   { rank: 2, suit: 'spades', name: 'jack' },
  // ];
  // displayCards(playerHand);
  // ****example hand code ends.

  // diplay the cards to the players.
  displayCards(fiveDealtcards);
});

// reset the game
const resetBtn = document.createElement('button');
resetBtn.innerText = 'Reset';
resetBtn.setAttribute('id', 'reset-btn');
document.body.appendChild(resetBtn);
resetBtn.addEventListener('click', () => {
  window.location.reload();
});

const result = viewResult();

result.addEventListener('click', () => {
  const resultDiv = document.createElement('p');
  resultDiv.innerText = resultText;
  document.body.appendChild(resultDiv);
});
