const {
  calculateCoordinates,
  findDistanceClosestIntersection,
  findIntersections,
  moveX,
  moveY
} = require('./index');

describe('Integration Test', () => {
  test.each([
    [
      'R75,D30,R83,U83,L12,D49,R71,U7,L72',
      'U62,R66,U55,R34,D71,R55,D58,R83',
      159
    ],
    [
      'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
      'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
      135
    ]
  ])('Intersection of %s and %s', (first, second, expected) => {
    expect(findDistanceClosestIntersection(first, second)).toBe(expected);
  });
});

describe('Test distance Calculator', () => {
  test('Move Right', () => {
    const expected = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 }
    ];
    expect(moveX('5', { x: 0, y: 0 }, 1)).toStrictEqual(expected);
  });

  test('Move Left', () => {
    const expected = [
      { x: -1, y: 0 },
      { x: -2, y: 0 },
      { x: -3, y: 0 },
      { x: -4, y: 0 },
      { x: -5, y: 0 }
    ];
    expect(moveX('5', { x: 0, y: 0 }, -1)).toStrictEqual(expected);
  });

  test('Move Up', () => {
    const expected = [
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
      { x: 0, y: 4 },
      { x: 0, y: 5 }
    ];
    expect(moveY('5', { x: 0, y: 0 }, 1)).toStrictEqual(expected);
  });

  test('Move Down', () => {
    const expected = [
      { x: 0, y: -1 },
      { x: 0, y: -2 },
      { x: 0, y: -3 },
      { x: 0, y: -4 },
      { x: 0, y: -5 }
    ];
    expect(moveY('5', { x: 0, y: 0 }, -1)).toStrictEqual(expected);
  });

  test('Calculate Coordinates', () => {
    const expected = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
      { x: -1, y: 2 },
      { x: -1, y: 1 },
      { x: -1, y: 0 }
    ];
    const instructions = ['R2', 'U2', 'L3', 'D2'];
    expect(calculateCoordinates(instructions)).toStrictEqual(expected);
  });

  test('Find Overlap', () => {
    const first = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 }
    ];
    const second = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ];
    const expected = [second[2]];
    expect(findIntersections(first, second)).toStrictEqual(expected);
  });
});
