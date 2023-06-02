import { useState } from "react";
import { BinaryTree, TreeNode, TreeVisualization } from "./components";
import "./App.css";

const App: React.FC = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);

  const handleSubmit = (inputArray: number[]) => {
    const newTree = createBinaryTree(inputArray);
    renderTree(newTree);
  };

  let nodeId = 1;

  const createBinaryTree = (inputArray: number[]): TreeNode | null => {
    if (inputArray.length === 0) {
      return null;
    }

    const rootNode: TreeNode = {
      id: nodeId++,
      value: inputArray[0],
      x: 500,
      y: 20,
    };
    const stack: [TreeNode, number][] = [[rootNode, 0]];

    while (stack.length > 0) {
      const [parent, parentIndex] = stack.pop()!;
      const leftChildIndex = 2 * parentIndex + 1;
      const rightChildIndex = 2 * parentIndex + 2;

      if (leftChildIndex < inputArray.length) {
        const leftChild: TreeNode = {
          id: nodeId++,
          value: inputArray[leftChildIndex],
          x: parent.x - 200 / Math.pow(2, parent.y / 80),
          y: parent.y + 60,
        };
        parent.left = leftChild;
        stack.push([leftChild, leftChildIndex]);
      }

      if (rightChildIndex < inputArray.length) {
        const rightChild: TreeNode = {
          id: nodeId++,
          value: inputArray[rightChildIndex],
          x: parent.x + 200 / Math.pow(2, parent.y / 80),
          y: parent.y + 60,
        };
        parent.right = rightChild;
        stack.push([rightChild, rightChildIndex]);
      }
    }

    return rootNode;
  };

  const renderTree = (tree: TreeNode | null) => {
    setTree(tree);
  };

  return (
    <div className="bt-wrapper">
      <h1>Binary Tree Visualization</h1>
      <BinaryTree onSubmit={handleSubmit} />
      <TreeVisualization tree={tree} />
    </div>
  );
};

export default App;
