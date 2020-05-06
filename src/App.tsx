import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import produce from 'immer';

const NUM_ROWS = 5;
const NUM_COLS = 5;

const OPERATIONS = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

type Grid = number[][];

const App: React.FC = () => {
  const [grid, setGrid]: [Grid, (grid: Grid) => void] = useState(() => {
    const rows = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      rows.push(Array.from(Array(NUM_COLS), () => 0));
    }
    return rows;
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const isNeighborWithinBound = (row: number, col: number): boolean =>
    row >= 0 && row < NUM_ROWS && col >= 0 && col < NUM_COLS;

  const runSimulation = () => {
    if (!runningRef.current) {
      return;
    }

    console.log('old grid');
    console.log(grid);

    const newGrid = produce(grid, (gridCopy: Grid) => {
      for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
          let neighbors = 0;
          OPERATIONS.forEach(([x, y]) => {
            const newRow = row + x;
            const newCol = col + y;

            if (isNeighborWithinBound(newRow, newCol)) {
              neighbors += grid[newRow][newCol];
            }
          });

          if (neighbors < 2 || neighbors > 3) {
            gridCopy[row][col] = 0;
          } else if (grid[row][col] === 0 && neighbors === 3) {
            console.log('ALIVE in ', row, col);
            gridCopy[row][col] = 1;
          }
        }
      }
    });

    console.log('updated grid');
    console.log(newGrid);
    setGrid(newGrid);
    console.log('after save grid');
    console.log(grid);

    setTimeout(runSimulation, 1000);
  };

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          runningRef.current = true;
          runSimulation();
        }}
      >
        {running ? 'stop' : 'start'}
      </button>

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
                backgroundColor: col ? 'pink' : undefined,
                border: '1px solid black',
              }}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[rowIndex][colIndex] = col ? 0 : 1;
                });
                setGrid(newGrid);
                console.log('update');
                console.log(grid);
              }}
            ></div>
          ))
        )}
      </div>
    </>
  );
};

export default App;
