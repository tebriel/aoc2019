#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const process = require('process');

const { NodeTree } = require('./lib/node');

/**
 * Process a line from the input file
 *
 * @param   {NodeTree} tree - The node tree
 * @param   {string} line - The line from the input file
 */
function processLine(tree, line) {
  const items = line.split(')');
  tree.add(items[0], items[1]);
}

module.exports = { processLine };

if (require.main === module) {
  const input = fs.readFileSync(argv.data, 'utf-8').split('\n');
  const com = new NodeTree();
  input.forEach((pair) => processLine(com, pair));
  const orbits = com.orbits();
  process.stdout.write(`Direct Orbits: ${orbits.direct}\n`);
  process.stdout.write(`Indirect Orbits: ${orbits.indirect}\n`);
  process.stdout.write(`Total Orbits: ${orbits.direct + orbits.indirect}\n`);
  process.stdout.write(`Transfers between YOU and SAN: ${com.transfers()}\n`);
}
