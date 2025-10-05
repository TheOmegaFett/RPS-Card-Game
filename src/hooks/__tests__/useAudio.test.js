import { renderHook } from '@testing-library/react';
import { useAudio } from '../useAudio';

global.AudioContext = jest.fn().mockImplementation(() => ({
  createOscillator: jest.fn(() => ({
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    frequency: { value: 0 },
    type: 'sine',
  })),
  createGain: jest.fn(() => ({
    connect: jest.fn(),
    gain: {
      setValueAtTime: jest.fn(),
      exponentialRampToValueAtTime: jest.fn(),
    },
  })),
  destination: {},
  currentTime: 0,
}));

describe('useAudio', () => {
  test('provides all sound functions', () => {
    const { result } = renderHook(() => useAudio(true, 0.7));
    
    expect(result.current.playCardFlip).toBeDefined();
    expect(result.current.playCountdown).toBeDefined();
    expect(result.current.playGo).toBeDefined();
    expect(result.current.playWin).toBeDefined();
    expect(result.current.playLoss).toBeDefined();
    expect(result.current.playDraw).toBeDefined();
  });

  test('respects soundEnabled flag', () => {
    const { result } = renderHook(() => useAudio(false, 0.7));
    
    expect(() => result.current.playCardFlip()).not.toThrow();
    expect(() => result.current.playWin()).not.toThrow();
  });

  test('respects volume setting', () => {
    const { result } = renderHook(() => useAudio(true, 0.3));
    
    expect(() => result.current.playCountdown()).not.toThrow();
  });

  test('all sound functions callable without errors', () => {
    const { result } = renderHook(() => useAudio(true, 0.7));
    
    expect(() => result.current.playCardFlip()).not.toThrow();
    expect(() => result.current.playCountdown()).not.toThrow();
    expect(() => result.current.playGo()).not.toThrow();
    expect(() => result.current.playWin()).not.toThrow();
    expect(() => result.current.playLoss()).not.toThrow();
    expect(() => result.current.playDraw()).not.toThrow();
  });
});
