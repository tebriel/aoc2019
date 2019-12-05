const {
  add,
  equals,
  iterateOpCodes,
  jumpIfTrue,
  jumpIfFalse,
  lessThan,
  multiply
} = require('./index');

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
      expect(add(codes, opIdx, '')).toStrictEqual({
        codeIdx: opIdx + 4,
        codes: expected
      });
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
      expect(multiply(codes, opIdx, '')).toStrictEqual({
        codeIdx: opIdx + 4,
        codes: expected
      });
    });
  });

  describe('Tests the LessThan OpCode', () => {
    test.each([
      [
        [7, 4, 4, 5, 99, 7],
        [7, 4, 4, 5, 99, 0]
      ],
      [
        [7, 3, 4, 5, 99, 7],
        [7, 3, 4, 5, 99, 1]
      ]
    ])('.lessThan(%j, %i)', (codes, expected) => {
      expect(lessThan(codes, 0, '')).toStrictEqual({
        codeIdx: 4,
        codes: expected
      });
    });
  });

  describe('Tests the Equals OpCode', () => {
    test.each([
      [
        [7, 4, 4, 5, 99, 7],
        [7, 4, 4, 5, 99, 1]
      ],
      [
        [7, 3, 4, 5, 99, 7],
        [7, 3, 4, 5, 99, 0]
      ]
    ])('.equals(%j, %i)', (codes, expected) => {
      expect(equals(codes, 0, '')).toStrictEqual({
        codeIdx: 4,
        codes: expected
      });
    });
  });


  describe('Tests the Jump If OpCodes', () => {
    test.each([
      [
        [5, 3, 0, 3, 99],
        5
      ],
      [
        [5, 5, 4, 5, 99, 0],
        3
      ]
    ])('.jumpIfTrue(%j, %i)', (codes, expected) => {
      expect(jumpIfTrue(codes, 0, '')).toStrictEqual({
        codeIdx: expected,
        codes: codes
      });
    });

    test.each([
      [
        [6, 3, 0, 3, 99],
        3
      ],
      [
        [6, 5, 4, 5, 5, 0],
        5
      ]
    ])('.jumpIfFalse(%j, %i)', (codes, expected) => {
      expect(jumpIfFalse(codes, 0, '')).toStrictEqual({
        codeIdx: expected,
        codes: codes
      });
    });
  });

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
});
