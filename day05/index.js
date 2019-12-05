#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const process = require('process');

const opcodes = require('./lib/opcodes');

/**
 * Iterate opCodes
 *
 * @param {Array} opCodes - The list of opCodes
 * @param {number} inputVal - The input value handed to the app
 * @returns {Array} - The updated final program
 */
function iterateOpCodes(opCodes, inputVal) {
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
        result = opcodes.input(codes, opIdx, inputVal);
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
  const codes = fs.readFileSync(argv.data, 'utf-8').replace('\n', '').split(',');
  let iVal = argv.input || 1;
  iVal = Number.parseInt(iVal, 10);
  // eslint-disable-next-line no-return-assign
  codes.forEach((value, idx) => codes[idx] = Number.parseInt(value, 10));
  let result = iterateOpCodes(codes, iVal);
  result.outputs.forEach((output) => process.stdout.write(`Output: ${output}\n`));
  process.stdout.write(`Position 0 is: ${result.codes[0]}\n`);
}
