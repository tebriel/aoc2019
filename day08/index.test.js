const { buildLayer, countInstances } = require('./index');

describe('Day 08', () => {
  test('.buildLayer(\'123456\')', () => {
    const layer = buildLayer('123456', 3, 2);
    const expected = [
      Int8Array.from([1, 2, 3]),
      Int8Array.from([4, 5, 6])
    ];
    expect(layer).toStrictEqual(expected);
  });

  test('.countInstances(layer)', () => {
    const layer = buildLayer('120450', 3, 2);
    expect(countInstances(0, layer)).toBe(2);
  });
});
