const { createModeArray, getValue } = require('./helpers');

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
function input(opCodes, codeIdx, value) {
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

module.exports = {
  add,
  equals,
  input,
  jumpIfTrue,
  jumpIfFalse,
  lessThan,
  multiply,
  output
};
