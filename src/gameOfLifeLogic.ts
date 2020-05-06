import { Grid } from './type';
import produce from 'immer';
import { NUM_ROWS, NUM_COLS, OPERATIONS } from './constants';

const isNeighborWithinBound = (row: number, col: number): boolean =>
    row >= 0 && row < NUM_ROWS && col >= 0 && col < NUM_COLS;


export const createNewGrid = (grid: Grid) => {
    return produce(grid, (gridCopy: Grid) => {
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
                    gridCopy[row][col] = 1;
                }
            }
        }
    });
}