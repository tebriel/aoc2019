const {
  createModeArray,
  getValue
} = require('./helpers');

describe('Helpers', () => {
  test.each([
    ['10', 3, ['0', '1', '0']],
    ['', 3, ['0', '0', '0']],
    ['1', 4, ['1', '0', '0', '0']]
  ])('.createModeArray(%s, %i)', (mode, count, expected) => {
    expect(createModeArray(mode, count)).toStrictEqual(expected);
  });
  test.each([
    [[4, 3, 2, 1], 1, '0', 1],
    [[4, 3, 2, 1], 0, '1', 4]
  ])('.getValue(%j, %i, %s)', (codes, opIdx, mode, expected) => {
    expect(getValue(codes, opIdx, mode)).toBe(expected);
  });
});
