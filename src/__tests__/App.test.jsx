import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('displays game title on start screen', () => {
    render(<App />);
    expect(screen.getByText(/Rock Paper Scissors Card Game/i)).toBeInTheDocument();
  });

  test('displays menu buttons', () => {
    render(<App />);
    expect(screen.getByText(/New Game/i)).toBeInTheDocument();
    expect(screen.getByText(/Build Custom Deck/i)).toBeInTheDocument();
    expect(screen.getByText(/Import Deck/i)).toBeInTheDocument();
    expect(screen.getByText(/Instructions/i)).toBeInTheDocument();
  });
});
