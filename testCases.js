// Test Cases - To be further refined for any other bugs

// // Five of Kind
// const simulatedHand = [
// { name: 2, suit: 'diamond', rank: 2 },
// { name: 2, suit: 'heart', rank: 2 },
// { name: 2, suit: 'spade', rank: 2 },
// { name: 2, suit: 'club', rank: 2 },
// { name: 'Joker', suit: 'Joker', rank: 0 },
// { name: 2, suit: 'diamond', rank: 2 },
// { name: 2, suit: 'heart', rank: 2 },
// { name: 2, suit: 'spade', rank: 2 },
// { name: 2, suit: 'club', rank: 2 },
// { name: 'Joker', suit: 'Joker', rank: 0 },
// ];

// Four of a kind
// const simulatedHand = [
//   { name: 2, suit: 'diamond', rank: 2 },
//   { name: 2, suit: 'heart', rank: 2 },
//   { name: 2, suit: 'spade', rank: 2 },
//   { name: 2, suit: 'club', rank: 2 },
//   { name: 3, suit: 'club', rank: 3 },
// ];

// // Three of a kind
// const playerHand = [
//   { name: 2, suit: 'diamond', rank: 2 },
//   { name: 10, suit: 'heart', rank: 10 },
//   { name: 2, suit: 'spade', rank: 2 },
//   { name: 2, suit: 'club', rank: 2 },
//   { name: 3, suit: 'club', rank: 3 },
// ];

// // Full House [Triple 2 and Pair Kings]
// const playerHand = [
//   { name: 2, suit: 'heart', rank: 2 },
//   { name: 'King', suit: 'spade', rank: 13 },
//   { name: 2, suit: 'spade', rank: 2 },
//   { name: 'King', suit: 'club', rank: 13 },
//   { name: 2, suit: 'diamond', rank: 2 },
// ];

// // Two Pairs
// const playerHand = [
//   { name: 9, suit: 'heart', rank: 9 },
//   { name: 2, suit: 'heart', rank: 2 },
//   { name: 'Ace', suit: 'club', rank: 1 },
//   { name: 9, suit: 'club', rank: 9 },
//   { name: 2, suit: 'diamond', rank: 2 },
// ];

// // // Pair of Jacks or Better
// const simulatedHand = [
//   { name: 7, suit: 'club', rank: 7 },
//   { name: 'Jack', suit: 'spade', rank: 11 },
//   { name: 'Ace', suit: 'club', rank: 1 },
//   { name: 'Jack', suit: 'diamond', rank: 11 },
//   { name: 2, suit: 'diamond', rank: 2 },
// ];

// // Pair of Aces
// const simulatedHand = [
//   { name: 'Ace', suit: 'club', rank: 1 },
//   { name: 'Jack', suit: 'spade', rank: 11 },
//   { name: 2, suit: 'diamond', rank: 2 },
//   { name: 7, suit: 'club', rank: 7 },
//   { name: 'Ace', suit: 'spade', rank: 1 },
// ];

// // Normal Straight Hand
// const simulatedHand = [
//   { name: 9, suit: 'diamond', rank: 9 },
//   { name: 8, suit: 'diamond', rank: 8 },
//   { name: 'Jack', suit: 'spade', rank: 11 },
//   { name: 7, suit: 'diamond', rank: 7 },
//   { name: 10, suit: 'diamond', rank: 10 },
// ];

// // Ace-High Straight Hand
// const playerHand = [
//   { name: 'Queen', suit: 'spade', rank: 12 },
//   { name: 10, suit: 'diamond', rank: 10 },
//   { name: 'Jack', suit: 'diamond', rank: 11 },
//   { name: 'King', suit: 'heart', rank: 13 },
//   { name: 'Ace', suit: 'club', rank: 1 },
// ];

// // Fail Ace-High Straight Hand (to counter-test against K,4,3,2,A)
// Result should be 'No winning hand'
// const simulatedHand = [
//   { name: 2, suit: 'spade', rank: 2 },
//   { name: 4, suit: 'diamond', rank: 4 },
//   { name: 3, suit: 'diamond', rank: 3 },
//   { name: 'King', suit: 'heart', rank: 13 },
//   { name: 'Ace', suit: 'club', rank: 1 },
// ];

// // Flush Hand
// Result of isFlush is true;
// const playerHand = [
//   { name: 'Queen', suit: 'diamond', rank: 12 },
//   { name: 10, suit: 'diamond', rank: 10 },
//   { name: 'Jack', suit: 'diamond', rank: 11 },
//   { name: 'King', suit: 'diamond', rank: 13 },
//   { name: 'Ace', suit: 'diamond', rank: 1 },
// ];

// // Failed Flush Hand
// // Result of isFlush is false;
// const playerHand = [
//   { name: 'Queen', suit: 'diamond', rank: 12 },
//   { name: 10, suit: 'diamond', rank: 10 },
//   { name: 'Jack', suit: 'diamond', rank: 11 },
//   { name: 'King', suit: 'spades', rank: 13 },
//   { name: 'Ace', suit: 'diamond', rank: 1 },
// ];

// Normal Straight Flush Hand
// Result of isFlush is true and isStraight is true
// const simulatedHand = [
//   { name: 2, suit: 'diamond', rank: 2 },
//   { name: 2, suit: 'heart', rank: 2 },
//   { name: 2, suit: 'spade', rank: 2 },
//   { name: 2, suit: 'club', rank: 2 },
//   { name: 3, suit: 'club', rank: 3 },
// ];
