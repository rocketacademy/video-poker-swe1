/* ==========================================================
=================== GAME INIT FUNCTIONS ======================
=========================================================== */

/* Build UI for scoreboard and cards
 */
const buildGame = () => {
  // music
  createBackgroudMusic();

  /* ============== SCORE INFO ============== */
  // set player credit to full
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

/* Initialize the game:
 * Create event listeners for the buttons
 * Structure the flow of the game
 */
const gameInit = () => {
  /* ------------- GREETING -------------*/

  // Disable clicking of bet and deal buttons
  betOneButton.disabled = true;
  betMaxButton.disabled = true;
  dealButton.disabled = true;

  // Create Greeting
  const startGameButton = createGreeting();

  /* ------------- EVENT LISTENERS -------------*/

  // Event listener for start game button
  startGameButton.addEventListener('click', () => {
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

  // deal button listener
  dealButton.addEventListener('click', () => {
    // play button audio
    playDealBtSound();
    if (GAME_STATE === BET_GAME_STATE) {
      // disable betting buttons
      betOneButton.disabled = true;
      betMaxButton.disabled = true;

      /* ------ FIRST CLICK -------*/

      // make deck of cards
      deckOfCards = shuffleCards(makeDeck());

      /* TESTdealcards is a test function for us to use our own predetermined set of cards
       * If you are done testing comment out TESTdealCards()
       * and uncomment dealCards()
       */
      dealCards();
      // TESTdealCards();

      // display cards in DOM
      displayCards();

      // message
      createMessage('LOOKS PRETTY GOOD, CLICK ON THE CARDS YOU WANT TO HOLD');

      // update game state
      GAME_STATE = PLAY_GAME_STATE;
      // wait for player to choose which to hold
    } else if (GAME_STATE === PLAY_GAME_STATE) {
      /* ------ SECOND CLICK -------*/
      // hold or switch logic
      holdOrSwitchCards();

      // display cards in DOM
      displayCards();

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

  // Event listener for bet one button
  betOneButton.addEventListener('click', () => {
    // play button audio
    playBetBtSound();

    // reset game if player is not playing this for the first time
    if (GAME_STATE === NEXT_GAME_STATE) {
      resetGame();
    }
    // display & adjust bet amount
    displayAndAdjustBet('betOne');

    //enable clicking of deal button
    dealButton.disabled = false;
  });

  // Event listener for bet max button
  betMaxButton.addEventListener('click', () => {
    // play button audio
    playBetBtSound();
    if (GAME_STATE === NEXT_GAME_STATE) {
      resetGame();
    }
    // display bet amount
    displayAndAdjustBet('betMax');

    //enable clicking of deal button
    dealButton.disabled = false;
  });
};

/* Reset the game:
 * Reset/retain variables that are needed for a new game
 */
const resetGame = () => {
  // reset certain globals
  // e.g. DONT CHANGE variable totalCredits
  displayCardsArr = [];
  deckOfCards = [];
  holdCardsArr = [false, false, false, false, false];
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

/* ==========================================================
============= INITIALIZE GAME ON PAGE LOAD ==================
=========================================================== */
gameInit();
