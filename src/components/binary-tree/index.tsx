import React, { useState } from "react";

interface BinaryTreeProps {
  onSubmit: (inputArray: number[]) => void;
}

export const BinaryTree: React.FC<BinaryTreeProps> = ({ onSubmit }) => {
  const [inputArray, setInputArray] = useState<number[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value
      .split(",")
      .map((value) => parseInt(value.trim(), 10));
    setInputArray(values);
  };

  const handleSubmit = () => {
    onSubmit(inputArray);
  };

  return (
    <div className="bt-input-container">
      <label>
        Enter the binary tree as an array:
        <input type="text" onChange={handleInputChange} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
