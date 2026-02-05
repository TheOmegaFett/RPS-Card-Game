import { render, screen, fireEvent } from '@testing-library/react';
import Instructions from '../components/Instructions.jsx';
import DeckBuilder from '../components/DeckBuilder.jsx';

describe('Layout tabs', () => {
  test('switches instruction panels when tabs are clicked', () => {
    render(<Instructions onBack={() => {}} />);

    const objectiveTab = screen.getByRole('tab', { name: /Objective/i });
    const deckTab = screen.getByRole('tab', { name: /Deck/i });

    expect(objectiveTab).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(deckTab);
    expect(deckTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: /Deck/i })).toBeInTheDocument();
  });

  test('switches deck builder rarity tabs', () => {
    render(<DeckBuilder onDeckComplete={() => {}} onBack={() => {}} />);

    const commonTab = screen.getByRole('tab', { name: /^Common$/i });
    const legendaryTab = screen.getByRole('tab', { name: /^Legendary$/i });

    expect(commonTab).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(legendaryTab);
    expect(legendaryTab).toHaveAttribute('aria-selected', 'true');
  });
});
