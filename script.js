// APP STARTS HERE

// // DEAL CARDS BUTTON ON GAME PAGE
// const dealCardButton = document.querySelector(".deal-button");

// dealCardButton.addEventListener("click", (e) => {
domSelector.dealCardButton.addEventListener("click", (e) => {
  domSelector.dealCardButton.classList.add("disable-click");
  domSelector.betButton.classList.remove("disable-click");
  domSelector.changeCardButton.classList.remove("disable-click");
  e.preventDefault();
  console.log("CLICKED DEAL BUTTON");
  // INITIALISING THE DECK OF CARDS
  gameState.deck = handleShuffleCards(handleCreateDeck());
  // console.log("THIS IS THE DECK ", gameState.deck);

  // CHECK IF USER ALREADY HAS 5 CARDS ON HAND
  if (user.hand.length) {
    user.hand = [];
    console.log("this is player hand after clearing", user.hand);
  }
  // IF NOT, DEAL CARDS TO USER
  // THIS SHOULD GO INTO HANDLEDEALCARDS
  // for (i = 0; i < 5; i += 1) {
  //   user.hand.push(gameState.deck[i]);
  // }
  // console.log("THIS IS PLAYER HAND AFTER DEALING", user.hand);

  handleDealCard(user.hand);
  handleDrawDom(user.hand);
});

// REMOVES GAME RULES AND SHOWS PLAYING SCREEN
domSelector.letsGoButton.addEventListener("click", () => {
  domSelector.betButton.classList.add("disable-click");
  domSelector.changeCardButton.classList.add("disable-click");
  handleEraseGameRules();
});

// EVENT TO CALCULATE CARD IN HAND
// also remove pointerEvents from other buttons
domSelector.betButton.addEventListener("click", () => {
  console.log("Bet button clicked");
  // toggle disable class to buttons
  domSelector.dealCardButton.classList.remove("disable-click");
  domSelector.changeCardButton.classList.add("disable-click");
  domSelector.betButton.classList.add("disable-click");
  console.log(handleCheckFiveKind(user.hand));

  //  TESTING HAND
  // const a = [
  //   { value: "J", suit: "b" },
  //   { value: "J", suit: "b" },
  //   { value: "J", suit: "b" },
  //   { value: 9, suit: "b" },
  //   { value: 10, suit: "b" },
  // ];

  if (handleCheckStraightFlush(user.hand)) {
    // if (handleCheckStraightFlush(a)) {
    // UPDATE POINTS
    // SHOW WINNING MESSAGE
    alert("YES, straight flush");
  } else if (handleCheckFiveKind(user.hand)) {
    alert("YES, five kind");
  } else if (handleCheckFourKind(user.hand)) {
    alert("YES, four kind");
  } else if (handleCheckFullHouse(user.hand)) {
    alert("YES, full house");
  } else if (handleCheckFlush(user.hand)) {
    alert("YES, flush");
  } else if (handleCheckStraight(user.hand)) {
    alert("YES, straight");
  } else if (handleCheckThreeKind(user.hand)) {
    alert("YES, three kind");
  } else if (handleCheckPairs(user.hand)) {
    alert("YES, pair");
  } else {
    // No match
    alert("Nope, no matches");
  }

  // RESHUFFLE AND CREATE NEW DECK

  // DEAL CARDS AGAIN
});

// ******** TO CONSIDER *********
// // CHANGE CARD BUTTON
// domSelector.changeCardButton.addEventListener("click", () => {
//   // CHECK IF USER IS STILL ALLOWED TO SAWP (max 2x)
//   // !gameState.secondDeal ? alert("Can SwaP") : (gameState.secondDeal = true);
//   // console.log("GAME STATE ==> ", gameState.secondDeal);
//   // if (gameState.secondDeal === false) {
//   //   gameState.secondDeal = true;
//   //   alert("Can swap");
//   // }

//   // GET ARRAY OF CARDS SELECTED
//   // GO AHEAD SWAP CARDS
//   // TOGGLE BUTTON CLASSES
//   // -if swap count at 2
//   if (gameState.secondDeal) {
//     console.log(gameState.secondDeal);
//     domSelector.dealCardButton.classList.add("disable-click");
//     domSelector.changeCardButton.classList.add("disable-click");
//     domSelector.betButton.classList.remove("disable-click");
//   }

//   // only testing function here
//   // if (handleCheckStraightFlush(user.hand)) {
//   //   // UPDATE POINTS
//   // } else {
//   //   alert("FALSE3");
//   // }
//   // RUN HANDLECEHCK FUNCTIONS AND ADD TO POUNTS IF RETURNS TRUE
// });

//                    ********  TO DO ********

// * THINK ABOUT SOC ARCHITECTURE FOR ENTIRE PROJECT (FUCNTIONS FOR EVEVRY ACTIONS)
// * ADD THE BET FUNCTIONALITY

// * ADD THE SWAP FUNCTIONALITY

// * ADD/REMOVE POINTS AFTER EACH CALCULATIONS

// * CREATE AN ARRAY OF WINNING COMBINATIONS

// * FIND ANIMATION LIBRARY FOR UI

// console.log(handleCheckStraightFlush(user.hand));
