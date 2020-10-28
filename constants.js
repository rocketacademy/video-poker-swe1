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
const PAY_TABLE_ARRAY = [
  ['Royal flush', 'Ace-king-queen-jack-10 all of the same suit (hearts, clubs, spades, or diamonds)'],
  ['Straight flush', 'Five consecutive cards of the same suit; for example, 2-3-4-5-6, all of clubs.'],
  ['Four of a kind', 'Four cards of the same rank; for example, ace of hearts, ace of spades, ace of clubs, ace of diamonds.'],
  ['Full house', 'Three cards of one rank, two cards of another rank; for example, 3 of diamonds, 3 of hearts, 3 of spades, 6 of hearts, 6 of spades.'],
  ['Flush', 'Five cards of the same suit; for example, ace, 10, 7, 4, 3, all of diamonds.'],
  ['Straight', 'Five consecutive cards of mixed suits; for example, 2 of diamonds, 3 of hearts, 4 of diamonds, 5 of clubs, 6 of spades.'],
  ['Three of a kind', 'Three cards of the same rank; for example, 6 of hearts, 6 of clubs, 6 of diamonds.'],
  ['Two pair', 'Two cards of one rank, two cards of another rank; for example, ace of spades, ace of hearts, 7 of clubs, 7 of diamonds.'],
  ['Pair of jacks or better', 'Two jacks, queens, kings, or aces.'],
];
