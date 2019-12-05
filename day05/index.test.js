const {
  iterateOpCodes
} = require('./index');

describe('Tests An Entire OpCode', () => {
  test.each([
    [
      [1, 1, 1, 4, 99, 5, 6, 0, 99],
      [30, 1, 1, 4, 2, 5, 6, 0, 99]
    ],
    [
      [1002, 4, 3, 4, 33],
      [1002, 4, 3, 4, 99]
    ]
  ])('.iterateOpCodes(%j)', (codes, expected) => {
    expect(iterateOpCodes(codes)).toStrictEqual(expected);
  });
});
