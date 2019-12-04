#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const process = require('process');

/**
 * Move X
 *
 * @param {string} strCount - The number of steps to move (as a string)
 * @param {object} currentPos - The current position
 * @param {number} multiplier - -1 for Down, 1 for up
 * @returns {Array} - The movements
 */
function moveX(strCount, currentPos, multiplier) {
  const count = parseInt(strCount, 10);
  const result = [];
  let pos = { x: currentPos.x, y: currentPos.y };
  for (let idx = 1; idx <= count; idx += 1) {
    pos.x += 1 * multiplier;
    result.push({ x: pos.x, y: pos.y });
  }
  return result;
}

/**
 * Move Y
 *
 * @param {string} strCount - The number of steps to move (as a string)
 * @param {object} currentPos - The current position
 * @param {number} multiplier - -1 for Down, 1 for up
 * @returns {Array} - The movements
 */
function moveY(strCount, currentPos, multiplier) {
  const count = parseInt(strCount, 10);
  const result = [];
  let pos = { x: currentPos.x, y: currentPos.y };
  for (let idx = 1; idx <= count; idx += 1) {
    pos.y += 1 * multiplier;
    result.push({ x: pos.x, y: pos.y });
  }
  return result;
}

/**
 * Calculate Coordinates
 *
 * @param {Array} instructions - A list of instructions
 * @returns {Array} - An array of (x, y) coordinates
 */
function calculateCoordinates(instructions) {
  // [R8,U5,L5,D3]
  let results = [{ x: 0, y: 0 }];
  let movements;
  instructions.forEach((instruction) => {
    switch (instruction[0]) {
      case 'R':
        movements = moveX(instruction.slice(1), results[results.length - 1], 1);
        results = results.concat(movements);
        break;
      case 'L':
        movements = moveX(instruction.slice(1), results[results.length - 1], -1);
        results = results.concat(movements);
        break;
      case 'U':
        movements = moveY(instruction.slice(1), results[results.length - 1], 1);
        results = results.concat(movements);
        break;
      case 'D':
        movements = moveY(instruction.slice(1), results[results.length - 1], -1);
        results = results.concat(movements);
        break;
      default:
        throw new Error(`Unknown movement: ${instruction[0]}`);
    }
  });
  return results;
}


/**
 * Find Intersections
 *
 * @param {Array} first - A list of coordinates for the first wire
 * @param {Array} second - A list of coordinates for the second wire
 * @returns {Array} - A list of overlapping spots
 */
function findIntersections(first, second) {
  const results = [];
  let found;
  first.forEach((firstCoord) => {
    found = second.find((secondCoord) => {
      if (firstCoord.x === secondCoord.x && firstCoord.y === secondCoord.y) {
        if (firstCoord.x !== 0 || firstCoord.y !== 0) {
          return true;
        }
      }
      return false;
    });
    if (found != null) {
      results.push(found);
    }
  });
  return results;
}

/**
 * Calculate Distance
 *
 * @param {object} position - The position to calculate distance
 * @returns {number} - The {@link https://en.wikipedia.org/wiki/Taxicab_geometry Manhattan Distance} from the object
 */
function calculateDistance(position) {
  return Math.abs(position.x) + Math.abs(position.y);
}

/**
 * Find Distance of Closest Intersection
 *
 * @param {string} first - The first set of Instructions
 * @param {string} second - The second set of Instructions
 * @returns {number} - The distance to the closest intersection
 */
function findDistanceClosestIntersection(first, second) {
  const fCoords = calculateCoordinates(first.split(','));
  const sCoords = calculateCoordinates(second.split(','));
  const intersects = findIntersections(fCoords, sCoords);
  const distances = [];
  intersects.forEach((intersect) => {
    distances.push(calculateDistance(intersect));
  });
  return Math.min(...distances);
}

module.exports = {
  calculateCoordinates,
  calculateDistance,
  findDistanceClosestIntersection,
  findIntersections,
  moveX,
  moveY
};

if (require.main === module) {
  const paths = fs.readFileSync(argv.data, 'utf-8').split('\n');
  const result = findDistanceClosestIntersection(paths[0], paths[1]);
  process.stdout.write(`Manhattan Distance: ${result}\n`);
}
