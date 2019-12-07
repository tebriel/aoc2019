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
 * @returns {Array} - The updated final program
 */
function iterateOpCodes(opCodes) {
  let codes = opCodes.slice();
  let result = { codeIdx: 0, codes: codes };
  let outputs = [];
  return function inner(iVal) {
    let tmpInput = iVal;
    for (let opIdx = result.codeIdx; opIdx < codes.length;) {
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
          if (tmpInput == null) {
            return;
          }
          result = opcodes.input(codes, opIdx, tmpInput);
          opIdx = result.codeIdx;
          codes = result.codes;
          tmpInput = undefined;
          break;
        case '04':
          result = opcodes.output(codes, opIdx, mode);
          opIdx = result.codeIdx;
          codes = result.codes;
          outputs.push(result.output);
          return result.output;
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
  };
}

module.exports = {
  iterateOpCodes
};

function prepThrusters(codes) {
  return [0, 0, 0, 0, 0].map(() => iterateOpCodes(codes));
}

function signalThrusters(signal, thrusters, index = 0) {
  let stopped = false;
  let results = new Array(5);
  let result = signal;
  while (!stopped) {
    for (let idx = index; idx < thrusters.length; idx += 1) {
      result = thrusters[idx](result);
      results[idx] = result;
      if (typeof result !== 'number') {
        if (typeof results[4] === 'object') {
          return results[4].outputs[results[4].outputs.length - 1];
        }
        return results[4];
      }
    }
  }
}

if (require.main === module) {
  let codes = fs.readFileSync(argv.data, 'utf-8').replace('\n', '').split(',');
  // eslint-disable-next-line no-return-assign
  codes = codes.map((value) => Number.parseInt(value, 10));
  let maxSignal = 0;
  let bestPermute;
  const permutations = getAllPermutations('56789');
  permutations.forEach((perm) => {
    const phases = perm.split('');
    const apps = prepThrusters(codes);
    let result;
    phases.forEach((phase, idx) => {
      apps[idx](Number.parseInt(phase, 10));
    });
    result = signalThrusters(0, apps);
    if (result > maxSignal) {
      bestPermute = perm;
      maxSignal = result;
    }
  });
  process.stdout.write(`Best Permutation is: ${bestPermute} with signal: ${maxSignal}\n`);
}
