import React, { useEffect } from 'react';
import mockGrid2 from './mockGrid2.json';
import './App.css';

const GRID_SIZE = 50;

interface Coordinates {
	x: number;
	y: number;
}

interface Cell {
	coordinates: Coordinates;
	isAlive: boolean;
}

type Grid = Cell[][];

function makeEmptyGrid(gridSize: number): Grid {
	const grid: Grid = [];

	for (let i = 0; i < gridSize; i++) {
		grid[i] = [];
		for (let j = 0; j < gridSize; j++) {
			grid[i][j] = {
				coordinates: {
					x: j,
					y: i,
				},
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
		coordinates: {
			x: Math.floor(Math.random() * gridSize),
			y: Math.floor(Math.random() * gridSize),
		},
		isAlive: true,
	};
}

function initGrid(gridSize: number): Grid {
	const aliveCellsQty = getAliveCellsRandomQty(gridSize);

	const aliveCells: Cell[] = [];
	for (let i = 0; i < aliveCellsQty; i++) {
		aliveCells.push(getRandomAliveCell(gridSize));
	}

	const grid = makeEmptyGrid(gridSize);

	aliveCells.forEach((cell) => {
		grid[cell.coordinates.y][cell.coordinates.x].isAlive = true;
	});

	return grid;
}

function getLiveNeighboursQty(cell: Cell, grid: Grid): number {
	if (cell.coordinates.x > grid.length - 1 || cell.coordinates.y > grid.length - 1) {
		throw new Error('Cell is out of grid bounds');
	}

	let count = 0;

	for (let dy = cell.coordinates.y > 0 ? -1 : 0; dy <= (cell.coordinates.y < grid.length - 1 ? 1 : 0); dy++) {
		for (let dx = cell.coordinates.x > 0 ? -1 : 0; dx <= (cell.coordinates.x < grid.length - 1 ? 1 : 0); dx++) {
			if (dx !== 0 || dy !== 0) {
				const x = cell.coordinates.x + dx;
				const y = cell.coordinates.y + dy;

				if (grid[y][x].isAlive) {
					count++;
				}
			}
		}
	}

	return count;
}

function App() {
	const [grid, setGrid] = React.useState<Grid>(initGrid(GRID_SIZE));
	// const [grid, setGrid] = React.useState<Grid>(mockGrid2);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setGrid((prevGrid) => {
				const cellsToKill: Cell[] = [];
				const cellsToGiveBirth: Cell[] = [];

				for (let i = 0; i < prevGrid.length; i++) {
					for (let j = 0; j < prevGrid.length; j++) {
						const prevGridCell = prevGrid[j][i];
						const liveNeighboursQty = getLiveNeighboursQty(prevGridCell, prevGrid);

						if (prevGridCell.isAlive) {
							if (liveNeighboursQty < 2 || liveNeighboursQty > 3) {
								cellsToKill.push(prevGridCell);
							}
						} else {
							if (liveNeighboursQty === 3) {
								cellsToGiveBirth.push(prevGridCell);
							}
						}
					}
				}

				return prevGrid.map((row) =>
					row.map((cell) => {
						const predicate = (item: Cell) =>
							item.coordinates.x === cell.coordinates.x && item.coordinates.y === cell.coordinates.y;

						if (cellsToKill.some(predicate)) {
							return {
								...cell,
								isAlive: false,
							};
						} else if (cellsToGiveBirth.some(predicate)) {
							return {
								...cell,
								isAlive: true,
							};
						} else {
							return cell;
						}
					})
				);
			});
		}, 400);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<table>
			<tbody>
				{grid.map((_, rowIdx) => (
					<tr key={rowIdx}>
						{grid[rowIdx].map((cell, rowCellIdx) => (
							<td key={rowCellIdx} className={`cell ${cell.isAlive ? 'alive' : ''}`}>
								{/* {rowCellIdx}, {rowIdx} */}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default App;
