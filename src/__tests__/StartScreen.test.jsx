import { render, screen, fireEvent } from '@testing-library/react';
import StartScreen from '../components/StartScreen';

describe('StartScreen', () => {
  const mockHandlers = {
    onNewGame: jest.fn(),
    onBuildDeck: jest.fn(),
    onImportDeck: jest.fn(),
    onInstructions: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders title', () => {
    render(<StartScreen {...mockHandlers} />);
    expect(screen.getByText(/Rock Paper Scissors Card Game/i)).toBeInTheDocument();
  });

  test('renders all menu buttons', () => {
    render(<StartScreen {...mockHandlers} />);
    expect(screen.getByText(/New Game \(Default Deck\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Build Custom Deck/i)).toBeInTheDocument();
    expect(screen.getByText(/Import Deck/i)).toBeInTheDocument();
    expect(screen.getByText(/Instructions/i)).toBeInTheDocument();
  });

  test('calls onNewGame when New Game button clicked', () => {
    render(<StartScreen {...mockHandlers} />);
    fireEvent.click(screen.getByText(/New Game \(Default Deck\)/i));
    expect(mockHandlers.onNewGame).toHaveBeenCalledTimes(1);
  });

  test('calls onBuildDeck when Build Custom Deck button clicked', () => {
    render(<StartScreen {...mockHandlers} />);
    fireEvent.click(screen.getByText(/Build Custom Deck/i));
    expect(mockHandlers.onBuildDeck).toHaveBeenCalledTimes(1);
  });

  test('calls onImportDeck when Import Deck button clicked', () => {
    render(<StartScreen {...mockHandlers} />);
    fireEvent.click(screen.getByText(/Import Deck/i));
    expect(mockHandlers.onImportDeck).toHaveBeenCalledTimes(1);
  });

  test('calls onInstructions when Instructions button clicked', () => {
    render(<StartScreen {...mockHandlers} />);
    fireEvent.click(screen.getByText(/Instructions/i));
    expect(mockHandlers.onInstructions).toHaveBeenCalledTimes(1);
  });
});
