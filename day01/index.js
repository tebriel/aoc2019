#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const process = require('process');

/**
 * Calculate the Fuel required for a module
 *
 * @param {number} mass - The mass of the module
 * @returns {number} - The fuel required for the module
 */
function calculate_fuel(mass) {
  let intMass = mass;
  if (typeof mass === 'string') {
    intMass = parseInt(mass, 10);
    if (Number.isNaN(intMass)) {
      return 0;
    }
  }
  let result = Math.floor(intMass / 3.0) - 2;
  if (result < 0) {
    result = 0;
  }
  return result;
}

/**
 * Calculate the Fuel for a list of masses
 *
 * @param {Array} masses - The masses of the modules
 * @returns {number} - The total fuel required.
 */
function calculate_total(masses) {
  return masses.reduce((accumulator, mass) => accumulator + calculate_fuel(mass), 0);
}

module.exports = { calculate_fuel, calculate_total };

if (require.main === module) {
  const masses = fs.readFileSync(argv.data, 'utf-8').split('\n');
  process.stdout.write(`${calculate_total(masses)}\n`);
}
