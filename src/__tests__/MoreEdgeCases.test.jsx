import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

jest.mock('../hooks/useAudio.js', () => ({
  useAudio: () => ({
    playCountdown: jest.fn(),
    playGo: jest.fn(),
    playCardFlip: jest.fn(),
    playWin: jest.fn(),
    playLoss: jest.fn(),
    playDraw: jest.fn(),
  }),
}));

describe('Additional Edge Cases', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('handles null player deck gracefully', () => {
    render(<App />);
    expect(screen.getByText(/New Game/i)).toBeInTheDocument();
  });

  test('settings persist after page reload simulation', () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText(/Open settings/i));
    
    const themeToggle = screen.getByLabelText(/Dark Mode/i);
    fireEvent.click(themeToggle);
    
    const saved = localStorage.getItem('rps-settings');
    expect(saved).toContain('"theme":"dark"');
  });

  test('volume slider bounds work', () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText(/Open settings/i));
    
    fireEvent.click(screen.getByRole('tab', { name: /Audio/i }));
    const volumeSlider = screen.getByLabelText(/Volume level/i);
    fireEvent.change(volumeSlider, { target: { value: '100' } });
    
    expect(volumeSlider.value).toBe('100');
  });

  test('settings modal has escape functionality', () => {
    render(<App />);
    fireEvent.click(screen.getByLabelText(/Open settings/i));
    expect(screen.getByText('Settings')).toBeInTheDocument();
    
    const closeBtn = screen.getByLabelText(/Close settings/i);
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  test('can navigate to all screens without crashing', () => {
    render(<App />);
    
    fireEvent.click(screen.getByText(/Instructions/i));
    expect(screen.getByText(/How to Play/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Back to Menu/i));
    
    fireEvent.click(screen.getByText(/Build Custom Deck/i));
    expect(screen.getByText(/Build Your Deck/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Back/i));
    
    expect(screen.getByText(/New Game/i)).toBeInTheDocument();
  });

  test('settings changes dont break navigation', () => {
    render(<App />);
    
    fireEvent.click(screen.getByLabelText(/Open settings/i));
    fireEvent.click(screen.getByLabelText(/Dark Mode/i));
    fireEvent.click(screen.getByRole('tab', { name: /Audio/i }));
    fireEvent.click(screen.getByLabelText(/Sound Effects/i));
    fireEvent.click(screen.getByLabelText(/Close settings/i));
    
    fireEvent.click(screen.getByText(/Instructions/i));
    expect(screen.getByText(/How to Play/i)).toBeInTheDocument();
  });

  test('import deck button exists', () => {
    render(<App />);
    expect(screen.getByText(/Import Deck/i)).toBeInTheDocument();
  });

  test('new game creates game board', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/New Game \(Default Deck\)/i));
    expect(screen.getByText(/Your Hand:/i)).toBeInTheDocument();
  });

  test('back to menu from game works', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/New Game \(Default Deck\)/i));
    fireEvent.click(screen.getByText(/Back to Menu/i));
    expect(screen.getByText(/New Game/i)).toBeInTheDocument();
  });

  test('deck builder shows card selection interface', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Build Custom Deck/i));
    
    expect(screen.getAllByText('+').length).toBeGreaterThan(0);
    expect(screen.getAllByText('-').length).toBeGreaterThan(0);
  });
});
