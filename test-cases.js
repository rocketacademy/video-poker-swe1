// returns true if there is a flush in the player's hand
const isFlush = () => {
  // if checkFlush is true, there is a Flush in the player's hand
  let checkFlush = false;

  // logic
  if (playerHand[0].suit === playerHand[1].suit && playerHand[1].suit === playerHand[2].suit 
    && playerHand[2].suit === playerHand[2].suit && playerHand[3].suit === playerHand[4].suit ){
    checkFlush = true;
  }

  return checkStraight;
};

// straight hand
const playerHand = [ // straight from 10 to ace
  {
    rank: 13,
    suit: 'hearts',
  },
  {
    rank: 12,
    suit: 'hearts',
  },

  {
    rank: 11,
    suit: 'clubs',
  },
  {
    rank: 10,
    suit: 'clubs',
  },
  {
    rank: 1,
    suit: 'clubs',
  },
];

const playerHand = [ // straight from 10 to ace
  {
    rank: 10,
    suit: 'hearts',
  },
  {
    rank: 9,
    suit: 'hearts',
  },

  {
    rank: 8,
    suit: 'hearts',
  },
  {
    rank: 7,
    suit: 'clubs',
  },
  {
    rank: 6,
    suit: 'clubs',
  },
];

// flush hand
const playerHand = [ // straight from 10 to ace
  {
    rank: 2,
    suit: 'hearts',
  },
  {
    rank: 9,
    suit: 'hearts',
  },

  {
    rank: 8,
    suit: 'hearts',
  },
  {
    rank: 7,
    suit: 'hearts',
  },
  {
    rank: 6,
    suit: 'hearts',
  },
];

// straight-flush hand
const playerHand = [ // straight from 10 to ace
  {
    rank: 10,
    suit: 'hearts',
  },
  {
    rank: 9,
    suit: 'hearts',
  },

  {
    rank: 8,
    suit: 'hearts',
  },
  {
    rank: 7,
    suit: 'hearts',
  },
  {
    rank: 6,
    suit: 'hearts',
  },
];
