const {
  iterateOpCodes
} = require('./index');

describe('Tests An Entire OpCode', () => {
  test.each([
    [
      [1, 1, 1, 4, 99, 5, 6, 0, 99],
      undefined,
      { codes: [30, 1, 1, 4, 2, 5, 6, 0, 99], outputs: [] }
    ],
    [
      [1002, 4, 3, 4, 33],
      undefined,
      { codes: [1002, 4, 3, 4, 99], outputs: [] }
    ],
    [
      [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
      8,
      1
    ],
    [
      [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
      7,
      1
    ],
    [
      [3, 3, 1108, -1, 8, 3, 4, 3, 99],
      8,
      1
    ],
    [
      [3, 3, 1107, -1, 8, 3, 4, 3, 99],
      7,
      1
    ],
    [
      [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
      0,
      0
    ],
    [
      [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
      0,
      0
    ]
  ])('.iterateOpCodes(%j, %i)', (codes, inputVal, expected) => {
    expect(iterateOpCodes(codes)(inputVal)).toStrictEqual(expected);
  });

  test.each([
    [7, 999],
    [8, 1000],
    [9, 1001]
  ])('.iterateOpCodes(codes, %i)', (inputVal, expected) => {
    const codes = [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
      1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
      999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99];
    expect(iterateOpCodes(codes)(inputVal)).toStrictEqual(expected);
  });
});
