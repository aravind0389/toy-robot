//To check if the PLACE command is valid to process
const isValidCommand = (cmd) => {
  let cmdValid = (cmd.split(" ").length === 2) ? true : false;
  let validPlaceKey = (cmd.split(" ")[0] === "PLACE") ? true : false;
  let validXPos = (isNaN(cmd.split(" ")[1].split(",")[0])) ? false : true;
  let validYPos = (isNaN(cmd.split(" ")[1].split(",")[1])) ? false : true;
  let allowedDirections = ['EAST','WEST','NORTH','SOUTH'];
  let validInputDirection = (allowedDirections.indexOf(cmd.split(" ")[1].split(",")[2]) != -1) ? true : false;

  return (cmdValid
          && validPlaceKey
          && validXPos
          && validYPos
          && validInputDirection) ? true : false;
}

//To check if the X,Y position values make the robot fall from table
const isValidXYPos = (cmd) => {
  let XPos = cmd.split(" ")[1].split(",")[0];
  let YPos = cmd.split(" ")[1].split(",")[1];
  let tableXYSize = 5;

  return ((XPos >= tableXYSize) && (YPos >= tableXYSize)) ? false : true;
}

module.exports = { isValidCommand, isValidXYPos };
