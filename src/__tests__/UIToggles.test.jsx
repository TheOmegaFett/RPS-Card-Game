import { renderHook, act } from '@testing-library/react';
import { useSettings } from '../hooks/useSettings';

describe('UI Toggle States', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('theme toggle cycles light/dark', () => {
    const { result } = renderHook(() => useSettings());
    
    expect(result.current.settings.theme).toBe('light');
    
    act(() => result.current.toggleTheme());
    expect(result.current.settings.theme).toBe('dark');
    
    act(() => result.current.toggleTheme());
    expect(result.current.settings.theme).toBe('light');
  });

  test('sound toggle enables/disables audio', () => {
    const { result } = renderHook(() => useSettings());
    
    expect(result.current.settings.soundEnabled).toBe(true);
    
    act(() => result.current.toggleSound());
    expect(result.current.settings.soundEnabled).toBe(false);
    
    act(() => result.current.toggleSound());
    expect(result.current.settings.soundEnabled).toBe(true);
  });

  test('volume slider clamps values', () => {
    const { result } = renderHook(() => useSettings());
    
    act(() => result.current.setVolume(2.5));
    expect(result.current.settings.volume).toBe(1);
    
    act(() => result.current.setVolume(-0.5));
    expect(result.current.settings.volume).toBe(0);
    
    act(() => result.current.setVolume(0.5));
    expect(result.current.settings.volume).toBe(0.5);
  });

  test('difficulty changes persist', () => {
    const { result } = renderHook(() => useSettings());
    
    act(() => result.current.setDifficulty('HARD'));
    expect(result.current.settings.difficulty).toBe('HARD');
    
    const saved = JSON.parse(localStorage.getItem('rps-settings'));
    expect(saved.difficulty).toBe('HARD');
  });

  test('reduce motion toggle', () => {
    const { result } = renderHook(() => useSettings());
    
    act(() => result.current.toggleReducedMotion());
    expect(result.current.settings.reducedMotion).toBe(true);
    
    act(() => result.current.toggleReducedMotion());
    expect(result.current.settings.reducedMotion).toBe(false);
  });

  test('high contrast toggle', () => {
    const { result } = renderHook(() => useSettings());
    
    act(() => result.current.toggleHighContrast());
    expect(result.current.settings.highContrast).toBe(true);
    
    act(() => result.current.toggleHighContrast());
    expect(result.current.settings.highContrast).toBe(false);
  });
});
