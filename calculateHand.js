// HANDLES CALCULATING THE DECK ON HAND (returns score)

// CHECK FOR FIVE OF A KIND
const handleCheckFiveKind = (playerHand) => {
  // Five of a kind is a hand that contains five cards of one rank,
  let allSuit;
  const newA = [];

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

    newA.push(card);
  });
  const checkFiveKind = newA.every((card) => card === newA[0]);
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
  // STORE ALL VALUES
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
  // CHECK IF VALUES ARE IN ASCENDING ORDER
  // for (i = 0; i < convertValues.length; i += 1){
  //   if (convertValues[i] + 1 === convertValues[i+1] || convertValues[i] === convertValues[convertValues.length-1] ) {

  //   }
  // }

  console.log(convertValues.sort());
  // const checkOrder = convertValues
  //   .slice()
  //   .sort(function (b, a) {
  //     return a - b;
  //   })
  //   .every((value, i, arr) => {
  //     return i === 0 || value >= arr[i - 1];
  //   });
  // console.log("HEREE --->>>> ", checkOrder);

  const at = [1, 3, 3, 5];

  console.log(at.every((num, i, arr) => num - 1 === arr[i - 1] || num > 0));

  // IF SO RETURN TRUE
};

// const a = [
//   { value: 12, suit: "b" },
//   { value: "Q", suit: "b" },
//   { value: 12, suit: "b" },
//   { value: 12, suit: "b" },
// ];

// console.log("yup", handleCheckFiveKind(a));
