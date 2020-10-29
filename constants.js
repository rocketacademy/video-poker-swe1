// Texts to be displayed in the Draw/Deal button
const TXT_DRAW = 'Draw';
const TXT_DEAL = 'Deal';

// Texts to be displayed in the S
const TXT_SHOW_RESULT = 'Show Score Card';
const TXT_HIDE_RESULT = 'Hide Score Card';

// An index value to show invalid or out of array
const INVALID_INDEX = -1;

// Number of cards drawn on each Draw
const NUM_OF_CARDS_DRAWN = 5;
const INITIAL_CREDIT_PLAYER = 100;

const ACE_DISPLAY_NAME = 'A';
const JACK_DISPLAY_NAME = 'J';
const KING_DISPLAY_NAME = 'K';
const QUEEN_DISPLAY_NAME = 'Q';

// Array that holds the possible rank list of various card combination

/**
 * Rank of Poker hands:
 * Royal flush: Ace-king-queen-jack-10 all of the same suit (hearts, clubs, spades, or diamonds).
 * Straight flush: Five consecutive cards of the same suit; for example, 2-3-4-5-6, all of clubs.
 * Four of a kind: Four cards of the same rank;
 * for example, ace of hearts, ace of spades, ace of clubs, ace of diamonds.
 * Full house: Three cards of one rank, two cards of another rank;
 * for example, 3 of diamonds, 3 of hearts, 3 of spades, 6 of hearts, 6 of spades.
 * Flush: Five cards of the same suit; for example, ace, 10, 7, 4, 3, all of diamonds.
 *  * Straight: Five consecutive cards of mixed suits;
 *  for example, 2 of diamonds, 3 of hearts, 4 of diamonds, 5 of clubs, 6 of spades.
 * Three of a kind: Three cards of the same rank;
 * for example, 6 of hearts, 6 of clubs, 6 of diamonds.
 * Two pair: Two cards of one rank, two cards of another rank;
 *  for example, ace of spades, ace of hearts, 7 of clubs, 7 of diamonds.
 * Pair of jacks or better: Two jacks, queens, kings, or aces.
 */
// const PAY_TABLE_ARRAY = [
//   ['Pair of jacks or better', 'Two jacks, queens, kings, or aces.'],
//   ['Two pair', 'Two cards of one rank, two cards of another rank;
// for example, ace of spades, ace of hearts, 7 of clubs, 7 of diamonds.'],
//   ['Three of a kind', 'Three cards of the same rank;
// for example, 6 of hearts, 6 of clubs, 6 of diamonds.'],
//   ['Straight', 'Five consecutive cards of mixed suits;
// for example, 2 of diamonds, 3 of hearts, 4 of diamonds, 5 of clubs, 6 of spades.'],
//   ['Flush', 'Five cards of the same suit; for example, ace, 10, 7, 4, 3, all of diamonds.'],
//   ['Full house', 'Three cards of one rank, two cards of another rank;
// for example, 3 of diamonds, 3 of hearts, 3 of spades, 6 of hearts, 6 of spades.'],
//   ['Four of a kind', 'Four cards of the same rank;
// for example, ace of hearts, ace of spades, ace of clubs, ace of diamonds.'],
//   ['Straight flush', 'Five consecutive cards of the same suit;
// for example, 2-3-4-5-6, all of clubs.'],
//   ['Royal flush', 'Ace-king-queen-jack-10 all of the same suit
// (hearts, clubs, spades, or diamonds)'],
// ];

const Pay_Table_Objects = [
  {
    gameName: 'Pair of jacks or better',
    gameRank: 0,
    gameCredit: 5,
    gameDesc: 'Two jacks, queens, kings, or aces.',
  },

  {
    gameName: 'Two pair',
    gameRank: 1,
    gameCredit: 10,
    gameDesc: 'Two cards of one rank, two cards of another rank; for example, ace of spades, ace of hearts, 7 of clubs, 7 of diamonds.',
  },

  {
    gameName: 'Three of a kind',
    gameRank: 2,
    gameCredit: 20,
    gameDesc: 'Three cards of the same rank; for example, 6 of hearts, 6 of clubs, 6 of diamonds.',
  },

  {
    gameName: 'Straight',
    gameRank: 3,
    gameCredit: 40,
    gameDesc: 'Five consecutive cards of mixed suits; for example, 2 of diamonds, 3 of hearts, 4 of diamonds, 5 of clubs, 6 of spades.',
  },

  {
    gameName: 'Flush',
    gameRank: 4,
    gameCredit: 50,
    gameDesc: 'Five cards of the same suit; for example, ace, 10, 7, 4, 3, all of diamonds.',
  },

  {
    gameName: 'Full house',
    gameRank: 5,
    gameCredit: 100,
    gameDesc: 'Three cards of one rank, two cards of another rank; for example, 3 of diamonds, 3 of hearts, 3 of spades, 6 of hearts, 6 of spades.',
  },

  {
    gameName: 'Four of a kind',
    gameRank: 6,
    gameCredit: 200,
    gameDesc: 'Four cards of the same rank; for example, ace of hearts, ace of spades, ace of clubs, ace of diamonds.',
  },

  {
    gameName: 'Straight flush',
    gameRank: 7,
    gameCredit: 300,
    gameDesc: 'Five consecutive cards of the same suit; for example, 2-3-4-5-6, all of clubs.',
  },

  {
    gameName: 'Royal flush',
    gameRank: 8,
    gameCredit: 500,
    gameDesc: 'Ace-king-queen-jack-10 all of the same suit (hearts, clubs, spades, or diamonds)',
  },
];

// Test Arrays

// Pair of Jacks or Better
const TestArray1 = [];
TestArray1.push({
  name: 'king', display: 'K', suit: 'hearts', suitSymbol: '♥', rank: 13, color: 'red', hold: false,
});
TestArray1.push({
  name: 'queen', display: 'Q', suit: 'clubs', suitSymbol: '♣', rank: 12, color: 'black', hold: false,
});
TestArray1.push({
  name: 'jack', display: 'J', suit: 'clubs', suitSymbol: '♣', rank: 11, color: 'black', hold: false,
});
TestArray1.push({
  name: '9', display: '9', suit: 'diamonds', suitSymbol: '♦', rank: 9, color: 'red', hold: false,
});
TestArray1.push({
  name: '5', display: '5', suit: 'spades', suitSymbol: '♠', rank: 5, color: 'black', hold: false,
});

const TestArray2 = [];
TestArray2.push({
  name: '3', display: '3', suit: 'diamonds', suitSymbol: '♦', rank: 3, color: 'red', hold: false,
});
TestArray2.push({
  name: '7', display: '7', suit: 'diamonds', suitSymbol: '♦', rank: 7, color: 'red', hold: false,
});
TestArray2.push({
  name: '5', display: '5', suit: 'diamonds', suitSymbol: '♦', rank: 5, color: 'red', hold: false,
});
TestArray2.push({
  name: '2', display: '2', suit: 'diamonds', suitSymbol: '♦', rank: 2, color: 'red', hold: false,
});
TestArray2.push({
  name: '8', display: '8', suit: 'diamonds', suitSymbol: '♦', rank: 8, color: 'red', hold: false,
});

// for 3 of a kind
const TestArray3 = [];
TestArray3.push({
  name: '7', display: '7', suit: 'diamonds', suitSymbol: '♦', rank: 7, color: 'red', hold: false,
});
TestArray3.push({
  name: 'king', display: 'K', suit: 'clubs', suitSymbol: '♣', rank: 13, color: 'black', hold: false,
});
TestArray3.push({
  name: '10', display: '10', suit: 'hearts', suitSymbol: '♥', rank: 10, color: 'red', hold: false,
});
TestArray3.push({
  name: '7', display: '7', suit: 'spades', suitSymbol: '♠', rank: 7, color: 'black', hold: false,
});
TestArray3.push({
  name: '7', display: '7', suit: 'clubs', suitSymbol: '♣', rank: 7, color: 'black', hold: false,
});

// Four of a kind
const TestArray4 = [];
TestArray4.push({
  name: '7', display: '7', suit: 'diamonds', suitSymbol: '♦', rank: 7, color: 'red', hold: false,
});
TestArray4.push({
  name: '7', display: '7', suit: 'hearts', suitSymbol: '♥', rank: 7, color: 'red', hold: false,
});
TestArray4.push({
  name: '7', display: '7', suit: 'spades', suitSymbol: '♠', rank: 7, color: 'black', hold: false,
});
TestArray4.push({
  name: '7', display: '7', suit: 'clubs', suitSymbol: '♣', rank: 7, color: 'black', hold: false,
});
TestArray4.push({
  name: 'king', display: 'K', suit: 'clubs', suitSymbol: '♣', rank: 13, color: 'black', hold: false,
});

// Straight Flush
const TestArray5 = [];
TestArray5.push({
  name: 'king', display: 'K', suit: 'hearts', suitSymbol: '♥', rank: 13, color: 'red', hold: false,
});
TestArray5.push({
  name: 'queen', display: 'Q', suit: 'hearts', suitSymbol: '♥', rank: 12, color: 'red', hold: false,
});
TestArray5.push({
  name: 'jack', display: 'J', suit: 'hearts', suitSymbol: '♥', rank: 11, color: 'red', hold: false,
});
TestArray5.push({
  name: '10', display: '10', suit: 'hearts', suitSymbol: '♥', rank: 10, color: 'red', hold: false,
});
TestArray5.push({
  name: '9', display: '9', suit: 'hearts', suitSymbol: '♥', rank: 9, color: 'red', hold: false,
});

// Straight Flush
const TestArray6 = [];
TestArray6.push({
  name: '9', display: '9', suit: 'hearts', suitSymbol: '♥', rank: 9, color: 'red', hold: false,
});
TestArray6.push({
  name: '10', display: '10', suit: 'hearts', suitSymbol: '♥', rank: 10, color: 'red', hold: false,
});
TestArray6.push({
  name: 'jack', display: 'J', suit: 'hearts', suitSymbol: '♥', rank: 11, color: 'red', hold: false,
});
TestArray6.push({
  name: 'queen', display: 'Q', suit: 'hearts', suitSymbol: '♥', rank: 12, color: 'red', hold: false,
});
TestArray6.push({
  name: 'king', display: 'K', suit: 'hearts', suitSymbol: '♥', rank: 13, color: 'red', hold: false,
});

// Stratight Flush
const TestArray7 = [];
TestArray7.push({
  name: 'king', display: 'K', suit: 'hearts', suitSymbol: '♥', rank: 13, color: 'red', hold: false,
});
TestArray7.push({
  name: 'queen', display: 'Q', suit: 'hearts', suitSymbol: '♥', rank: 12, color: 'red', hold: false,
});
TestArray7.push({
  name: '10', display: '10', suit: 'hearts', suitSymbol: '♥', rank: 10, color: 'red', hold: false,
});
TestArray7.push({
  name: '9', display: '9', suit: 'hearts', suitSymbol: '♥', rank: 9, color: 'red', hold: false,
});
TestArray7.push({
  name: 'jack', display: 'J', suit: 'hearts', suitSymbol: '♥', rank: 11, color: 'red', hold: false,
});

// Royal Flush
const TestArray8 = [];
TestArray8.push({
  name: 'ace', display: 'A', suit: 'hearts', suitSymbol: '♥', rank: 1, color: 'red', hold: false,
});
TestArray8.push({
  name: 'king', display: 'K', suit: 'hearts', suitSymbol: '♥', rank: 13, color: 'red', hold: false,
});
TestArray8.push({
  name: 'queen', display: 'Q', suit: 'hearts', suitSymbol: '♥', rank: 12, color: 'red', hold: false,
});
TestArray8.push({
  name: 'jack', display: 'J', suit: 'hearts', suitSymbol: '♥', rank: 11, color: 'red', hold: false,
});
TestArray8.push({
  name: '10', display: '10', suit: 'hearts', suitSymbol: '♥', rank: 10, color: 'red', hold: false,
});
