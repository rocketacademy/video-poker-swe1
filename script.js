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
  domSelector.dealCardButton.classList.remove("disable-click");
  domSelector.changeCardButton.classList.add("disable-click");
  domSelector.betButton.classList.add("disable-click");
});

//                    ********  TO DO ********

//  * ADD DISABLE-CLICK CLASS TO OTHER BUTTONS WHEN (LETSGOBUTTON IS CLICKED)

// * DONT FORGET TO REMOVE CLASS AFTER CKLICKING ON NEXT STEPS OF GAME PlAY

// * THINK ABOUT SOC ARCHITECTURE FOR ENTIRE PROJECT (FUCNTIONS FOR EVEVRY ACTIONS)
// * ADD THE BET FUNCTIONALITY

// * ADD THE SWAP FUNCTIONALITY

// * ADD/REMOVE POINTS AFTER EACH CALCULATIONS

// * CREATE AN ARRAY OF WINNING COMBINATIONS

// * FIND ANIMATION LIBRARY FOR UI
