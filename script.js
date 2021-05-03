/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
// APP STARTS HERE

// // DEAL CARDS BUTTON ON GAME PAGE
// const dealCardButton = document.querySelector(".deal-button");

// dealCardButton.addEventListener("click", (e) => {
domSelector.dealCardButton.addEventListener('click', (e) => {
  domSelector.dealCardButton.classList.add('disable-click');
  domSelector.betButton.classList.remove('disable-click');
  domSelector.changeCardButton.classList.remove('disable-click');
  gameState.swap = 0;
  gameState.secondDeal = false;
  e.preventDefault();
  console.log('CLICKED DEAL BUTTON');
  // INITIALISING THE DECK OF CARDS
  gameState.deck = handleShuffleCards(handleCreateDeck());
  // console.log("THIS IS THE DECK ", gameState.deck);

  // CHECK IF USER ALREADY HAS 5 CARDS ON HAND
  // IF NOT, DEAL CARDS TO USER
  if (user.hand.length) {
    user.hand = [];
    console.log('this is player hand after clearing', user.hand);
  }

  handleDealCard(user.hand);
  handleDrawDom(user.hand);
});

// REMOVES GAME RULES AND SHOWS PLAYING SCREEN
domSelector.letsGoButton.addEventListener('click', () => {
  domSelector.betButton.classList.add('disable-click');
  domSelector.changeCardButton.classList.add('disable-click');
  handleEraseGameRules();
});

// EVENT TO CALCULATE CARD IN HAND
// also remove pointerEvents from other buttons
domSelector.betButton.addEventListener('click', () => {
  console.log('Bet button clicked');
  // toggle disable class to buttons
  domSelector.dealCardButton.classList.remove('disable-click');
  domSelector.changeCardButton.classList.add('disable-click');
  domSelector.betButton.classList.add('disable-click');
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
    // UPDATE POINTS
    domSelector.pointsBoxDiv.innerHTML = user.points += 50;
    // SHOW WINNING MESSAGE
    winMsg('50', 'Straight Flush');
  } else if (handleCheckFiveKind(user.hand)) {
    domSelector.pointsBoxDiv.innerHTML = user.points += 100;
    winMsg('100', 'Five of a Kind');
  } else if (handleCheckFourKind(user.hand)) {
    domSelector.pointsBoxDiv.innerHTML = user.points += 40;
    winMsg('40', 'Four of a Kind');
  } else if (handleCheckFullHouse(user.hand)) {
    domSelector.pointsBoxDiv.innerHTML = user.points += 35;
    winMsg('35', 'Full House');
  } else if (handleCheckFlush(user.hand)) {
    domSelector.pointsBoxDiv.innerHTML = user.points += 25;
    winMsg('25', 'Flush');
  } else if (handleCheckStraight(user.hand)) {
    domSelector.pointsBoxDiv.innerHTML = user.points += 20;
    winMsg('20', 'Straight');
  } else if (handleCheckThreeKind(user.hand)) {
    domSelector.pointsBoxDiv.innerHTML = user.points += 15;
    winMsg('15', 'Three of a Kind');
  } else if (handleCheckPairs(user.hand)) {
    winMsg('5', 'One Pair');
    domSelector.pointsBoxDiv.innerHTML = user.points += 5;
  } else {
    // No match
    loseMsg();
    domSelector.pointsBoxDiv.innerHTML = user.points -= 10;
  }
  if (user.points <= 0) {
    domSelector.dealCardButton.classList.add('disable-click');
    domSelector.changeCardButton.classList.add('disable-click');
    domSelector.betButton.classList.add('disable-click');
    gameOverMsg();
  }
});

// REMOVED THIS FOR NOW //
// // CHANGE CARD BUTTON
// domSelector.changeCardButton.addEventListener("click", () => {
//   // CHECK IF USER IS STILL ALLOWED TO SAWP (max 2x)

//   if (gameState.secondDeal === true) {
//     domSelector.changeCardButton.classList.add("disable-click");
//   }

//   gameState.deck = handleShuffleCards(handleCreateDeck());
//   if (user.hand.length) {
//     user.hand = [];
//     console.log("this is player hand after clearing", user.hand);
//   }
//   handleDealCard(user.hand);
//   handleDrawDom(user.hand);
//   gameState.swap += 1;
//   gameState.swap > 1
//     ? (gameState.secondDeal = true)
//     : (gameState.secondDeal = false);
// });

// ******** TO CONSIDER *********
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
