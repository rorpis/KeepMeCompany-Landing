// layoutUtils.js

/**
 * Computes new node positions using an iterative, top-down cascading algorithm.
 * It uses the parent-child relationships (derived from edges) to reposition nodes.
 *
 * @param {Array} nodes - Array of current nodes.
 * @param {Array} edges - Array of current edges.
 * @param {number} verticalGap - The vertical spacing between levels.
 * @param {number} horizontalGap - The horizontal spacing between siblings.
 * @returns {Array} - Updated nodes with new positions.
 */
export function autoLayoutNodes(nodes, edges, verticalGap = 150, horizontalGap = 350) {
    // Build maps for parent-child relationships.
    const parentToChildren = {};
    const childToParents = {};
    edges.forEach(edge => {
      if (!parentToChildren[edge.source]) parentToChildren[edge.source] = [];
      parentToChildren[edge.source].push(edge.target);
      if (!childToParents[edge.target]) childToParents[edge.target] = [];
      childToParents[edge.target].push(edge.source);
    });
  
    // Create a copy of the current nodes for iterative processing.
    let currentNodes = nodes.map((node) => ({ ...node }));
    let iterations = 0;
    const maxIterations = 10;  // Prevent infinite loops
    let changed = true;
  
    // Iterate until no changes occur or maximum iterations reached.
    while (changed && iterations < maxIterations) {
      changed = false;
      const newNodes = currentNodes.map((node) => {
        // If node has no parents, it is a root node; leave its position unchanged.
        if (!childToParents[node.id]) {
          return node;
        }
  
        // Get all parent nodes.
        const parents = childToParents[node.id]
          .map(parentId => currentNodes.find(n => n.id === parentId))
          .filter(Boolean);
        // Determine vertical position based on the lowest parent's Y.
        const maxParentY = Math.max(...parents.map(p => p.position.y));
        const newY = maxParentY + verticalGap;
  
        let newX;
        if (parents.length === 1) {
          // Single parent: use parent's children ordering to compute offset.
          const parent = parents[0];
          const siblings = parentToChildren[parent.id];
          const siblingIndex = siblings.indexOf(node.id);
          if (siblings.length === 1) {
            newX = parent.position.x;
          } else {
            const offset = (siblingIndex - (siblings.length - 1) / 2) * horizontalGap;
            newX = parent.position.x + offset;
          }
        } else {
          // Multiple parents: average their X positions.
          const sumX = parents.reduce((sum, p) => sum + p.position.x, 0);
          newX = sumX / parents.length;
        }
  
        // Mark as changed if the new position differs from the current one.
        if (newX !== node.position.x || newY !== node.position.y) {
          changed = true;
        }
  
        return {
          ...node,
          position: { x: newX, y: newY },
          // Ensure ReactFlow recalculates the absolute position if needed.
          positionAbsolute: { x: newX, y: newY },
        };
      });
      currentNodes = newNodes;
      iterations++;
    }
  
    // Post-processing: Adjust sibling nodes to enforce a minimum horizontal gap.
    for (const parentId in parentToChildren) {
      const childrenIds = parentToChildren[parentId];
      // Get the actual node objects for the children.
      let siblings = currentNodes.filter(node => childrenIds.includes(node.id));
      // Sort siblings by their x position.
      siblings.sort((a, b) => a.position.x - b.position.x);
      // For each adjacent pair, ensure they are at least horizontalGap apart.
      for (let i = 1; i < siblings.length; i++) {
        const leftNode = siblings[i - 1];
        const currentNode = siblings[i];
        const gap = currentNode.position.x - leftNode.position.x;
        if (gap < horizontalGap) {
          const shift = horizontalGap - gap;
          currentNode.position.x += shift;
          currentNode.positionAbsolute.x += shift;
        }
      }
    }
  
    return currentNodes;
  }
  