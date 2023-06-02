import React, { useState } from "react";

export interface TreeNode {
  id: number;
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  x: number;
  y: number;
}

interface TreeVisualizationProps {
  tree: TreeNode | null;
}

export const TreeVisualization: React.FC<TreeVisualizationProps> = ({
  tree,
}) => {
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);

  const handleClick = (value: number) => {
    const highlighted = [];
    let node = findNode(tree, value);
    while (node) {
      highlighted.unshift(node.value);
      node = findParentNode(tree, node);
    }
    setHighlightedNodes(highlighted);
  };

  const findNode = (node: TreeNode | null, value: number): TreeNode | null => {
    if (!node) return null;
    if (node.value === value) return node;
    return findNode(node.left!, value) || findNode(node.right!, value);
  };

  const findParentNode = (
    node: TreeNode | null,
    childNode: TreeNode
  ): TreeNode | null => {
    if (!node) return null;
    if (node.left === childNode || node.right === childNode) return node;
    return (
      findParentNode(node.left!, childNode) ||
      findParentNode(node.right!, childNode)
    );
  };

  const renderTreeNode = (node: TreeNode | null): JSX.Element | null => {
    if (!node) return null;

    return (
      <g key={node.id}>
        <circle
          cx={node.x}
          cy={node.y}
          r={20}
          fill={highlightedNodes.includes(node.value) ? "yellow" : "white"}
          stroke="black"
          strokeWidth={2}
          onClick={() => handleClick(node.value)}
        />
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {node.value}
        </text>
        {node.left && (
          <>
            <line
              x1={node.x}
              y1={node.y}
              x2={node.left.x}
              y2={node.left.y}
              stroke="black"
            />
            {renderTreeNode(node.left)}
          </>
        )}
        {node.right && (
          <>
            <line
              x1={node.x}
              y1={node.y}
              x2={node.right.x}
              y2={node.right.y}
              stroke="black"
            />
            {renderTreeNode(node.right)}
          </>
        )}
      </g>
    );
  };

  return (
    <svg width="800" height="500">
      {renderTreeNode(tree)}
    </svg>
  );
};
