const { add, iterateOpCodes, multiply } = require('./index');

describe('Tests the OpCode Processor', () => {
  describe('Tests the Add OpCode', () => {
    test.each([
      [
        [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
        0,
        [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
      ],
      [
        [1, 0, 0, 0, 99],
        0,
        [2, 0, 0, 0, 99]
      ]
    ])('.add(%j, %i)', (codes, opIdx, expected) => {
      expect(add(codes, opIdx)).toStrictEqual(expected);
    });
  });

  describe('Tests the Multiply OpCode', () => {
    test.each([
      [
        [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
        4,
        [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
      ],
      [
        [2, 3, 0, 3, 99],
        0,
        [2, 3, 0, 6, 99]
      ],
      [
        [2, 4, 4, 5, 99, 0],
        0,
        [2, 4, 4, 5, 99, 9801]
      ]
    ])('.multiply(%j, %i)', (codes, opIdx, expected) => {
      expect(multiply(codes, opIdx)).toStrictEqual(expected);
    });
  });

  describe('Tests An Entire OpCode', () => {
    test.each([
      [
        [1, 1, 1, 4, 99, 5, 6, 0, 99],
        [30, 1, 1, 4, 2, 5, 6, 0, 99]
      ]
    ])('.iterateOpCodes(%j)', (codes, expected) => {
      expect(iterateOpCodes(codes)).toStrictEqual(expected);
    });
  });
});
