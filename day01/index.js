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
 * Calculate the fuel required for the fuel
 *
 * @param {number} fuel - The current fuel requirement
 * @returns {number} - The fuel required for the fuel input
 */
function calculate_fuel_for_fuel(fuel) {
  let fuel_needed = calculate_fuel(fuel);
  let result = fuel_needed;
  while (fuel_needed > 0) {
    fuel_needed = calculate_fuel(fuel_needed);
    result += fuel_needed;
  }
  return result;
}

/**
 * Calculate the Fuel for a list of masses
 *
 * @param {Array} masses - The masses of the modules
 * @returns {object} - An object with the fuel required and the fuel for the fuel
 */
function calculate_total(masses) {
  return masses.reduce((accumulator, mass) => {
    const fuel = calculate_fuel(mass);
    accumulator.fuel += fuel;
    accumulator.fuelForFuel += calculate_fuel_for_fuel(fuel);
    return accumulator;
  }, { fuel: 0, fuelForFuel: 0 });
}

module.exports = { calculate_fuel, calculate_fuel_for_fuel, calculate_total };

if (require.main === module) {
  const masses = fs.readFileSync(argv.data, 'utf-8').split('\n');
  const result = calculate_total(masses);
  process.stdout.write(`Fuel For Mass: ${result.fuel}\n`);
  process.stdout.write(`Fuel For Fuel: ${result.fuelForFuel}\n`);
  process.stdout.write(`Total Fuel Required: ${result.fuel + result.fuelForFuel}\n`);
}
