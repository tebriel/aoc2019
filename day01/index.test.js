const { calculate_fuel, calculate_total } = require('./index');

describe('Tests the Fuel Calculation Module', () => {
  test.each([
    [12, 2],
    [14, 2],
    [1969, 654],
    [100756, 33583],
    [2, 0],
    ['12', 2],
    ['f', 0]
  ])('.calculate_fuel(%i)', (mass, expected) => {
    expect(calculate_fuel(mass)).toBe(expected);
  });

  test.each([
    [[12, 14, 1969, 100756], 34241]
  ])('.calculate_total(%j)', (masses, expected) => {
    expect(calculate_total(masses)).toBe(expected);
  });
});
