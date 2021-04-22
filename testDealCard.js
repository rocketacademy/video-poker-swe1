const deckOfFive = [];

const makeCard = (
  cardRank,
  displayRank,
  displaySuit,
  displaySymbol,
  displaycolor
) => {
  const hand = {
    name: 'name',
    rank: cardRank,
    display: displayRank,
    color: displaycolor,
    suit: displaySuit,
    suitSymbol: displaySymbol,
  };
  deckOfFive.push(hand);
};

// ['hearts', 'diamonds', 'clubs', 'spades']
// [('♥', '♦', '♣', '♠')]

const royalFlush = () => {
  makeCard(1, 'A', 'spades', '♠', 'black');
  makeCard(10, '10', 'spades', '♠', 'black');
  makeCard(11, 'J', 'spades', '♠', 'black');
  makeCard(12, 'Q', 'spades', '♠', 'black');
  makeCard(13, 'K', 'spades', '♠', 'black');
  return deckOfFive;
};

const straightFlush = () => {
  makeCard(4, '4', 'hearts', '♥', 'red');
  makeCard(5, '5', 'hearts', '♥', 'red');
  makeCard(6, '6', 'hearts', '♥', 'red');
  makeCard(7, '7', 'hearts', '♥', 'red');
  makeCard(8, '8', 'hearts', '♥', 'red');
  return deckOfFive;
};

const fourOfAKind = () => {
  makeCard(5, '5', 'diamonds', '♦', 'red');
  makeCard(5, '5', 'clubs', '♣', 'black');
  makeCard(5, '5', 'hearts', '♥', 'red');
  makeCard(5, '5', 'spades', '♠', 'black');
  makeCard(12, 'Q', 'hearts', '♥', 'red');
  return deckOfFive;
};

const fullHouse = () => {
  makeCard(3, '3', 'diamonds', '♦', 'red');
  makeCard(3, '3', 'clubs', '♣', 'black');
  makeCard(3, '3', 'hearts', '♥', 'red');
  makeCard(12, 'Q', 'spades', '♠', 'black');
  makeCard(12, 'Q', 'hearts', '♥', 'red');
  return deckOfFive;
};

const flush = () => {
  makeCard(11, 'J', 'diamonds', '♦', 'red');
  makeCard(6, '6', 'diamonds', '♦', 'red');
  makeCard(10, '10', 'diamonds', '♦', 'red');
  makeCard(8, '8', 'diamonds', '♦', 'red');
  makeCard(2, '2', 'diamonds', '♦', 'red');
  return deckOfFive;
};

const straight = () => {
  makeCard(4, '4', 'diamonds', '♦', 'red');
  makeCard(5, '5', 'clubs', '♣', 'black');
  makeCard(6, '6', 'diamonds', '♦', 'red');
  makeCard(7, '7', 'spades', '♠', 'black');
  makeCard(8, '8', 'hearts', '♥', 'red');
  return deckOfFive;
};

const threeOfAKind = () => {
  makeCard(7, '7', 'diamonds', '♦', 'red');
  makeCard(7, '7', 'clubs', '♣', 'black');
  makeCard(7, '7', 'hearts', '♥', 'red');
  makeCard(5, '5', 'spades', '♠', 'black');
  makeCard(12, 'Q', 'hearts', '♥', 'red');
  return deckOfFive;
};

const twoPair = () => {
  makeCard(7, '7', 'diamonds', '♦', 'red');
  makeCard(7, '7', 'clubs', '♣', 'black');
  makeCard(9, '9', 'hearts', '♥', 'red');
  makeCard(12, 'Q', 'spades', '♠', 'black');
  makeCard(12, 'Q', 'hearts', '♥', 'red');
  return deckOfFive;
};
