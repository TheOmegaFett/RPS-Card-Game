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

  test('shows deck count', () => {
    render(<DeckBuilder onDeckComplete={mockOnDeckComplete} onBack={mockOnBack} />);
    expect(screen.getByText(/Deck: 0 \/ 20 cards/i)).toBeInTheDocument();
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

  test('can add cards to deck', () => {
    render(<DeckBuilder onDeckComplete={mockOnDeckComplete} onBack={mockOnBack} />);
    const addButtons = screen.getAllByText('+');
    fireEvent.click(addButtons[0]);
    expect(screen.getByText(/Deck: 1 \/ 20 cards/i)).toBeInTheDocument();
  });

  test('can remove cards from deck', () => {
    render(<DeckBuilder onDeckComplete={mockOnDeckComplete} onBack={mockOnBack} />);
    const addButtons = screen.getAllByText('+');
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[0]);
    
    const removeButtons = screen.getAllByText('-');
    fireEvent.click(removeButtons[0]);
    expect(screen.getByText(/Deck: 1 \/ 20 cards/i)).toBeInTheDocument();
  });
});
