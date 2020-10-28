let numOf4OfAKind = 0;
let numOf3OfAKind = 0;
let numOfPairs = 0;
// find number of pairs/3 of a kind/4 of a kind
const findNumOfSimilarCards = () => {
  for (let i=0; i<rankedHand.length; i+=1) {
    if (rankedHand[i].length === 4) {
      numOf4OfAKind +=1;
    } else if (rankedHand[i].length === 3) {
      numOf3OfAKind += 1;
    } else if (rankedHand[i].length === 2) {
      numOfPairs += 1;
    }
  }
}


// straight hand
const playerHand = [ 
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

const playerHand = [ 
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
const playerHand = [ 
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
const playerHand = [ 
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

// fullhouse hand
const playerHand = [ 
  {
    rank: 10,
    suit: 'hearts',
  },
  {
    rank: 10,
    suit: 'clubs',
  },

  {
    rank: 10,
    suit: 'spades',
  },
  {
    rank: 7,
    suit: 'hearts',
  },
  {
    rank: 7,
    suit: 'spades',
  },
];

// Royal flush hand
const playerHand = [ 
  {
    rank: 13,
    suit: 'spades',
  },
  {
    rank: 12,
    suit: 'spades',
  },

  {
    rank: 11,
    suit: 'spades',
  },
  {
    rank: 10,
    suit: 'spades',
  },
  {
    rank: 1,
    suit: 'spades',
  },
];

// High Card Jack
const playerHand = [ 
  {
    rank: 2,
    suit: 'spades',
  },
  {
    rank: 4,
    suit: 'hearts',
  },

  {
    rank: 6,
    suit: 'spades',
  },
  {
    rank: 8,
    suit: 'spades',
  },
  {
    rank: 11,
    suit: 'spades',
  },
];