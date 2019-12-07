const { processLine } = require('./index');
const { NodeTree } = require('./lib/node');

describe('Main functionality', () => {
  test.each([
    'ZR5)FZS'
  ])('.processLine(com, %s)', (line) => {
    const items = line.split(')');
    const com = new NodeTree();
    processLine(com, line);
    expect(com.tree[items[0]].children[0]).toStrictEqual(com.tree[items[1]]);
  });

  test('Build a full tree', () => {
    const input = [
      'COM)B',
      'B)C',
      'C)D',
      'D)E',
      'E)F',
      'B)G',
      'G)H',
      'D)I',
      'E)J',
      'J)K',
      'K)L'
    ];
    const com = new NodeTree();
    input.forEach((pair) => processLine(com, pair));
    expect(com.leafs().length).toBe(4);
    const orbits = com.orbits();
    expect(orbits.direct + orbits.indirect).toBe(42);
  });

  test('Steps', () => {
    const input = [
      'COM)B',
      'B)C',
      'C)D',
      'D)E',
      'E)F',
      'B)G',
      'G)H',
      'D)I',
      'E)J',
      'J)K',
      'K)L',
      'K)YOU',
      'I)SAN'
    ];
    const com = new NodeTree();
    input.forEach((pair) => processLine(com, pair));
    expect(com.transfers()).toBe(4);
  });
});
