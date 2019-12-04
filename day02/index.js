#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const process = require('process');

/**
 * Add OpCode
 *
 * @param {Array} opCodes - The full OpCode array.
 * @param {number} codeIdx - The index of the add operation
 * @returns {Array} - The updated codes array
 */
function add(opCodes, codeIdx) {
  const codes = opCodes.slice();
  const first = codes[codes[codeIdx + 1]];
  const second = codes[codes[codeIdx + 2]];
  const position = codes[codeIdx + 3];
  codes[position] = first + second;
  return { codes, codeIdx: (codeIdx + 4) };
}

/**
 * Multiply OpCode
 *
 * @param {Array} opCodes - The full OpCode array.
 * @param {number} codeIdx - The index of the multiply operation
 * @returns {Array} - The updated codes array
 */
function multiply(opCodes, codeIdx) {
  const codes = opCodes.slice();
  const first = codes[codes[codeIdx + 1]];
  const second = codes[codes[codeIdx + 2]];
  const position = codes[codeIdx + 3];
  codes[position] = first * second;
  return { codes, codeIdx: (codeIdx + 4) };
}

/**
 * Iterate opCodes
 *
 * @param {Array} opCodes - The list of opCodes
 * @returns {Array} - The updated final program
 */
function iterateOpCodes(opCodes) {
  let codes = opCodes.slice();
  let result;
  for (let opIdx = 0; opIdx < codes.length;) {
    switch (codes[opIdx]) {
      case 1:
        result = add(codes, opIdx);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case 2:
        result = multiply(codes, opIdx);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case 99:
        return codes;
      default:
        console.error(`Invalid OpCode: ${codes[opIdx]} for ${opIdx} of ${codes}`);
        throw new Error('Invalid OpCode');
    }
  }
}

/**
 * Reset the OpCodes with a noun and verb
 *
 * @param {number} noun - The noun for the operation
 * @param {number} verb - The verb for the operation
 * @returns {Array} - The reset OpCodes
 */
function resetOpCodes(noun, verb) {
  const opCodes = fs.readFileSync(argv.data, 'utf-8').replace('\n', '').split(',');
  opCodes.forEach((value, idx) => opCodes[idx] = Number.parseInt(value, 10));
  opCodes[1] = noun;
  opCodes[2] = verb;
  return opCodes;
}

module.exports = { add, iterateOpCodes, multiply };

if (require.main === module) {
  let codes = resetOpCodes(12, 2);
  let result = iterateOpCodes(codes);
  process.stdout.write(`Result is: ${result}\n`);
  process.stdout.write(`Position 0 is: ${result[0]}\n`);

  for (let noun = 0; noun <= 99; noun += 1) {
    for (let verb = 0; verb <= 99; verb +=1) {
      result = iterateOpCodes(resetOpCodes(noun, verb));
      if (result[0] === 19690720) {
        process.stdout.write(`Noun: ${noun}, Verb: ${verb}, Input: ${100 * noun + verb}\n`)
      }
    }
  }
}
