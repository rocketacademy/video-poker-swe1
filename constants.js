// The variables declared in this file are used in the main script.js file.
/* eslint-disable no-unused-vars */

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
 * Straight: Five consecutive cards of mixed suits;
 *  for example, 2 of diamonds, 3 of hearts, 4 of diamonds, 5 of clubs, 6 of spades.
 * Three of a kind: Three cards of the same rank;
 * for example, 6 of hearts, 6 of clubs, 6 of diamonds.
 * Two pair: Two cards of one rank, two cards of another rank;
 *  for example, ace of spades, ace of hearts, 7 of clubs, 7 of diamonds.
 * Pair of jacks or better: Two jacks, queens, kings, or aces.
 */
const PairOfJacksBetterRank = 0;
const TwoPairRank = 1;
const ThreeOfKindRank = 2;
const StraightRank = 3;
const FlushRank = 4;
const FullHouseRank = 5;
const FourOfKindRank = 6;
const StraightFlushRank = 7;
const RoyalFlushRank = 8;

const GameTypeList = [PairOfJacksBetterRank,
  TwoPairRank,
  ThreeOfKindRank,
  StraightRank,
  FlushRank,
  FullHouseRank,
  FourOfKindRank,
  StraightFlushRank,
  RoyalFlushRank];

const PayTableObjects = [
  {
    gameName: 'Pair of Jacks or Better',
    gameRank: PairOfJacksBetterRank,
    gameCredit: 5,
    gameDesc: 'Two jacks, queens, kings, or aces.',
  },

  {
    gameName: 'Two pair',
    gameRank: TwoPairRank,
    gameCredit: 10,
    gameDesc: 'Two cards of one rank, two cards of another rank; for example, ace of spades, ace of hearts, 7 of clubs, 7 of diamonds.',
  },

  {
    gameName: 'Three of a kind',
    gameRank: ThreeOfKindRank,
    gameCredit: 20,
    gameDesc: 'Three cards of the same rank; for example, 6 of hearts, 6 of clubs, 6 of diamonds.',
  },

  {
    gameName: 'Straight',
    gameRank: StraightRank,
    gameCredit: 40,
    gameDesc: 'Five consecutive cards of mixed suits; for example, 2 of diamonds, 3 of hearts, 4 of diamonds, 5 of clubs, 6 of spades.',
  },

  {
    gameName: 'Flush',
    gameRank: FlushRank,
    gameCredit: 50,
    gameDesc: 'Five cards of the same suit; for example, ace, 10, 7, 4, 3, all of diamonds.',
  },

  {
    gameName: 'Full house',
    gameRank: FullHouseRank,
    gameCredit: 100,
    gameDesc: 'Three cards of one rank, two cards of another rank; for example, 3 of diamonds, 3 of hearts, 3 of spades, 6 of hearts, 6 of spades.',
  },

  {
    gameName: 'Four of a kind',
    gameRank: FourOfKindRank,
    gameCredit: 200,
    gameDesc: 'Four cards of the same rank; for example, ace of hearts, ace of spades, ace of clubs, ace of diamonds.',
  },

  {
    gameName: 'Straight flush',
    gameRank: StraightFlushRank,
    gameCredit: 300,
    gameDesc: 'Five consecutive cards of the same suit; for example, 2-3-4-5-6, all of clubs.',
  },

  {
    gameName: 'Royal flush',
    gameRank: RoyalFlushRank,
    gameCredit: 500,
    gameDesc: 'Ace-king-queen-jack-10 all of the same suit (hearts, clubs, spades, or diamonds)',
  },
];

const HEARTS_CARD_DESC = 'hearts';
const HEARTS_CARD_SYMBOL = '♥';
const CLUBS_CARD_DESC = 'clubs';
const CLUBS_CARD_SYMBOL = '♣';
const DIAMONDS_CARD_DESC = 'diamonds';
const DIAMONDS_CARD_SYMBOL = '♦';
const SPADES_CARD_DESC = 'spades';
const SPADES_CARD_SYMBOL = '♠';
const COLOR_RED = 'red';
const COLOR_BLACK = 'black';

// Array to store the details of the card like Suit, Symbol and Color for respective suit
const SuitsInfo = [
  [HEARTS_CARD_DESC, HEARTS_CARD_SYMBOL, COLOR_RED],
  [DIAMONDS_CARD_DESC, DIAMONDS_CARD_SYMBOL, COLOR_RED],
  [CLUBS_CARD_DESC, CLUBS_CARD_SYMBOL, COLOR_BLACK],
  [SPADES_CARD_DESC, SPADES_CARD_SYMBOL, COLOR_BLACK]];

const CardRankToImagePath = [
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 1,
    cardImagePath: 'Images\\ace-hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 2,
    cardImagePath: 'Images\\2-hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 3,
    cardImagePath: 'Images\\3-hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 4,
    cardImagePath: 'Images\\4-hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 5,
    cardImagePath: 'Images\\5-hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 6,
    cardImagePath: 'Images\\6-Hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 7,
    cardImagePath: 'Images\\7-hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 8,
    cardImagePath: 'Images\\8-Hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 9,
    cardImagePath: 'Images\\9-Hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 10,
    cardImagePath: 'Images\\10-Hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 11,
    cardImagePath: 'Images\\Jack-Hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 12,
    cardImagePath: 'Images\\Q-Hearts.png',
  },
  {
    cardSymbol: HEARTS_CARD_SYMBOL,
    cardRank: 13,
    cardImagePath: 'Images\\K-Hearts.png',
  },
  // Diamonds
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 1,
    cardImagePath: 'Images\\Ace-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 2,
    cardImagePath: 'Images\\2-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 3,
    cardImagePath: 'Images\\3-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 4,
    cardImagePath: 'Images\\4-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 5,
    cardImagePath: 'Images\\5-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 6,
    cardImagePath: 'Images\\6-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 7,
    cardImagePath: 'Images\\7-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 8,
    cardImagePath: 'Images\\8-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 9,
    cardImagePath: 'Images\\9-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 10,
    cardImagePath: 'Images\\10-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 11,
    cardImagePath: 'Images\\Jack-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 12,
    cardImagePath: 'Images\\Q-Dia.png',
  },
  {
    cardSymbol: DIAMONDS_CARD_SYMBOL,
    cardRank: 13,
    cardImagePath: 'Images\\K-dia.png',
  },
  // Clubs
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 1,
    cardImagePath: 'Images\\ace-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 2,
    cardImagePath: 'Images\\2-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 3,
    cardImagePath: 'Images\\3-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 4,
    cardImagePath: 'Images\\4-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 5,
    cardImagePath: 'Images\\5-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 6,
    cardImagePath: 'Images\\6-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 7,
    cardImagePath: 'Images\\7-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 8,
    cardImagePath: 'Images\\8-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 9,
    cardImagePath: 'Images\\9-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 10,
    cardImagePath: 'Images\\10-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 11,
    cardImagePath: 'Images\\Jack-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 12,
    cardImagePath: 'Images\\Q-club.png',
  },
  {
    cardSymbol: CLUBS_CARD_SYMBOL,
    cardRank: 13,
    cardImagePath: 'Images\\K-club.png',
  },
  // Spades
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 1,
    cardImagePath: 'Images\\A-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 2,
    cardImagePath: 'Images\\2-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 3,
    cardImagePath: 'Images\\3-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 4,
    cardImagePath: 'Images\\4-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 5,
    cardImagePath: 'Images\\5-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 6,
    cardImagePath: 'Images\\6-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 7,
    cardImagePath: 'Images\\7-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 8,
    cardImagePath: 'Images\\8-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 9,
    cardImagePath: 'Images\\9-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 10,
    cardImagePath: 'Images\\10-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 11,
    cardImagePath: 'Images\\Jack-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 12,
    cardImagePath: 'Images\\Q-Spade.png',
  },
  {
    cardSymbol: SPADES_CARD_SYMBOL,
    cardRank: 13,
    cardImagePath: 'Images\\K-Spade.png',
  },
];
