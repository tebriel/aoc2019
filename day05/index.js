#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const process = require('process');

const MODE_VALUE = '0';
const MODE_IMMEDIATE = '1';

/**
 * Create Mode array
 *
 * @param {string} modeStr - The mode string
 * @param {number} count - How many parameters are referenced
 * @returns {Array} - The mode string in order
 *
 * @example
 * // returns [ 0, 1, 0 ]
 * createModeArray('10', 3)
 */
function createModeArray(modeStr, count) {
  return modeStr
    .padStart(count, '0')
    .split('')
    .reverse();
}

/**
 * Get a value from the opcodes list
 *
 * @param {Array} opCodes - The list of opCodes
 * @param {number} index - The index of the item
 * @param {number} mode - The opCode mode
 * @returns {number} - The value
 */
function getValue(opCodes, index, mode) {
  if (mode === MODE_VALUE) {
    return opCodes[opCodes[index]];
  } else if (mode === MODE_IMMEDIATE) {
    return opCodes[index];
  }
}

/**
 * Add OpCode
 *
 * @param {Array} opCodes - The full OpCode array.
 * @param {number} codeIdx - The index of the add operation
 * @param {string} mode - The mode of the input.
 * @returns {object} - The codes and the index of the next operation
 */
function add(opCodes, codeIdx, mode) {
  const modeItems = createModeArray(mode, 3);
  const codes = opCodes.slice();
  const first = getValue(codes, codeIdx + 1, modeItems[0]);
  const second = getValue(codes, codeIdx + 2, modeItems[1]);
  const position = codes[codeIdx + 3];
  codes[position] = first + second;
  return { codes, codeIdx: (codeIdx + 4) };
}

/**
 * Multiply OpCode
 *
 * @param {Array} opCodes - The full OpCode array.
 * @param {number} codeIdx - The index of the multiply operation
 * @param {string} mode - The mode of the input.
 * @returns {object} - The codes and the index of the next operation
 */
function multiply(opCodes, codeIdx, mode) {
  const modeItems = createModeArray(mode, 3);
  const codes = opCodes.slice();
  const first = getValue(codes, codeIdx + 1, modeItems[0]);
  const second = getValue(codes, codeIdx + 2, modeItems[1]);
  const position = codes[codeIdx + 3];
  codes[position] = first * second;
  return { codes, codeIdx: (codeIdx + 4) };
}

/**
 * Input OpCode
 *
 * @param {Array} opCodes - The full OpCode array.
 * @param {number} codeIdx - The index of the multiply operation
 * @param {number} value - The input for this operation
 * @returns {object} - The codes and the index of the next operation
 */
function input(opCodes, codeIdx, value = 5) {
  const codes = opCodes.slice();
  const position = codes[codeIdx + 1];
  codes[position] = value;
  return { codes, codeIdx: (codeIdx + 2) };
}

/**
 * Output OpCode
 *
 * @param {Array} opCodes - The full OpCode array.
 * @param {number} codeIdx - The index of the multiply operation
 * @param {string} mode - The mode of the input.
 * @returns {object} - The codes and the index of the next operation
 */
function output(opCodes, codeIdx, mode) {
  const modeItems = createModeArray(mode, 1);
  const codes = opCodes.slice();
  const value = getValue(codes, codeIdx + 1, modeItems[0]);
  process.stdout.write(`Output: ${value}\n`);
  return { codes, codeIdx: (codeIdx + 2) };
}

/**
 * JumpIfTrue OpCode
 *
 * @param {Array} opCodes - The full OpCode array.
 * @param {number} codeIdx - The index of the multiply operation
 * @param {string} mode - The mode of the input.
 * @returns {object} - The codes and the index of the next operation
 */
function jumpIfTrue(opCodes, codeIdx, mode) {
  const modeItems = createModeArray(mode, 2);
  const codes = opCodes.slice();
  const first = getValue(codes, codeIdx + 1, modeItems[0]);
  const second = getValue(codes, codeIdx + 2, modeItems[1]);

  if (first !== 0) {
    return { codes, codeIdx: second };
  }

  return { codes, codeIdx: (codeIdx + 3) };
}

/**
 * JumpIfFalse OpCode
 *
 * @param {Array} opCodes - The full OpCode array.
 * @param {number} codeIdx - The index of the multiply operation
 * @param {string} mode - The mode of the input.
 * @returns {object} - The codes and the index of the next operation
 */
function jumpIfFalse(opCodes, codeIdx, mode) {
  const modeItems = createModeArray(mode, 2);
  const codes = opCodes.slice();
  const first = getValue(codes, codeIdx + 1, modeItems[0]);
  const second = getValue(codes, codeIdx + 2, modeItems[1]);

  if (first === 0) {
    return { codes, codeIdx: second };
  }

  return { codes, codeIdx: (codeIdx + 3) };
}

/**
 * LessThan OpCode
 *
 * @param {Array} opCodes - The full OpCode array.
 * @param {number} codeIdx - The index of the multiply operation
 * @param {string} mode - The mode of the input.
 * @returns {object} - The codes and the index of the next operation
 */
function lessThan(opCodes, codeIdx, mode) {
  const modeItems = createModeArray(mode, 3);
  const codes = opCodes.slice();
  const first = getValue(codes, codeIdx + 1, modeItems[0]);
  const second = getValue(codes, codeIdx + 2, modeItems[1]);
  const position = codes[codeIdx + 3];

  if (first < second) {
    codes[position] = 1;
  } else {
    codes[position] = 0;
  }

  return { codes, codeIdx: (codeIdx + 4) };
}

/**
 * Equals OpCode
 *
 * @param {Array} opCodes - The full OpCode array.
 * @param {number} codeIdx - The index of the multiply operation
 * @param {string} mode - The mode of the input.
 * @returns {object} - The codes and the index of the next operation
 */
function equals(opCodes, codeIdx, mode) {
  const modeItems = createModeArray(mode, 3);
  const codes = opCodes.slice();
  const first = getValue(codes, codeIdx + 1, modeItems[0]);
  const second = getValue(codes, codeIdx + 2, modeItems[1]);
  const position = codes[codeIdx + 3];

  if (first === second) {
    codes[position] = 1;
  } else {
    codes[position] = 0;
  }

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
    let fullCode = codes[opIdx].toString().padStart(2, '0');
    let currentCode = fullCode.slice(fullCode.length - 2);
    let mode = fullCode.slice(0, fullCode.length - 2);
    switch (currentCode) {
      case '01':
        result = add(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '02':
        result = multiply(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '03':
        result = input(codes, opIdx);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '04':
        result = output(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '05':
        result = jumpIfTrue(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '06':
        result = jumpIfFalse(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '07':
        result = lessThan(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '08':
        result = equals(codes, opIdx, mode);
        opIdx = result.codeIdx;
        codes = result.codes;
        break;
      case '99':
        return codes;
      default:
        process.stderr.write(`Invalid OpCode: ${currentCode} for ${opIdx} of ${codes}\n`);
        throw new Error(`Invalid OpCode: ${currentCode}`);
    }
  }
}

module.exports = {
  add,
  equals,
  iterateOpCodes,
  jumpIfTrue,
  jumpIfFalse,
  input,
  lessThan,
  multiply
};

if (require.main === module) {
  const codes = fs.readFileSync(argv.data, 'utf-8').replace('\n', '').split(',');
  // eslint-disable-next-line no-return-assign
  codes.forEach((value, idx) => codes[idx] = Number.parseInt(value, 10));
  let result = iterateOpCodes(codes);
  process.stdout.write(`Result is: ${result}\n`);
  process.stdout.write(`Position 0 is: ${result[0]}\n`);
}
