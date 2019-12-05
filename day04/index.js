#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const process = require('process');


/**
 * Determine if a code is valid
 *
 * @param {Int8Array} code - The code to validate
 * @returns {boolean} - If the code is valid
 */
function isValidCode(code) {
  // 6 Digit Number
  if (code.length !== 6) {
    return false;
  }

  // Never descending
  const sorted = new Int8Array(code).sort();
  for (let idx = 0; idx < sorted.length; idx += 1) {
    if (code[idx] !== sorted[idx]) {
      return false;
    }
  }

  // At least 2 digits repeating
  let hasDupes = false;
  for (let idx = 1; idx < code.length; idx += 1) {
    if (code[idx] === code[idx - 1]) {
      hasDupes = true;
      break;
    }
  }
  if (!hasDupes) {
    return false;
  }

  return true;
}

/**
 * Convert a string of digits to an Array of Digits
 *
 * @param {string} input - The string input
 * @returns {Int8Array} - The converted array
 *
 * @example
 * // returns Int8Array [ 1, 1, 1, 1, 1, 1 ]
 * arrayFromString('111111')
 */
function arrayFromString(input) {
  const digits = input.split('');
  return Int8Array.from(digits.map((digit) => Number.parseInt(digit, 10)));
}

/**
 * Determine if two arrays are equal
 *
 * @param {Int8Array} a - The first array
 * @param {Int8Array} b - The second array
 * @returns {boolean} - If they're equal or not
 */
function arraysAreEqual(a, b) {
  for (let idx = 0; idx < a.length; idx += 1) {
    if (a[idx] !== b[idx]) {
      return false;
    }
  }
  return true;
}

/**
 * Increment an array
 *
 * @param {Int8Array} item - The thing to increment
 * @returns {Int8Array} - The incremented array
 *
 * @example
 * // returns Int8Array [ 1, 1, 1, 1, 1, 2 ]
 * incrementArray(Int8Array.from([1, 1, 1, 1, 1, 1]))
 */
function incrementArray(item) {
  const work = Int8Array.from(item);
  for (let idx = work.length - 1; idx >= 0; idx -= 1) {
    work[idx] += 1;
    if (work[idx] !== 10) {
      break;
    }
    work[idx] = 0;
  }
  return work;
}

module.exports = {
  arraysAreEqual,
  arrayFromString,
  incrementArray,
  isValidCode
};

if (require.main === module) {
  const input = fs.readFileSync(argv.data, 'utf-8').split('\n')[0].split('-');
  let start = arrayFromString(input[0]);
  const end = arrayFromString(input[1]);
  let validCount = 0;
  while (!arraysAreEqual(start, end)) {
    if (isValidCode(start)) {
      validCount += 1;
    }
    start = incrementArray(start);
  }
  process.stdout.write(`Input: \n\n${input}\n`);
  process.stdout.write(`Valid Possibilities: ${validCount}`);
}
