class Node {
  /**
   * Build a node object
   *
   * @param {Node} parent - The parent of this node.
   * @param {string} name - The name of this node.
   */
  constructor(parent, name) {
    this.parent = parent;
    this.children = [];
    this.name = name;
  }

  /**
   * Add a child of this node
   *
   * @param {Node} child - The child of this node.
   */
  addChild(child) {
    this.children.push(child);
  }
}

class NodeTree {
  constructor() {
    this.tree = { COM: new Node(undefined, 'COM') };
  }

  add(name, child) {
    if (!this.tree[name]) {
      this.tree[name] = new Node(name);
    }
    if (!this.tree[child]) {
      this.tree[child] = new Node(this.tree[name], child);
    } else {
      this.tree[child].parent = this.tree[name];
    }

    this.tree[name].addChild(this.tree[child]);
  }

  /**
   * Find all leafs
   *
   * @returns {Array} - A list of all leaf nodes
   */
  leafs() {
    return Object.values(this.tree).filter((node) => node.children.length === 0);
  }

  /**
   * Sum up the orbits
   *
   * @returns {object} - The direct and indirect orbits
   */
  orbits() {
    const result = { indirect: 0, direct: 0 };
    Object.values(this.tree).forEach((leaf) => {
      if (leaf === this.tree.COM) {
        return;
      }

      let current = leaf.parent;
      result.direct += 1;
      while (current.parent != null) {
        result.indirect += 1;
        current = current.parent;
      }
    });
    return result;
  }

  /**
   * Count the number of transfers to get from YOU to SAN
   *
   * @returns {number} - The number of steps.
   */
  transfers() {
    let commonParent;
    let sanParents = [];
    let youParents = [];
    let steps = 0;
    let current = this.tree.SAN;
    while (current.parent != null) {
      sanParents.push(current.parent);
      current = current.parent;
    }
    current = this.tree.YOU;
    while (current.parent != null) {
      youParents.push(current.parent);
      current = current.parent;
    }
    sanParents = sanParents.reverse();
    youParents = youParents.reverse();
    for (let i = 0; i < youParents.length; i += 1) {
      if (sanParents[i] !== youParents[i]) {
        commonParent = sanParents[i - 1];
        break;
      }
    }
    current = this.tree.YOU;
    while (current.parent !== commonParent) {
      steps += 1;
      current = current.parent;
    }
    current = this.tree.SAN;
    while (current.parent !== commonParent) {
      steps += 1;
      current = current.parent;
    }
    return steps;
  }
}

module.exports = { NodeTree };
