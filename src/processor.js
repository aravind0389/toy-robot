//Assigning global variables for Robot placement
let xPosMaster, yPosMaster, directionMaster = "";
let travelPlan = [];
const area = {
  xLimit: 5,
  yLimit: 5
};

//PLACE the robot in user provided position
const placeRobot = (inputCmd) => {
  xPosMaster = parseInt(inputCmd.split(" ")[1].split(",")[0]);
  yPosMaster = parseInt(inputCmd.split(" ")[1].split(",")[1]);
  directionMaster = inputCmd.split(" ")[1].split(",")[2];
}

//MOVE robot based on user input instructions
const move = () => {
  //Move the robot based on current direction
  switch(directionMaster) {
     case 'NORTH':
          if(yPosMaster < (area.yLimit - 1)){
              yPosMaster += 1;
          }
          break;
     case 'SOUTH':
          if(yPosMaster > 0){
              yPosMaster -= 1;
          }
          break;
     case 'EAST':
          if(xPosMaster < (area.xLimit - 1)){
              xPosMaster += 1;
          }
          break;
     case 'WEST':
          if(xPosMaster > 0){
              xPosMaster -= 1;
          }
          break;
 }
}

// Rotate the Robot 90 degrees based on user inputs
const rotate = (ipRoute) => {
  switch(directionMaster){
       case 'NORTH':
            directionMaster = (ipRoute == 'LEFT') ? 'WEST' : 'EAST';
            break;
       case 'SOUTH':
            directionMaster = (ipRoute == 'LEFT') ? 'EAST' : 'WEST';
            break;
       case 'EAST':
            directionMaster = (ipRoute == 'LEFT') ? 'NORTH' : 'SOUTH';
            break;
       case 'WEST':
            directionMaster = (ipRoute == 'LEFT') ? 'SOUTH' : 'NORTH';
            break;
   }
}

/**
 * Execute the input command (PLACE X,Y,Direction, MOVE, LEFT, RIGHT, REPORT)
 */
const processRobotMoves = (input, isNew, isTest) => {

  if(isNew) {
    let robotPlacement = placeRobot(input.place);
  } else if(!isNew) {
      if(input.moves == 'MOVE') {
        travelPlan.push(input.moves);
        move();
      } else if(input.moves == 'LEFT' || input.moves == 'RIGHT') {
        travelPlan.push(input.moves);
        rotate(input.moves);
      } else if(input.moves == 'REPORT') {
        travelPlan.push(input.moves);
        if(isTest) {
          return [xPosMaster, yPosMaster, directionMaster];
        } else {
          return [xPosMaster, yPosMaster, directionMaster, travelPlan];
        }
     }
  }
}

module.exports = { processRobotMoves };
