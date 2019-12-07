#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const process = require('process');

const opcodes = require('./lib/opcodes');

function getAllPermutations(string) {
  var results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (let i = 0; i < string.length; i += 1) {
    let firstChar = string[i];
    let charsLeft = string.substring(0, i) + string.substring(i + 1);
    let innerPermutations = getAllPermutations(charsLeft);
    for (let j = 0; j < innerPermutations.length; j += 1) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

/**
 * Iterate opCodes
 *
 * @param {Array} opCodes - The list of opCodes
 * @param {number} inputVals - The input value handed to the app
 * @returns {Array} - The updated final program
 */
function iterateOpCodes(opCodes, inputVals) {
  let codes = opCodes.slice();
  let result;
  let outputs = [];
  for (let opIdx = 0; opIdx < codes.length;) {
    let fullCode = codes[opIdx].toString().padStart(2, '0');
    let currentCode = fullCode.slice(fullCode.length - 2);
    let mode = fullCode.slice(0, fullCode.length - 2);
    switch (currentCode) {
      case '01':
        result = opcodes.add(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '02':
        result = opcodes.multiply(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '03':
        if (inputVals.length === 0) {
          debugger;
        }
        result = opcodes.input(codes, opIdx, inputVals.shift());
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '04':
        result = opcodes.output(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        outputs.push(result.output);
        break;
      case '05':
        result = opcodes.jumpIfTrue(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '06':
        result = opcodes.jumpIfFalse(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '07':
        result = opcodes.lessThan(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '08':
        result = opcodes.equals(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '99':
        return {
          codes,
          outputs
        };
      default:
        process.stderr.write(`Invalid OpCode: ${currentCode} for ${opIdx} of ${codes}\n`);
        throw new Error(`Invalid OpCode: ${currentCode}`);
    }
  }
}

module.exports = {
  iterateOpCodes
};

if (require.main === module) {
  let codes = fs.readFileSync(argv.data, 'utf-8').replace('\n', '').split(',');
  // eslint-disable-next-line no-return-assign
  codes = codes.map((value) => Number.parseInt(value, 10));
  let maxSignal = 0;
  let bestPermute;
  const permutations = getAllPermutations('01234');
  permutations.forEach((perm) => {
    const phases = perm.split('');
    let output = 0;
    phases.forEach((strPhase) => {
      let phase = Number.parseInt(strPhase, 10);
      output = iterateOpCodes(codes.slice(), [phase, output]).outputs[0];
    });
    if (output == null) {
      return;
    }
    if (output > maxSignal) {
      bestPermute = perm;
      maxSignal = output;
    }
  });
  process.stdout.write(`Best Permutation is: ${bestPermute} with signal: ${maxSignal}\n`);
}
