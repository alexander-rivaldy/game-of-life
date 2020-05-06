import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

import { Grid } from './type';
import { NUM_ROWS, NUM_COLS } from './constants';
import { createNewGrid } from './gameOfLifeLogic';

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

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    // @ts-ignore
    setGrid((currGrid) => {
      return createNewGrid(currGrid);
    });

    setTimeout(runSimulation, 500);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
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
              }}
            ></div>
          ))
        )}
      </div>
    </>
  );
};

export default App;
