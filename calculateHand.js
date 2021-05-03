// HANDLES CALCULATING THE DECK ON HAND (returns score)

// HELPER FUNCTIONS

// returns number of same cards in array ()
// this could go into a helper functon script (reusable funciton)
const isThree = (num, arr) => {
  // The filter() method creates a new array with all elements that pass the test
  const fil = arr.filter((x) => x === num).length;
  console.log("Filter function", fil);
  return fil;
};

// CHECK FOR FIVE OF A KIND
const handleCheckFiveKind = (playerHand) => {
  // Five of a kind is a hand that contains five cards of one value,
  console.log("HERE PLAYERHAND ", playerHand);
  const convertValues = [];
  const fourCards = [];
  const oneCard = [];

  // Taking player hand to convert into an array of values
  const convertCard = playerHand.map((hand) => hand.value);
  console.log("convertCard ", convertCard);

  convertCard.forEach((card) => {
    switch (card) {
      case "J":
        card = 11;
        break;
      case "Q":
        card = 12;
        break;
      case "K":
        card = 13;
        break;

      default:
        card;
        break;
    }

    convertValues.push(card);
  });
  console.log("convertValues --> ", convertValues);

  for (i = 0; i < convertValues.length; i++) {
    if (isThree(convertValues[i], convertValues) === 4) {
      fourCards.push(convertValues[i]);
    } else {
      if (!oneCard.includes(convertValues[i])) {
        oneCard.push(convertValues[i]);
      } else {
        ("");
      }
    }
  }

  console.log("FOUR CARDS", fourCards);
  console.log("ONE CARD", oneCard);

  return fourCards.length === 4 && oneCard.length === 1 ? true : false;
};

// CHECK FOR STRAIGHT FLUSH
const handleCheckStraightFlush = (playerHand) => {
  // A straight flush is a hand that contains five cards of sequential value, all of the same suit

  // STORE SUITS INTO ARRAY
  const suitArray = playerHand.map((card) => card.suit);
  console.log("THIS IS SUIT ARRAY MAPPED ==> ", suitArray);

  // CHECK IF ALL SUITS MATCHES
  const checkSuitMatches = suitArray.every((suit) => suit === suitArray[0]);
  console.log("THIS IS CHECK SUITS MATCHES --> ", checkSuitMatches);

  // STORE ALL VALUES INTO ARRAY

  // VARIABLE TO STORE ALL VALUES AFTER CONVERTING STRINGS INTO NUMBERS
  let convertValues = [];
  const valuesArray = playerHand.map((card) => card.value);
  valuesArray.forEach((card) => {
    switch (card) {
      case "J":
        card = 11;
        break;
      case "Q":
        card = 12;
        break;
      case "K":
        card = 13;
        break;
      case "A":
        card = 1;
        break;

      default:
        card;
        break;
    }
    convertValues.push(card);
  });
  console.log(convertValues);
  // CHECK IF VALUES DONT REPEAT
  const noDuplicate = new Set([]);
  for (i = 0; i < convertValues.length; i += 1) {
    noDuplicate.add(convertValues[i]);
  }

  console.log("SET SIZE", noDuplicate.size);

  // CHECKING IF ALL CONDITIONS OF A STRAIGHT FLUSH MATCHES
  if (checkSuitMatches && noDuplicate.size === 5) {
    console.log(
      "LOW/HIGH calculations",
      Math.max(...convertValues) - Math.min(...convertValues)
    );

    // IF SO RETURN TRUE
    return Math.max(...convertValues) - Math.min(...convertValues) === 4
      ? true
      : false;
  }

  // ELSE RETURN FALSE
  return false;
};

// CHECK FOR FOUR OF A KIND
const handleCheckFourKind = (playerHand) => {
  // Four of a kind, also known as quads, is a hand that contains four cards of one value and one card of another value

  // convert values into numbers
  let convertValues = [];

  // counter to keep track of num of cards with same values
  let numOfSameValues = 0;

  // Get array of values from playerHand
  const valuesArray = playerHand.map((card) => card.value);
  valuesArray.forEach((card) => {
    switch (card) {
      case "J":
        card = 11;
        break;
      case "Q":
        card = 12;
        break;
      case "K":
        card = 13;
        break;
      case "A":
        card = 1;
        break;

      default:
        card;
        break;
    }
    convertValues.push(card);
  });
  console.log(convertValues);

  // Check if there are 4 cards with same value
  for (i = 0; i < convertValues.length; i += 1) {
    const valueToCheckAgainst = convertValues[0];
    if (convertValues[i] === valueToCheckAgainst) {
      numOfSameValues += 1;
    }
  }

  // Return true if so
  console.log("Four kind --> ", numOfSameValues);
  return numOfSameValues != 4 ? false : true;
};

// CHECK FOR FULL HOUSE
const handleCheckFullHouse = (playerHand) => {
  // Full house is a hand that contains three cards of one rank and two cards of another rank

  // increment each time match hit (should === 13 for fullhouse)
  let numOfSameValues = 0;

  // convert values into numbers
  let convertValues = [];

  // Get array of values from playerHand
  const valuesArray = playerHand.map((card) => card.value);
  valuesArray.forEach((card) => {
    switch (card) {
      case "J":
        card = 11;
        break;
      case "Q":
        card = 12;
        break;
      case "K":
        card = 13;
        break;
      case "A":
        card = 1;
        break;

      default:
        card;
        break;
    }
    convertValues.push(card);
  });

  // CHECK FOR 2 SAME CARDS
  for (i = 0; i < convertValues.length; i += 1) {
    const valueToCheckAgainst = convertValues[i];
    for (j = 0; j < convertValues.length; j += 1) {
      if (convertValues[j] === convertValues[i]) {
        numOfSameValues += 1;
      }
    }
  }

  console.log("NUMBEROFSAME --> ", numOfSameValues);

  return numOfSameValues != 13 ? false : true;
};

// CHECK FOR FLUSH
const handleCheckFlush = (playerHand) => {
  //A flush is a hand that contains five cards all of the same suit, not all of sequential rank, such as K♣ 10♣ 7♣ 6♣ 4♣

  // STORE SUITS INTO ARRAY
  const suitArray = playerHand.map((card) => card.suit);
  console.log("THIS IS SUIT ARRAY MAPPED ==> ", suitArray);
  // CHECK IF ALL SUITS MATCHES
  const checkSuitMatches = suitArray.every((suit) => suit === suitArray[0]);
  console.log("THIS IS CHECK SUITS MATCHES --> ", checkSuitMatches);
  return checkSuitMatches ? true : false;
};

// CHECK FOR STRAIGHT
const handleCheckStraight = (playerHand) => {
  // A straight is a hand that contains five cards of sequential value, not all of the same suit, such as 7♣ 6♠ 5♠ 4♥ 3♥

  // VARIABLE TO STORE ALL VALUES AFTER CONVERTING STRINGS INTO NUMBERS
  let convertValues = [];
  const valuesArray = playerHand.map((card) => card.value);
  valuesArray.forEach((card) => {
    switch (card) {
      case "J":
        card = 11;
        break;
      case "Q":
        card = 12;
        break;
      case "K":
        card = 13;
        break;
      case "A":
        card = 1;
        break;

      default:
        card;
        break;
    }
    convertValues.push(card);
  });
  console.log(convertValues);
  // CHECK IF VALUES DONT REPEAT
  const noDuplicate = new Set([]);
  for (i = 0; i < convertValues.length; i += 1) {
    noDuplicate.add(convertValues[i]);
  }

  console.log("SET SIZE straight", noDuplicate.size);

  // AND MAX nun - MIN num should === 4

  // IF SO RETURN TRUE
  return noDuplicate.size === 5 &&
    Math.max(...convertValues) - Math.min(...convertValues) === 4
    ? true
    : false;
};

// CHECK FOR THREE KIND
const handleCheckThreeKind = (playerHand) => {
  // Array to store non duplicate values
  // let threeKind = [];
  // const nonThreeKind = [];
  const threeKind = [];
  const balanceCards = [];

  // VARIABLE TO STORE ALL VALUES AFTER CONVERTING STRINGS INTO NUMBERS
  let convertValues = [];
  const valuesArray = playerHand.map((card) => card.value);
  valuesArray.forEach((card) => {
    switch (card) {
      case "J":
        card = 11;
        break;
      case "Q":
        card = 12;
        break;
      case "K":
        card = 13;
        break;
      case "A":
        card = 1;
        break;

      default:
        card;
        break;
    }
    convertValues.push(card);
  });
  console.log(convertValues);

  for (i = 0; i < convertValues.length; i++) {
    if (isThree(convertValues[i], convertValues) === 3) {
      console.log("yes", convertValues[i]);
      threeKind.push(convertValues[i]);
    } else {
      console.log("NOPE");
      // th.push(convertValues[i]);
      !balanceCards.includes(convertValues[i])
        ? balanceCards.push(convertValues[i])
        : "";
    }
  }

  console.log("heerererererererere", threeKind);
  console.log("notttttt", balanceCards);
  console.log("Threwe kind array", threeKind);
  // return false if threeKind.length > 3
  // return threeKind.length != 3 ? false : true;

  return threeKind.length === 3 && balanceCards.length === 2 ? true : false;
};

// CHECK FOR PAIRS
const handleCheckPairs = (playerHand) => {
  const pairArray = [];
  const remainingCards = [];

  // VARIABLE TO STORE ALL VALUES AFTER CONVERTING STRINGS INTO NUMBERS
  let convertValues = [];
  const valuesArray = playerHand.map((card) => card.value);
  valuesArray.forEach((card) => {
    switch (card) {
      case "J":
        card = 11;
        break;
      case "Q":
        card = 12;
        break;
      case "K":
        card = 13;
        break;
      case "A":
        card = 1;
        break;

      default:
        card;
        break;
    }
    convertValues.push(card);
  });

  for (i = 0; i < convertValues.length; i++) {
    if (isThree(convertValues[i], convertValues) === 2) {
      pairArray.push(convertValues[i]);
    } else {
      !remainingCards.includes(convertValues[i])
        ? remainingCards.push(convertValues[i])
        : "";
    }
  }
  console.log("PAIRS", pairArray);
  console.log("REMAINING CARDS", remainingCards);

  return pairArray.length === 2 && remainingCards.length === 3 ? true : false;
};

// const a = [
//   { value: 9, suit: "b" },
//   { value: 9, suit: "b" },
//   { value: 9, suit: "b" },
//   { value: "J", suit: "b" },
//   { value: 9, suit: "b" },
// ];

// console.log(handleCheckStraightFlush(a));
// console.log(handleCheckFourKind(a));
// console.log(handleCheckFullHouse(a));
// console.log(handleCheckStraight(a));
// console.log(handleCheckThreeKind(a));
// console.log(handleCheckPairs(a));
// console.log(handleCheckFiveKind(a));
