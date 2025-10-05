import { useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for playing sound effects
 * @param {boolean} soundEnabled - Whether sound is enabled
 * @param {number} volume - Volume level (0-1)
 * @returns {Object} Sound playing functions
 */
export function useAudio(soundEnabled = true, volume = 0.7) {
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, []);

  const playBeep = useCallback((frequency, duration) => {
    if (!soundEnabled || !audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error('Audio playback failed:', e);
    }
  }, [soundEnabled, volume]);

  const playCardFlip = useCallback(() => {
    playBeep(800, 0.1);
  }, [playBeep]);

  const playCountdown = useCallback(() => {
    playBeep(600, 0.15);
  }, [playBeep]);

  const playGo = useCallback(() => {
    playBeep(1000, 0.2);
  }, [playBeep]);

  const playWin = useCallback(() => {
    if (!soundEnabled || !audioContextRef.current) return;
    setTimeout(() => playBeep(523, 0.15), 0);
    setTimeout(() => playBeep(659, 0.15), 100);
    setTimeout(() => playBeep(784, 0.2), 200);
  }, [soundEnabled, playBeep]);

  const playLoss = useCallback(() => {
    if (!soundEnabled || !audioContextRef.current) return;
    setTimeout(() => playBeep(400, 0.15), 0);
    setTimeout(() => playBeep(350, 0.2), 100);
  }, [soundEnabled, playBeep]);

  const playDraw = useCallback(() => {
    playBeep(500, 0.15);
  }, [playBeep]);

  return {
    playCardFlip,
    playCountdown,
    playGo,
    playWin,
    playLoss,
    playDraw,
  };
}
