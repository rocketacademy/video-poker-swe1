// HANDLES CALCULATING THE DECK ON HAND (returns score)

// CHECK FOR FIVE OF A KIND
const handleCheckFiveKind = (playerHand) => {
  // Five of a kind is a hand that contains five cards of one value,

  const convertValues = [];

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

  // CHECK IF EVERY VALUE MATCHES
  const checkFiveKind = convertValues.every(
    (value) => value === convertValues[0]
  );
  console.log("CHECKING FIVEKIND ->> ", checkFiveKind);
  return checkFiveKind;
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

// const a = [
//   { value: 9, suit: "b" },
//   { value: "Q", suit: "b" },
//   { value: "K", suit: "b" },
//   { value: "J", suit: "b" },
//   { value: 9, suit: "b" },
// ];

// console.log(handleCheckStraightFlush(a));
