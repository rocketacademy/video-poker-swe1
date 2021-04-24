/* ------- TEST CASES ------- */

const royalFlush = [
  { name: `A`, suit: "◆", rank: 0, number: 14, img: `cards/◆/a.png` },
  { name: `K`, suit: "◆", rank: 0, number: 13, img: `cards/◆/k.png` },
  { name: `Q`, suit: "◆", rank: 0, number: 12, img: `cards/◆/q.png` },
  { name: `J`, suit: "◆", rank: 0, number: 11, img: `cards/◆/j.png` },
  { name: `10`, suit: "◆", rank: 0, number: 10, img: `cards/◆/10.png` },
];

const flush = [
  { name: `J`, suit: "◆", rank: 0, number: 11, img: `cards/◆/j.png` },
  { name: `9`, suit: "◆", rank: 0, number: 9, img: `cards/◆/9.png` },
  { name: `8`, suit: "◆", rank: 0, number: 8, img: `cards/◆/8.png` },
  { name: `4`, suit: "◆", rank: 0, number: 4, img: `cards/◆/4.png` },
  { name: `3`, suit: "◆", rank: 0, number: 3, img: `cards/◆/3.png` },
];

const straightFlush = [
  { name: `J`, suit: "♣", rank: 0, number: 11, img: `cards/♣/j.png` },
  { name: `10`, suit: "♣", rank: 0, number: 10, img: `cards/♣/10.png` },
  { name: `9`, suit: "♣", rank: 0, number: 9, img: `cards/♣/9.png` },
  { name: `8`, suit: "♣", rank: 0, number: 8, img: `cards/♣/8.png` },
  { name: `7`, suit: "♣", rank: 0, number: 7, img: `cards/♣/7.png` },
];

const straight = [
  { name: `10`, suit: "◆", rank: 0, number: 10, img: `cards/◆/10.png` },
  { name: `9`, suit: "♣", rank: 0, number: 9, img: `cards/♣/9.png` },
  { name: `8`, suit: "♣", rank: 0, number: 8, img: `cards/♣/8.png` },
  { name: `7`, suit: "◆", rank: 0, number: 7, img: `cards/◆/7.png` },
  { name: `6`, suit: "♣", rank: 0, number: 6, img: `cards/♣/6.png` },
];

const fourOfAKind = [
  { name: `A`, suit: "◆", rank: 0, number: 14, img: `cards/◆/a.png` },
  { name: `A`, suit: "♣", rank: 0, number: 14, img: `cards/♣/a.png` },
  { name: `A`, suit: "❤︎", rank: 0, number: 14, img: `cards/❤︎/a.png` },
  { name: `A`, suit: "♠", rank: 0, number: 14, img: `cards/♠/a.png` },
  { name: `3`, suit: "◆", rank: 0, number: 3, img: `cards/◆/3.png` },
];

const fullhouse = [
  { name: `A`, suit: "◆", rank: 0, number: 14, img: `cards/◆/a.png` },
  { name: `A`, suit: "♣", rank: 0, number: 14, img: `cards/♣/a.png` },
  { name: `A`, suit: "❤︎", rank: 0, number: 14, img: `cards/❤︎/a.png` },
  { name: `2`, suit: "♣", rank: 0, number: 2, img: `cards/♣/2.png` },
  { name: `2`, suit: "❤︎", rank: 0, number: 2, img: `cards/❤︎/2.png` },
];

const allOther = [
  { name: `10`, suit: "◆", rank: 0, number: 10, img: `cards/◆/10.png` },
  { name: `8`, suit: "♣", rank: 0, number: 8, img: `cards/♣/8.png` },
  { name: `6`, suit: "♣", rank: 0, number: 6, img: `cards/♣/6.png` },
  { name: `4`, suit: "◆", rank: 0, number: 4, img: `cards/◆/4.png` },
  { name: `2`, suit: "♣", rank: 0, number: 2, img: `cards/♣/2.png` },
];
