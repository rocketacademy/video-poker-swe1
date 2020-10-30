// ----check for pairs-------
const checkPairs = (card) => {
  console.log('checking for pairs...');

  let match = 0;
  let rankLargerThanTen = 0;
  let outcome = null;
  let handRankScore = 0;

  for (let i = 0; i < player.hand.length - 1; i += 1) {
    if (player.hand[i].rank === player.hand[i + 1].rank) {
      match += 1;
    }
    if (player.hand[i].rank > 10) {
      rankLargerThanTen += 1;
      handRankScore += player.hand[i].rank;
    }
  }

  if ((match === 1) && (rankLargerThanTen >= 2) && (handRankScore > 20)) {
    console.log('match is 1');
    outcome = 'jacksOrLarger';
  }
  // search for 2 pair or three-of-a-kind
  else if (match === 2) {
    // given 2 matches: Using the first card as a reference point,
    //  if the third card is the same, it must be a three of a kind
    for (let j = 0; j < player.hand.length - 2; j += 1) {
      if (player.hand[j].rank === player.hand[j + 2].rank) {
        outcome = 'threeOfAKind';
        break;
        // given that the third card is different, it must be a two pair
      } else {
        outcome = 'twoPair';
      }
    }
  }
  // search for full house or four-of-a-kind
  else if (match === 3) {
    // given 3 matches: using card j as a reference point,
    // if the third card is the same, it must be a full house
    for (let j = 0; j < player.hand.length - 3; j += 1) {
      if (player.hand[j].rank === player.hand[j + 3].rank) {
        outcome = 'fourOfAKind';
        break;
      }
      // give that the third card is different, it must be a two pair
      else {
        outcome = 'fullHouse';
      }
    }
  }
  return outcome;
};

// ----check for straight/flush-------
const checkStraight = () => {
  console.log('checking for straights...');
  let outcome = null;
  let match = 0;
  // compare each card with the next;
  // if the next card has a rank that is one greater, increase the 'match'
  for (let i = 0; i < player.hand.length - 1; i += 1) {
    // console.log(player.hand[i + 1].rank + 1);
    if (player.hand[i].rank + 1 === player.hand[i + 1].rank) {
      match += 1;
    }
    // if the 'match' is 4, you have a straight
    if (match === 4) {
      outcome = 'straight';
    }
  }
  console.log(`straight-match is ${match}`);
  return outcome;
};
// ----check for straight/flush-------
const checkFlush = () => {
  console.log('checking for flushes...');

  let outcome = null;
  let match = 0;
  for (let i = 0; i < player.hand.length - 1; i += 1) {
    if (player.hand[i].suit === player.hand[i + 1].suit) {
      match += 1;
    }
  }
  if (match === 4) {
    outcome = 'flush';
  }
  return outcome;
};
// ---------check win----------------------
const checkWin = (outcomeOfCheckPairs, outcomeOfCheckStraight, outcomeOfCheckFlush) => {
  // check for win conditions: (logic: straight flush>...>jacks or better)
  // straight flush
  if (outcomeOfCheckFlush === 'flush' && outcomeOfCheckStraight === 'straight') {
    // give the user 50 points;
    console.log('straightFlush');
    return 'straightFlush';
  }
  // four of a kind
  if (outcomeOfCheckPairs === 'fourOfAKind') {
    // give the user 25 points;
    console.log('four of a kind');
    return 'fourOfAKind';
  }
  // full house
  if (outcomeOfCheckPairs === 'fullHouse') {
    // give the user 9 points
    console.log('full house');
    return 'fullHouse';
  }
  if (outcomeOfCheckFlush === 'flush') {
    // give the useer 6 points
    console.log('flush');
    return 'flush';
  }
  // straight
  if (outcomeOfCheckStraight === 'straight') {
    // give the user 4 points;
    console.log('straight');
    return 'straight';
  }
  // three of a kind
  if (outcomeOfCheckPairs === 'threeOfAKind') {
    // give the user 3 points
    console.log('three of a kind');
    return 'threeOfAKind';
  }
  if (outcomeOfCheckPairs === 'twoPair') {
    // give the user 2 points
    console.log('two pair');
    return 'twoPair';
  }
  // jacks or larger
  if (outcomeOfCheckPairs === 'jacksOrLarger') {
    // give the user 1 point
    console.log('jacks or larger');
    return 'jacksOrLarger';
  }
  console.log('lose');
  return 'lose';
};

//------------------------------------------
const getHandScore = () => {
  // ===============================
// for testing:
  player.hand = player.fauxHand;

  // ===============================
  // sort cards (bubble sort) in ascending order
  for (let j = 0; j < player.hand.length; j += 1) {
    for (let i = 0; i < player.hand.length - 1; i += 1) {
      console.log(`start iteration ${i}`);
      if (player.hand[i].rank > player.hand[i + 1].rank) {
        [player.hand[i], player.hand[i + 1]] = [player.hand[i + 1], player.hand[i]];
        console.log(`end iteration ${i}`);
      }
    }
  }

  // check for pairs
  const outcomeOfCheckPairs = checkPairs();
  // console.log(`outcomeOfCheckPairs is ${outcomeOfCheckPairs}`);

  // check for straights;
  const outcomeOfCheckStraight = checkStraight();
  // console.log(`outcomeOfCheckStraight is:  ${outcomeOfCheckStraight}`);

  // check for flushes;
  const outcomeOfCheckFlush = checkFlush();
  // console.log(`outcomeOfCheckFlush is: ${outcomeOfCheckFlush}`);

  // based on the 3 checks above, determine if the player has a winning hand
  const finalOutcome = checkWin(outcomeOfCheckPairs, outcomeOfCheckStraight, outcomeOfCheckFlush);

  console.log(`finalOutcome is: ${finalOutcome}`);

  // get the stakes basd on the user's bid choice (i.e. using the bid counter global variable)
  const stakes = getStakes();

  // update player.credits according to the stakes and the performance of the player's hand
  player.credits += stakes['' + finalOutcome]; // the [''+] helps convert the variable into a string, which is needed to call that object's proprty.

  // display the credits to the user
  showCredits(player.credits);

  // reset the game (except the credits)
};
