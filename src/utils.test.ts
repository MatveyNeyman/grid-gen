import mockGrid from './mockGrid.json';
import { getLiveNeighboursQty, makeEmptyGrid } from './utils';

test('cell coordinates are correct', () => {
	const grid = makeEmptyGrid(3);
	const x = 1;
	const y = 2;
	const cell = grid[y][x];

	expect(cell.x).toEqual(x);
	expect(cell.y).toEqual(y);
});

test('alive neighbours number is correct', () => {
	const cell = {
		x: 0,
		y: 0,
		isAlive: false,
	};

	const count = getLiveNeighboursQty(mockGrid, cell);

	expect(count).toEqual(1);
});
