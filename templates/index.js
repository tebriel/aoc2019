#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const process = require('process');

module.exports = { calculate_fuel, calculate_fuel_for_fuel, calculate_total };

if (require.main === module) {
  const input = fs.readFileSync(argv.data, 'utf-8').split('\n');
  process.stdout.write(`Input: \n\n${input}\n`);
}
