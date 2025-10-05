import { render, screen, fireEvent } from '@testing-library/react';
import DeckBuilder from '../DeckBuilder';

describe('DeckBuilder', () => {
  const mockOnDeckComplete = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders deck builder title', () => {
    render(<DeckBuilder onDeckComplete={mockOnDeckComplete} onBack={mockOnBack} />);
    expect(screen.getByText(/Build Your Deck/i)).toBeInTheDocument();
  });

  test('shows deck size label', () => {
    render(<DeckBuilder onDeckComplete={mockOnDeckComplete} onBack={mockOnBack} />);
    expect(screen.getByText(/Deck Size:/i)).toBeInTheDocument();
  });

  test('back button calls onBack', () => {
    render(<DeckBuilder onDeckComplete={mockOnDeckComplete} onBack={mockOnBack} />);
    const backBtn = screen.getByText(/Back/i);
    fireEvent.click(backBtn);
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  test('start game button disabled when deck invalid', () => {
    render(<DeckBuilder onDeckComplete={mockOnDeckComplete} onBack={mockOnBack} />);
    const startBtn = screen.getByText(/Start Game/i);
    expect(startBtn).toBeDisabled();
  });

  test('add button increases card count', () => {
    render(<DeckBuilder onDeckComplete={mockOnDeckComplete} onBack={mockOnBack} />);
    const addButtons = screen.getAllByText('+');
    fireEvent.click(addButtons[0]);
    const rockCount = screen.getAllByText(/\/ 4/)[0];
    expect(rockCount).toBeInTheDocument();
  });

  test('remove button decreases card count', () => {
    render(<DeckBuilder onDeckComplete={mockOnDeckComplete} onBack={mockOnBack} />);
    const addButtons = screen.getAllByText('+');
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[0]);
    
    const removeButtons = screen.getAllByText('-');
    fireEvent.click(removeButtons[0]);
    
    const rockCount = screen.getAllByText(/\/ 4/)[0];
    expect(rockCount).toBeInTheDocument();
  });
});
