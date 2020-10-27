// store similar ranks together and used to check for winning conditions
const groupPlayerCardsByRank = () => {
  rankedHand[0].push(playerHand[0]);

  let rankRow = 0;
  for (let i=1; i<playerHand.length;i+=1) {
    // store the current card in the row array containing cards of the same rank
    if(playerHand[i].rank === playerHand[i-1].rank) {
      rankedHand[rankRow].push(playerHand[i]);
    } else {  // store the current card in a new row array for the next rank 
      rankedHand.push([]);
      rankRow+=1;
      rankedHand[rankRow].push(playerHand[i]);
    }
  } 

} 


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
