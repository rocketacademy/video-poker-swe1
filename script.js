// 1 player plays
// start the game with 100 points.
// on "play" => 5 cards will be dealt.
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
const btnContainer = document.getElementById('btn-container');
const rulesDiv = document.getElementById('rules');
const casinoAudio = new Audio('audios/cardPlace2.wav');
const newCardAudio = new Audio('audios/cardPlace1.wav');
const resultAudio = new Audio('audios/result.mp3');
let canClick = true;
let canClickResult = true;

// creates result button on the screen.
function viewResult() {
  const resultBtn = document.createElement('button');
  resultBtn.innerText = 'Result';
  resultBtn.setAttribute('id', 'result-btn');
  btnContainer.appendChild(resultBtn);
  return resultBtn;
}

// takes arr of cards object as input and returns array containg only card rank.
function playerCardsRankArr(drawnCardsArr) {
  const ranksOnlyArr = [];
  for (let i = 0; i < drawnCardsArr.length; i += 1) {
    const card = drawnCardsArr[i].rank;
    ranksOnlyArr.push(card);
  }
  return ranksOnlyArr;
}

// takes arr of cards object as input and returns array containg only card suit.
function playerCardsSuitArr(drawnCardsArr) {
  const suitsOnlyArr = [];
  for (let i = 0; i < drawnCardsArr.length; i += 1) {
    const card = drawnCardsArr[i].suit;
    suitsOnlyArr.push(card);
  }
  console.log(`cardRanks: ${suitsOnlyArr}`);
  return suitsOnlyArr;
}

// takes array of card suits as input. checks for suits and returns consition for flush.
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

// takes array of card's rank and returns condition for straight.
function checkForStraight(cards) {
  const smallest = Math.min(...cards);
  const largest = Math.max(...cards);
  let sum = 0;

  for (let i = 0; i < cards.length; i += 1) {
    sum += cards[i];
  }
  // if (smallest === 6 && largest === 10 && sum === 40) {
  //   return 'straight';
  // }

  const checkSum = (smallest) * 5 + 10;
  if (sum === checkSum && (largest - smallest === 4)) {
    return 'straight';
  }
}

// takes array of cards object as input. returns condition for straight flush.
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

// takes array of cards object. returns an object of key(i.e rank): num of repeats.
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

// takes object of {key:repeats}. returns match condition for pair, two pairs, 3,4 & 5 of a kind.
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

// takes player's cards object  array and returns the winning combination if any.
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
  // const resultMessage = `Total points: ${totalPoints}`;
  const resultMessage = ' points earned in the round. Total points: ';

  if (matchedNum === 'straight') {
    totalPoints += 50;
    return `Straight. 50 ${resultMessage} ${totalPoints}`;
  }
  if (straightFlush === 'straight flush') {
    totalPoints += 90;
    return `Straight flush. 90 ${resultMessage} ${totalPoints}`;
  }
  if (matchedNum === 'flush') {
    totalPoints += 60;
    return `Flush. 60 ${resultMessage} ${totalPoints}`;
  }

  if (pairResult === 'no match found') {
    totalPoints -= 10;
    return `No match found. Lost 10 point in the round.Total points: ${totalPoints}`;
  }
  if (pairResult === 'pair') {
    totalPoints += 20;
    return `Pair. 20 ${resultMessage} ${totalPoints}`;
  }
  if (pairResult === 'two pairs') {
    totalPoints += 30;
    return `Two Pairs. 30 ${resultMessage} ${totalPoints}`;
  }
  if (pairResult === 'three of a kind') {
    totalPoints += 40;
    return `Three of a kind. 40 ${resultMessage} ${totalPoints}`;
  }
  if (pairResult === 'four of a kind') {
    totalPoints += 80;
    return `Four of a kind. 80 ${resultMessage} ${totalPoints}`;
  }
  if (pairResult === 'full house') {
    totalPoints += 70;
    return `Full House. 70 ${resultMessage} ${totalPoints}`;
  }
  if (pairResult === 'five of a kind') {
    totalPoints += 100;
    return `Five of a kind. 100 ${resultMessage} ${totalPoints}`;
  }

  return 'either no match or something went wrong.';
}

// takes entire deck of shuffled cards. returns array of 5 deals cards.
function gameStarted(cards) {
  const dealtCardsArr = [];
  for (let i = 0; i < 5; i += 1) {
    const dealtCard = cards.pop();
    dealtCardsArr.push(dealtCard);
  }
  return dealtCardsArr;
}

// takes card id of users input (to remove card). function removes the card.
function removeCard(cardId) {
  const selectedCard = document.getElementById(cardId);
  selectedCard.remove();
}

// takes cards array. function replaces the user's removed card and displays the final set of cards.
function displayCards(cardsArr) {
  const parentDiv = document.getElementById('display-cards');
  for (let i = 0; i < cardsArr.length; i += 1) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', i);
    // card.innerText = `${cardsArr[i].rank}  ${cardsArr[i].suit}`;

    const cardRank = document.createElement('div');
    cardRank.innerText = cardsArr[i].rank;
    card.appendChild(cardRank);

    const cardSuit = document.createElement('div');
    cardSuit.innerText = cardsArr[i].suit;
    card.appendChild(cardSuit);

    parentDiv.appendChild(card);

    card.addEventListener('click', () => {
      removeCard(i);
      // get a new card for replacement.
      const newDealtCard = deck.pop();
      cardsArr.splice(i, 1, newDealtCard);
      setTimeout(() => {
        // newCardAudio.play();
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

// click the play button to start the game.
const startBtn = document.createElement('button');
startBtn.innerText = 'Play';
startBtn.setAttribute('id', 'play-btn');
btnContainer.appendChild(startBtn);

startBtn.addEventListener('click', () => {
  rulesDiv.remove();
  casinoAudio.play();
  // cards are dealt to the player.
  const fiveDealtcards = gameStarted(deck);

  // **** example hardcoded for testing purposes starts here ****
  // const playerHand = [
  //   { rank: 10, suit: 'hearts', name: '7' },
  //   { rank: 9, suit: 'hearts', name: '8' },
  //   { rank: 8, suit: 'hearts', name: '9' },
  //   { rank: 7, suit: 'hearts', name: '10' },
  //   { rank: 6, suit: 'spades', name: 'jack' },
  // ];
  // displayCards(playerHand);
  // **** example hardcoded for testing ends here. *****

  // diplay the cards to the players.
  if (canClick) {
    displayCards(fiveDealtcards);
    canClick = false;
  }
});

// create button to reset the game
const resetBtn = document.createElement('button');
resetBtn.innerText = 'Reset';
resetBtn.setAttribute('id', 'reset-btn');
btnContainer.appendChild(resetBtn);
resetBtn.addEventListener('click', () => {
  window.location.reload();
});

const result = viewResult();

result.addEventListener('click', () => {
  if (canClickResult === true) {
    resultAudio.play();
    const resultDiv = document.createElement('div');
    resultDiv.innerText = resultText;
    const resultContainer = document.getElementById('result-container');
    resultContainer.appendChild(resultDiv);
    canClickResult = false;
  }
  else {
    alert('\'Reset\' the game to play again');
  }
});
