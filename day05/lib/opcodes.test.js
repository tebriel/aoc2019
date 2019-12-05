const {
  add,
  equals,
  input,
  jumpIfTrue,
  jumpIfFalse,
  lessThan,
  multiply
} = require('./opcodes');

describe('OpCodes', () => {
  test.each([
    [
      [3, 0, 0, 0, 99],
      0, 7,
      [7, 0, 0, 0, 99]
    ],
    [
      [3, 4, 0, 0, 99],
      0, 7,
      [3, 4, 0, 0, 7]
    ]
  ])('.input(%j, %i)', (codes, opIdx, value, expected) => {
    expect(input(codes, opIdx, value)).toStrictEqual({
      codeIdx: opIdx + 2,
      codes: expected
    });
  });

  test.each([
    [
      [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
      0, '',
      [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
    ],
    [
      [1, 0, 0, 0, 99],
      0, '',
      [2, 0, 0, 0, 99]
    ]
  ])('.add(%j, %i)', (codes, opIdx, mode, expected) => {
    expect(add(codes, opIdx, mode)).toStrictEqual({
      codeIdx: opIdx + 4,
      codes: expected
    });
  });

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
