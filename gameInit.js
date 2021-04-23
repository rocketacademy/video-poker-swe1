/* ========================================================== */
/* ================== GAME INIT FUNCTIONS =================== */
/* ========================================================== */

const buildGame = () => {
  // music
  createBackgroudMusic();

  /* ============== SCORE INFO ============== */
  // set credit
  adjustTotalCredits(100);
  // create scoreTable
  createScoreTable();

  /* ============== CARD INFO ============== */
  // set up for 5 back faced cards
  for (let i = 0; i < 5; i += 1) {
    // create individual card container
    const singleCardContainer = document.createElement('div');
    singleCardContainer.classList.add('card');
    backCardContainer.appendChild(singleCardContainer);

    // set the initial display of the card container
    createBackOfCard(singleCardContainer);
  }
};

const gameInit = () => {
  /* ================================ */
  /* ======== IF FIRST GAME ======== */
  /* ================================ */

  if (GAME_STATE === INTRO_GAME_STATE) {
    /* ------------- GREETING -------------*/

    // disable clicking of bet and deal buttons
    betOneButton.disabled = true;
    betMaxButton.disabled = true;
    dealButton.disabled = true;

    // create Greeting
    const startGameButton = createGreeting();

    // start game button
    startGameButton.addEventListener('click', () => {
      console.log('clicked start game!');
      // play button audio
      playStartBtnSound();
      // remove greeting
      document.querySelector('.greetings-container').remove();
      // update game state
      GAME_STATE = BET_GAME_STATE;
      // initialize game
      buildGame();
      // message
      createMessage('PLACE YOUR BET!');
      // enable clicking of bet and button
      betOneButton.disabled = false;
      betMaxButton.disabled = false;
    });

    /* ------------- EVENT LISTENERS -------------*/

    // deal button listener
    dealButton.addEventListener('click', () => {
      console.log('clicked deal btn!');
      // play button audio
      playDealBtSound();
      if (GAME_STATE === BET_GAME_STATE) {
        // disable betting buttons
        betOneButton.disabled = true;
        betMaxButton.disabled = true;

        /* ------ FIRST CLICK -------*/
        // // deal cards
        dealCards();
        /*----- Test code to put in your own cards ---*/
        // TESTdealCards();

        // message
        createMessage('LOOKS PRETTY GOOD, CLICK ON THE CARDS YOU WANT TO HOLD');

        // update game state
        GAME_STATE = PLAY_GAME_STATE;
        // wait for player to choose which to hold
      } else if (GAME_STATE === PLAY_GAME_STATE) {
        /* ------ SECOND CLICK -------*/
        // hold or switch logic
        holdOrSwitchCards();

        // check if any of the winning conditions are met.
        // A message will be shown after this function runs
        calcHandScore();

        // enable betting buttons
        betOneButton.disabled = false;
        betMaxButton.disabled = false;

        // disable deal button
        dealButton.disabled = true;

        // disable clicking on cards
        disableClickingOnCard();

        // update game state
        GAME_STATE = NEXT_GAME_STATE;
      }
      // third click on deal is same as first
    });

    // bet one button listener
    betOneButton.addEventListener('click', () => {
      console.log('clicked bet one btn!');
      // play button audio
      playBetBtSound();
      if (GAME_STATE === NEXT_GAME_STATE) {
        resetGame();
      }
      // display & adjust bet amount
      displayAndAdjustBet('betOne');

      //enable clicking of deal button
      dealButton.disabled = false;
    });

    // bet max button listener
    betMaxButton.addEventListener('click', () => {
      // play button audio
      playBetBtSound();
      console.log('clicked bet max btn!');
      if (GAME_STATE === NEXT_GAME_STATE) {
        resetGame();
      }
      // display bet amount
      displayAndAdjustBet('betMax');

      //enable clicking of deal button
      dealButton.disabled = false;
    });
  } else {
    /* ================================ */
    /* ====== IF SUBSEQUENT GAME ====== */
    /* ================================ */
    // Re-initialize game
    buildGame();
  }
};

const resetGame = () => {
  // reset certain globals
  // e.g. DONT CHANGE variable totalCredits

  console.log('RESETTING!');
  displayCardsArr = [];
  deckOfCards = [];
  holdCardsClickCounter = [];
  betAmount = 0;
  bonusMultiplyer = 0;

  // clear extra css classes
  displayAndAdjustBet('reset');
  // empty cards container
  frontCardContainer.innerHTML = '';

  // update game state
  GAME_STATE = BET_GAME_STATE;

  // enable deal button
  dealButton.disabled = false;
};

/* ================================================ */
/* ================== INIT ======================= */
/* ================================================ */
gameInit();
