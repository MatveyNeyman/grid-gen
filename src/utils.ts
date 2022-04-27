import { Cell, Grid } from './types';

export function initGrid(gridSize: number): Grid {
	const aliveCellsQty = getAliveCellsRandomQty(gridSize);

	const aliveCells: Cell[] = [];
	for (let i = 0; i < aliveCellsQty; i++) {
		aliveCells.push(getRandomAliveCell(gridSize));
	}

	const grid = makeEmptyGrid(gridSize);

	aliveCells.forEach((cell) => {
		grid[cell.y][cell.x].isAlive = true;
	});

	return grid;
}

export function getLiveNeighboursQty(grid: Grid, cell: Cell): number {
	if (cell.x > grid.length - 1 || cell.y > grid.length - 1) {
		throw new Error('Cell is out of grid bounds');
	}

	let count = 0;

	for (let dy = cell.y > 0 ? -1 : 0; dy <= (cell.y < grid.length - 1 ? 1 : 0); dy++) {
		for (let dx = cell.x > 0 ? -1 : 0; dx <= (cell.x < grid.length - 1 ? 1 : 0); dx++) {
			if (dx !== 0 || dy !== 0) {
				const x = cell.x + dx;
				const y = cell.y + dy;

				if (grid[y][x].isAlive) {
					count++;
				}
			}
		}
	}

	return count;
}

export function makeEmptyGrid(gridSize: number): Grid {
	const grid: Grid = [];

	for (let i = 0; i < gridSize; i++) {
		grid[i] = [];
		for (let j = 0; j < gridSize; j++) {
			grid[i][j] = {
				x: j,
				y: i,
				isAlive: false,
			};
		}
	}

	return grid;
}

function getAliveCellsRandomQty(gridSize: number): number {
	return Math.round(Math.random() * gridSize ** 2);
}

function getRandomAliveCell(gridSize: number): Cell {
	return {
		x: Math.floor(Math.random() * gridSize),
		y: Math.floor(Math.random() * gridSize),
		isAlive: true,
	};
}
