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
