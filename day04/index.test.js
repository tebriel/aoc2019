const {
  arraysAreEqual,
  arrayFromString,
  incrementArray,
  isValidCode
} = require('./index');

describe('Test Code Validation', () => {
  test.each([
    [111111, true],
    [223450, false],
    [123789, false]
  ])('.isValidCode(%i)', (code, expected) => {
    const codeArray = arrayFromString(code.toString());
    expect(isValidCode(codeArray)).toBe(expected);
  });

  test.each([
    ['111111', Int8Array.from([1, 1, 1, 1, 1, 1])],
    ['123456', Int8Array.from([1, 2, 3, 4, 5, 6])]
  ])('.arrayFromString(%i)', (code, expected) => {
    expect(arrayFromString(code)).toStrictEqual(expected);
  });

  test('.arraysAreEqual(Int8Array [ 1, 2, 3, 4, 5, 6 ])', () => {
    const a = Int8Array.from([1, 2, 3, 4, 5, 6]);
    const b = Int8Array.from(a);
    expect(arraysAreEqual(a, b)).toBe(true);
  });

  test.each([
    [Int8Array.from([1, 1, 1, 1, 1, 1]), Int8Array.from([1, 1, 1, 1, 1, 2])],
    [Int8Array.from([1, 1, 1, 1, 1, 9]), Int8Array.from([1, 1, 1, 1, 2, 0])],
    [Int8Array.from([1, 9, 9, 9, 9, 9]), Int8Array.from([2, 0, 0, 0, 0, 0])]
  ])('.incrementArray(%s)', (item, expected) => {
    expect(incrementArray(item)).toStrictEqual(expected);
  });
});
