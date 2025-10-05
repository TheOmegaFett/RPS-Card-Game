import { renderHook, act } from '@testing-library/react';
import { useSettings } from '../useSettings';

describe('useSettings', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('initializes with default settings', () => {
    const { result } = renderHook(() => useSettings());
    
    expect(result.current.settings.theme).toBe('light');
    expect(result.current.settings.difficulty).toBe('NORMAL');
    expect(result.current.settings.soundEnabled).toBe(true);
    expect(result.current.settings.volume).toBe(0.7);
    expect(result.current.settings.reducedMotion).toBe(false);
    expect(result.current.settings.highContrast).toBe(false);
  });

  test('persists settings to localStorage', () => {
    const { result } = renderHook(() => useSettings());
    
    act(() => {
      result.current.toggleTheme();
    });

    const saved = JSON.parse(localStorage.getItem('rps-settings'));
    expect(saved.theme).toBe('dark');
  });

  test('loads settings from localStorage', () => {
    localStorage.setItem('rps-settings', JSON.stringify({
      theme: 'dark',
      difficulty: 'HARD',
      soundEnabled: false,
      volume: 0.5,
    }));

    const { result } = renderHook(() => useSettings());
    
    expect(result.current.settings.theme).toBe('dark');
    expect(result.current.settings.difficulty).toBe('HARD');
    expect(result.current.settings.soundEnabled).toBe(false);
    expect(result.current.settings.volume).toBe(0.5);
  });

  test('toggleTheme switches between light and dark', () => {
    const { result } = renderHook(() => useSettings());
    
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.settings.theme).toBe('dark');
    
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.settings.theme).toBe('light');
  });

  test('toggleSound toggles soundEnabled', () => {
    const { result } = renderHook(() => useSettings());
    
    expect(result.current.settings.soundEnabled).toBe(true);
    
    act(() => {
      result.current.toggleSound();
    });
    expect(result.current.settings.soundEnabled).toBe(false);
  });

  test('setVolume clamps value between 0 and 1', () => {
    const { result } = renderHook(() => useSettings());
    
    act(() => {
      result.current.setVolume(1.5);
    });
    expect(result.current.settings.volume).toBe(1);
    
    act(() => {
      result.current.setVolume(-0.5);
    });
    expect(result.current.settings.volume).toBe(0);
    
    act(() => {
      result.current.setVolume(0.3);
    });
    expect(result.current.settings.volume).toBe(0.3);
  });

  test('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('rps-settings', 'invalid json{');
    
    const { result } = renderHook(() => useSettings());
    
    expect(result.current.settings.theme).toBe('light');
  });
});
