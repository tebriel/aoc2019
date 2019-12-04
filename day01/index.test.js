const { calculate_fuel, calculate_fuel_for_fuel, calculate_total } = require('./index');

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
    [[1969], 966],
    [[100756], 50346],
    [[12, 14, 1969, 100756], 51316]
  ])('.calculate_total(%j)', (masses, expected) => {
    const total = calculate_total(masses);
    expect(total.fuel + total.fuelForFuel).toBe(expected);
  });

  test.each([
    [2, 0],
    [1969, 312],
    [100756, 16763]
  ])('.calculate_fuel_for_fuel(%i)', (mass, expected) => {
    const fuel = calculate_fuel(mass);
    expect(calculate_fuel_for_fuel(fuel)).toBe(expected);
  });
});
