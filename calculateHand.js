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

// const a = [
//   { value: 12, suit: "b" },
//   { value: "Q", suit: "b" },
//   { value: 12, suit: "b" },
//   { value: 12, suit: "b" },
// ];

// console.log("yup", handleCheckFiveKind(a));
