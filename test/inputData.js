const testInput1 = [
  {
    moves: 'MOVE'
  },
  {
    moves: 'REPORT'
  },
  {
    place: 'PLACE 0,0,NORTH'
  }
];

const testInput2 = [
  {
    moves: 'LEFT'
  },
  {
    moves: 'REPORT'
  },
  {
    place: 'PLACE 0,0,NORTH'
  }
];

const testInput3 = [
  {
    moves: 'MOVE'
  },
  {
    moves: 'MOVE'
  },
  {
    moves: 'LEFT'
  },
  {
    moves: 'MOVE'
  },
  {
    moves: 'REPORT'
  },
  {
    place: 'PLACE 1,2,EAST'
  }
];

module.exports = { testInput1, testInput2, testInput3 };
