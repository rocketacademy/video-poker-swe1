//deck of cards dealt
let cards;
//store the rank of the 5 cards held by the player
let playerCardsNo = [];
//store the suit of the 5 cards held by the player
let playerCardsSuit = [];
const playerScore = document.getElementsByClassName("player-credits")[0];

// assign html elements of each card to global variables to facilitate the ease of updating the details of each card
let card1Text;
let card2Text;
let card3Text;
let card4Text;
let card5Text;
const card1 = document.getElementsByClassName("card-1")[0];
const card2 = document.getElementsByClassName("card-2")[0];
const card3 = document.getElementsByClassName("card-3")[0];
const card4 = document.getElementsByClassName("card-4")[0];
const card5 = document.getElementsByClassName("card-5")[0];
const card1rank = document.getElementsByClassName("card-1p1")[0];
const card1suit = document.getElementsByClassName("card-1p2")[0];
const card1SuitCenter = document.getElementsByClassName("card-1p2")[1];
const card2rank = document.getElementsByClassName("card-2p1")[0];
const card2suit = document.getElementsByClassName("card-2p2")[0];
const card2SuitCenter = document.getElementsByClassName("card-2p2")[1];
const card3rank = document.getElementsByClassName("card-3p1")[0];
const card3suit = document.getElementsByClassName("card-3p2")[0];
const card3SuitCenter = document.getElementsByClassName("card-3p2")[1];
const card4rank = document.getElementsByClassName("card-4p1")[0];
const card4suit = document.getElementsByClassName("card-4p2")[0];
const card4SuitCenter = document.getElementsByClassName("card-4p2")[1];
const card5rank = document.getElementsByClassName("card-5p1")[0];
const card5suit = document.getElementsByClassName("card-5p2")[0];
const card5SuitCenter = document.getElementsByClassName("card-5p2")[1];

//counts the number of cards held for each rank
let rankCounter = {};
//counts the number of cards held for each suit
let suitCounter = {};
//array to check for consecutive numbers
let rankCounterKeysNo = [];
//amount won by player in the round
let creditWon = 0;
//accumulated credits held by player
let remainingCredit = 100;

// store the frequency of each rank
let rankCounterValues;
//store all distict ranks held
let rankCounterKeys;
// store the highest frequency of a rank being repeated
let highestRankFrequency;
let secondHighestRankFrequency;
//stores keys of rankCounter as integers
let rankCounterKeysNum;

let handWon;
