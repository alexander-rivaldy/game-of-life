import React, { useState } from 'react';
import './App.css';
import produce from 'immer';

const NUM_ROWS = 50;
const NUM_COLS = 50;

const App: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      rows.push(Array.from(Array(NUM_COLS), () => 0));
    }
    return rows;
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${NUM_COLS}, 20px)`,
      }}
    >
      {grid.map((rows, rowIndex) =>
        rows.map((col, colIndex) => (
          <div
            key={`box-${rowIndex}-${colIndex}`}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[rowIndex][colIndex] ? 'pink' : undefined,
              border: '1px solid black',
            }}
            onClick={() => {
              const newGrid = produce(grid, (gridCopy) => {
                gridCopy[rowIndex][colIndex] = 1;
              });
              setGrid(newGrid);
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default App;
