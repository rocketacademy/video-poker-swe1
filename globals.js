/* ==========================================================
======================== GLOBALS ============================
=========================================================== */

// An array that contains the 5 cards shown in the DOM
let displayCardsArr = [];

// An array that contains the deck of cards used in each game
let deckOfCards = [];

// Variable that stores the state of the game
// game state (not super useful now but may be in the future)
const INTRO_GAME_STATE = 'INTRO_GAME_STATE';
const BET_GAME_STATE = 'BET_GAME_STATE';
const PLAY_GAME_STATE = 'PLAY_GAME_STATE';
const NEXT_GAME_STATE = 'NEXT_GAME_STATE';
let GAME_STATE = INTRO_GAME_STATE;

// we use this array to determin if we should hold or switch cards
// false means that we want to switch the cards
// the cards are set to false by default
let holdCardsArr = [false, false, false, false, false];

// Variable that stores the total game credits
let totalCredits = 100;

// Variable that stores the bet amount per game
let betAmount = 0;

// Variable that stores the bonus amount from jacks or better
let bonusMultiplyer = 0;

// Variable that stores checks if the background music should be on or off
let turnOnBackgrounMusic = false;

// An object that contains the point / score system of the game
const combiPoints = {
  royalFlush: [250, 500, 750, 1000, 4000],
  straightFlush: [50, 100, 150, 200, 250],
  fourOfAKind: [25, 50, 75, 100, 125],
  fullHouse: [9, 18, 27, 36, 45],
  flush: [6, 12, 18, 24, 30],
  straight: [4, 8, 12, 16, 20],
  threeOfAKind: [3, 6, 9, 12, 15],
  twoPair: [2, 4, 6, 8, 10],
  jacksOrBetter: [1, 2, 3, 4, 5],
};
