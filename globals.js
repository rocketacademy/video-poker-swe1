/* ========================================================== */
/* ======================= GLOBALS ========================= */
/* ========================================================== */

// this is where we will store all the 5 cards displayed
let displayCardsArr = [];

// this is our deck of cards used for each game
let deckOfCards = [];

// game state (not super useful now but may be in the future)
const INTRO_GAME_STATE = 'INTRO_GAME_STATE';
const BET_GAME_STATE = 'BET_GAME_STATE';
const PLAY_GAME_STATE = 'PLAY_GAME_STATE';
const NEXT_GAME_STATE = 'NEXT_GAME_STATE';
let GAME_STATE = INTRO_GAME_STATE;

// this array holds the coordinates of which cards were clicked
// we use this array to determin if we should hold or switch cards
let holdCardsClickCounter = [];

// total credits
let totalCredits = 100;

// bet amount
let betAmount = 0;

// bonus amount from jacks or better
let bonusMultiplyer = 0;

// background music
let turnOnBackgrounMusic = false;

// Point system
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
