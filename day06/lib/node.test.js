const { NodeTree } = require('./node');

describe('NodeTree()', () => {
  test('Add a child', () => {
    const com = new NodeTree();
    com.add('COM', 'ABC');
    expect(com.tree.ABC.children).toStrictEqual([]);
    expect(Object.keys(com.tree).length).toBe(2);
    expect(com.tree.ABC.parent).toStrictEqual(com.tree.COM);
  });

  test('Find Leafs', () => {
    const com = new NodeTree();
    com.add('COM', 'ABC');
    com.add('ABC', 'DEF');
    expect(com.leafs()).toStrictEqual([com.tree.DEF]);
  });

  test('Count Orbits', () => {
    const com = new NodeTree();
    com.add('COM', 'A');
    com.add('A', 'B');
    com.add('B', 'C');
    com.add('C', 'D');
    expect(com.orbits()).toStrictEqual({ direct: 4, indirect: 6 });
  });
});
