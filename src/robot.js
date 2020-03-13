// Inquirer cli node module for intreactive cli input
const inquirer = require('inquirer');
const validator = require('./validator.js');
const processor = require('./processor.js');
const ui = new inquirer.ui.BottomBar();
/**
Increasing event max listeners value for getting continuous
input for question2 direction and moves
*/
require('events').EventEmitter.defaultMaxListeners = 100;
let answer1Master = [];

// Input collection for Toy Robot placement and moves
const collectInputs = async (inputs = [], isNew = true) => {

  // Check if it is new execution and validate the PLACE input
  if(isNew) {
    // Question1 to fetch the Robot PLACE input
    let question1 = [
      {
        type: 'input',
        name: 'place',
        message: 'Place Your Toy Robot [Ex:PLACE 0,0,<EAST,WEST,NORTH,SOUTH>]: '
      }
    ];
    const answer1 = await inquirer.prompt(question1);
    let placeInput = answer1.place;
    const isValidCmd = validator.isValidCommand(placeInput);
    // If not a valid palce command start again
    if(!isValidCmd) {
      ui.log.write("Invalid!!! PLACE command provide correct values to place your Robot");
      return collectInputs([], true);
    } else {
      // Check if the X/Y positions does not make the robot fall from table
      const isValidXYPos = validator.isValidXYPos(placeInput);
      if(!isValidXYPos) {
        ui.log.write("Invalid!!! X/Y position to place your Robot");
        return collectInputs([], true);
      } else {
        answer1Master = answer1;
      }
    }
  }

  // Question2 to fetch robot moves and direction
  let question2 = [
    {
      type: 'list',
      name: 'moves',
      message: 'Enter Toy Robot Travel Directions? ',
      choices: ['MOVE', 'LEFT', 'RIGHT', 'REPORT']
    }
  ];

  // Prompt for question2 upon valid answer for question1
  const answer2 = await inquirer.prompt(question2);
  // push the direction input values for processing
  const newInputs = [...inputs, answer2];
  let latestInputKey = newInputs.length - 1;

  // Check if the value of direction is REPORT and start processing the moves
  if(newInputs[latestInputKey].moves != "REPORT") {
    return collectInputs(newInputs, false);
  } else {
    newInputs.push(answer1Master);
    return newInputs;
  }
};

// Main function for Toy Robot simulation
const main = async () => {
  const inputs = await collectInputs();
  let placeCommand = inputs.pop();
  let result = [];
  processor.processRobotMoves(placeCommand, true, false);

  // Loop through the input moves and compute output
  for(var key in inputs) {
    result = processor.processRobotMoves(inputs[key], false, false);
  }

  console.log("===============Travel Plan=================");
  console.log(placeCommand.place+" "+result.pop());
  console.log("================Output=============");
  console.log(result[0]+" "+result[1]+" "+result[2]);
};

// Execution starts
main();
