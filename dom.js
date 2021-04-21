// FUNCTION TO APPEND CARD DETAILS TO DOM (DEAL CARDS)
// takes current hand array as argument and draws elements required to display cards on screen

// HANDLE DRAWING INTO DOM
const handleDrawDom = (userHand) => {
  // CHECK FOR EXISTING CARDS ON VISIBLE DOM
  // THIS SHOULD GO INTO DOM.JS (handleDrawDom)
  if (domSelector.deckList.firstChild) {
    while (domSelector.deckList.firstChild) {
      domSelector.deckList.removeChild(domSelector.deckList.firstChild);
      console.log("REMOVING ", domSelector.deckList.firstChild);
    }
  }

  //  LOOP THROUGH THE PLAYER HAND ARRAY AND DRAW CARD TO DOM
  userHand.forEach((cardOnHand) => {
    // console.log("THIS IS CARD FOREACH ", cardOnHand);

    const testHere = { value: "Q", suit: "🌷" };

    // CREATE DOM ELEMENTS
    const deckItem = document.createElement("li");
    const card = document.createElement("div");
    const topLeftValue = document.createElement("div");
    const suit = document.createElement("div");
    const bottomRightValue = document.createElement("div");

    // ADD CLASS NAMES TO ELEMENTS
    deckItem.classList.add(
      "deck-item",
      "animate__animated",
      "animate__flipInX",
      "animate__delay-0.5s"
    );
    card.classList.add("card");
    topLeftValue.classList.add("top-left-value");
    suit.classList.add("suit");
    bottomRightValue.classList.add("bottom-right-value");

    // ADD INNERTEXT TO ELEMENTS
    topLeftValue.innerText = cardOnHand.value;
    bottomRightValue.innerText = cardOnHand.value;
    suit.innerText = cardOnHand.suit;
    domSelector.pointsBox.innerText = user.points;

    // APPEND TO DOM

    domSelector.pointsBoxDiv.style.display = "block";

    // append all children
    card.appendChild(topLeftValue);
    card.appendChild(suit);
    card.appendChild(bottomRightValue);
    // <LI>
    deckItem.appendChild(card);
    // <UL> (parent DOM)
    domSelector.deckList.appendChild(deckItem);
  });
};

// HANDLE DISPLAY FOR GAME RULES AND GAME BUTTON

const handleEraseGameRules = () => {
  domSelector.gameRulesSection.style.display = "none";
  domSelector.gameButtonSection.style.display = "flex";
};
