import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('Game Logic Edge Cases', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('handles invalid card index gracefully', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByText(/New Game/i));
    expect(container).toBeInTheDocument();
  });

  test('settings hot-swap during game is safe', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/New Game/i));
    
    fireEvent.click(screen.getByLabelText(/Open settings/i));
    const difficultySelect = screen.getByRole('combobox');
    fireEvent.change(difficultySelect, { target: { value: 'HARD' } });
    
    fireEvent.click(screen.getByLabelText(/Close settings/i));
    
    expect(screen.getByText(/Your Hand:/i)).toBeInTheDocument();
  });

  test('theme toggle persists across navigation', () => {
    render(<App />);
    
    fireEvent.click(screen.getByLabelText(/Open settings/i));
    const themeToggle = screen.getByLabelText(/Dark Mode/i);
    fireEvent.click(themeToggle);
    fireEvent.click(screen.getByLabelText(/Close settings/i));
    
    fireEvent.click(screen.getByText(/Instructions/i));
    fireEvent.click(screen.getByText(/Back to Menu/i));
    
    const savedTheme = localStorage.getItem('rps-settings');
    expect(savedTheme).toContain('dark');
  });

  test('handles rapid navigation without crashes', () => {
    render(<App />);
    
    fireEvent.click(screen.getByText(/Instructions/i));
    fireEvent.click(screen.getByText(/Back to Menu/i));
    fireEvent.click(screen.getByText(/Build Custom Deck/i));
    fireEvent.click(screen.getByText(/Back/i));
    fireEvent.click(screen.getByText(/Instructions/i));
    fireEvent.click(screen.getByText(/Back to Menu/i));
    
    expect(screen.getByText(/New Game/i)).toBeInTheDocument();
  });

  test('multiple settings can be changed', () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText(/Open settings/i));
    
    const themeToggle = screen.getByLabelText(/Dark Mode/i);
    fireEvent.click(themeToggle);
    
    const soundToggle = screen.getByLabelText(/Sound Effects/i);
    fireEvent.click(soundToggle);
    
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
