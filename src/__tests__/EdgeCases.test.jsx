import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Edge Cases', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('rps-settings', 'invalid{json');
    render(<App />);
    expect(screen.getByText(/Rock Paper Scissors Card Game/i)).toBeInTheDocument();
  });

  test('handles empty localStorage', () => {
    localStorage.clear();
    render(<App />);
    expect(screen.getByText(/Rock Paper Scissors Card Game/i)).toBeInTheDocument();
  });

  test('navigates to instructions and back', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Instructions/i));
    expect(screen.getByText(/How to Play/i)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText(/Back to Menu/i));
    expect(screen.getByText(/New Game/i)).toBeInTheDocument();
  });

  test('navigates to deck builder and back', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Build Custom Deck/i));
    expect(screen.getByText(/Build Your Deck/i)).toBeInTheDocument();
    
    fireEvent.click(screen.getByText(/Back/i));
    expect(screen.getByText(/New Game/i)).toBeInTheDocument();
  });

  test('opens and closes settings panel', () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText(/Open settings/i));
    expect(screen.getByText('Settings')).toBeInTheDocument();
    
    fireEvent.click(screen.getByLabelText(/Close settings/i));
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });
});
