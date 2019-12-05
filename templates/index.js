#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const process = require('process');

module.exports = { };

if (require.main === module) {
  const input = fs.readFileSync(argv.data, 'utf-8').split('\n');
  process.stdout.write(`Input: \n\n${input}\n`);
}
