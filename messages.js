/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Losing message
const loseMsg = () => {
  domSelector.loseMessageBox.style.display = 'block';
  // domSelector.loseMessageBox.classList.add(
  //   "animate__animated",
  //   "animate__hinge"
  // );
  domSelector.loseMessageBox.innerText =
    'OOPS! No winning hand! Loose 10 points!';

  setTimeout(() => {
    domSelector.loseMessageBox.style.display = 'none';
  }, 2000);
};

const winMsg = (points, hand) => {
  const msg = `WOW!! Good Job! That's a ${hand}!. You earned ${points} points`;

  domSelector.winMessageBox.style.display = 'block';
  // domSelector.winMessageBox.classList.add("animate__animated", "animate__tada");
  domSelector.winMessageBox.innerText = msg;

  setTimeout(() => {
    domSelector.winMessageBox.style.display = 'none';
  }, 2000);
};

const gameOverMsg = () => {
  domSelector.gameOverBox.style.display = 'block';
  domSelector.gameOverBox.innerText = 'GAME OVER';

  setTimeout(() => {
    window.location.reload();
  }, 5000);

  // Could reload to a message page instaed
};
