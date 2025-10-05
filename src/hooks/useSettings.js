import { useState, useEffect, useCallback } from 'react';

const DEFAULT_SETTINGS = {
  theme: 'light',
  difficulty: 'NORMAL',
  soundEnabled: true,
  volume: 0.7,
  reducedMotion: false,
  highContrast: false,
};

/**
 * Custom hook for managing global app settings with localStorage persistence
 * @returns {Object} Settings state and update functions
 */
export function useSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('rps-settings');
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse settings:', e);
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('rps-settings', JSON.stringify(settings));
    
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    if (settings.reducedMotion) {
      document.documentElement.setAttribute('data-reduced-motion', 'true');
    } else {
      document.documentElement.removeAttribute('data-reduced-motion');
    }
    
    if (settings.highContrast) {
      document.documentElement.setAttribute('data-high-contrast', 'true');
    } else {
      document.documentElement.removeAttribute('data-high-contrast');
    }
  }, [settings]);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleTheme = useCallback(() => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  }, []);

  const toggleSound = useCallback(() => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const setVolume = useCallback((volume) => {
    setSettings(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const setDifficulty = useCallback((difficulty) => {
    setSettings(prev => ({ ...prev, difficulty }));
  }, []);

  return {
    settings,
    updateSetting,
    toggleTheme,
    toggleSound,
    toggleReducedMotion,
    toggleHighContrast,
    setVolume,
    setDifficulty,
  };
}
