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
 * @param {string} mode - The opCode mode
 * @returns {number} - The value
 */
function getValue(opCodes, index, mode) {
  if (mode === MODE_VALUE) {
    return opCodes[opCodes[index]];
  } else if (mode === MODE_IMMEDIATE) {
    return opCodes[index];
  }
}

module.exports = {
  createModeArray,
  getValue
};
