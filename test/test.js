const assert = require('assert');
const expect = require('expect.js');
const commands = require('../src/validator.js');
const processor = require('../src/processor.js');
const testIp = require('./inputData.js');
const invalidPlaceCommand = 'PLACE 5,6,SOU';
const validPlaceCommand = 'PLACE 1,2,SOUTH';

// PLACE command has a invalid syntax proper error is thrown
describe('Placing an Invalid Command', function() {
  describe(invalidPlaceCommand, function() {
    it('should return False when the command is invalid', function() {
      assert.equal(commands.isValidCommand(invalidPlaceCommand), false);
    });
  });
});

// PLACE command has a valid syntax is success provided
describe('Placing a Valid Command', function() {
  describe(validPlaceCommand, function() {
    it('should return True when the command is valid', function() {
      assert.equal(commands.isValidCommand(validPlaceCommand), true);
    });
  });
});

// PLACE command has invalid values is error returned from validation function
describe('Placing an invalid XY value', function() {
  describe(invalidPlaceCommand, function() {
    it('should return false when the value is invalid', function() {
      assert.deepEqual(commands.isValidXYPos(invalidPlaceCommand), false);
    });
  });
});

// PLACE command has valid values is success returned from validation function
describe('Placing a valid XY value', function() {
  describe(validPlaceCommand, function() {
    it('should return true when the value is valid', function() {
      assert.equal(commands.isValidXYPos(validPlaceCommand), true);
    });
  });
});

// PLACE command has valid values is success returned from validation function
describe('Placing first test input', function() {
  let placeCommand = testIp.testInput1.pop();
  describe(JSON.stringify(placeCommand)+" "+JSON.stringify(testIp.testInput1), function() {
    it('should return expected output: 0 1 NORTH', function() {
      var result = "";
      processor.processRobotMoves(placeCommand, true, true);
      // Loop through the input moves and compute output
      for(var key in testIp.testInput1) {
        result = processor.processRobotMoves(testIp.testInput1[key], false, true);
      }
      assert.deepEqual(result, [0, 1, "NORTH"]);
    });
  });
});

// PLACE command has valid values is success returned from validation function
describe('Placing second test input', function() {
  let placeCommand = testIp.testInput2.pop();
  describe(JSON.stringify(placeCommand)+" "+JSON.stringify(testIp.testInput2), function() {
    it('should return expected output: 0 0 WEST', function() {
      var result = "";
      processor.processRobotMoves(placeCommand, true, true);
      // Loop through the input moves and compute output
      for(var key in testIp.testInput2) {
        result = processor.processRobotMoves(testIp.testInput2[key], false, true);
      }
      assert.deepEqual(result, [0,0,'WEST']);
    });
  });
});

// PLACE command has valid values is success returned from validation function
describe('Placing third test input', function() {
  let placeCommand = testIp.testInput3.pop();
  describe(JSON.stringify(placeCommand)+" "+JSON.stringify(testIp.testInput3), function() {
    it('should return expected output: 3 3 NORTH', function() {
      var result = "";
      processor.processRobotMoves(placeCommand, true, true);
      // Loop through the input moves and compute output
      for(var key in testIp.testInput3) {
        result = processor.processRobotMoves(testIp.testInput3[key], false, true);
      }
      assert.deepEqual(result, [3,3,'NORTH']);
    });
  });
});
