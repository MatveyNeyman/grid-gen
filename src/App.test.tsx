import { render, screen } from '@testing-library/react';
import App from './App';

test('render table', () => {
	render(<App />);
	const linkElement = screen.getByTestId('grid-wrapper');
	expect(linkElement).toBeInTheDocument();
});
