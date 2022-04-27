import React from 'react';
import './App.css';
import { Cell, Grid } from './types';
import { getLiveNeighboursQty, initGrid } from './utils';

const GRID_SIZE = 50;

function App() {
	const [grid, setGrid] = React.useState<Grid>(initGrid(GRID_SIZE));

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			setGrid((prevGrid) => {
				const cellsToKill: Cell[] = [];
				const cellsToGiveBirth: Cell[] = [];

				for (let i = 0; i < prevGrid.length; i++) {
					for (let j = 0; j < prevGrid.length; j++) {
						const prevGridCell = prevGrid[j][i];
						const liveNeighboursQty = getLiveNeighboursQty(prevGrid, prevGridCell);

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
						const predicate = (item: Cell) => item.x === cell.x && item.y === cell.y;

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
		<table data-testid="grid-wrapper">
			<tbody>
				{grid.map((_, rowIdx) => (
					<tr key={rowIdx}>
						{grid[rowIdx].map((cell, rowCellIdx) => (
							<td key={rowCellIdx} className={`cell ${cell.isAlive ? 'alive' : ''}`} />
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default App;
