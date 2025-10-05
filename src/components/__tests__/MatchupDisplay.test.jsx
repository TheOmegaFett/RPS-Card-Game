import { render, screen } from '@testing-library/react';
import MatchupDisplay from '../MatchupDisplay';
import { Card, CardType } from '@theomegafett/rps-game-logic';

jest.mock('../../hooks/useAudio.js', () => ({
  useAudio: () => ({
    playCountdown: jest.fn(),
    playGo: jest.fn(),
    playCardFlip: jest.fn(),
    playWin: jest.fn(),
    playLoss: jest.fn(),
    playDraw: jest.fn(),
  }),
}));

describe('MatchupDisplay', () => {
  test('returns null when no cards', () => {
    const { container } = render(
      <MatchupDisplay playerCard={null} aiCard={null} result="" />
    );
    expect(container.firstChild).toBeNull();
  });

  test('displays countdown when cards are present', () => {
    const playerCard = new Card(CardType.ROCK);
    const aiCard = new Card(CardType.SCISSORS);
    
    render(<MatchupDisplay playerCard={playerCard} aiCard={aiCard} result="Player Wins" />);
    
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('displays VS text', () => {
    const playerCard = new Card(CardType.ROCK);
    const aiCard = new Card(CardType.SCISSORS);
    
    render(<MatchupDisplay playerCard={playerCard} aiCard={aiCard} result="Player Wins" />);
    
    expect(screen.getByText('VS')).toBeInTheDocument();
  });
});
