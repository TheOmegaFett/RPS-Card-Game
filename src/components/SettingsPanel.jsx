import React from 'react';
import PropTypes from 'prop-types';

/**
 * Settings panel for accessibility and game preferences
 */
function SettingsPanel({ 
  settings, 
  onToggleTheme, 
  onToggleSound, 
  onToggleMotion, 
  onToggleContrast,
  onVolumeChange,
  onDifficultyChange,
  onClose 
}) {
  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close settings">
            ✕
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>Appearance</h3>
            
            <div className="setting-item">
              <label htmlFor="theme-toggle">
                <span>Dark Mode</span>
                <input
                  id="theme-toggle"
                  type="checkbox"
                  checked={settings.theme === 'dark'}
                  onChange={onToggleTheme}
                  className="toggle-checkbox"
                />
              </label>
            </div>

            <div className="setting-item">
              <label htmlFor="contrast-toggle">
                <span>High Contrast</span>
                <input
                  id="contrast-toggle"
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={onToggleContrast}
                  className="toggle-checkbox"
                />
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Gameplay</h3>
            
            <div className="setting-item">
              <label htmlFor="difficulty-setting">
                Difficulty
                <select
                  id="difficulty-setting"
                  value={settings.difficulty}
                  onChange={(e) => onDifficultyChange(e.target.value)}
                  className="setting-select"
                >
                  <option value="EASY">Easy</option>
                  <option value="NORMAL">Normal</option>
                  <option value="HARD">Hard</option>
                </select>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Audio</h3>
            
            <div className="setting-item">
              <label htmlFor="sound-toggle">
                <span>Sound Effects</span>
                <input
                  id="sound-toggle"
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={onToggleSound}
                  className="toggle-checkbox"
                />
              </label>
            </div>

            <div className="setting-item">
              <label htmlFor="volume-slider">
                Volume
                <input
                  id="volume-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(settings.volume * 100)}
                  onChange={(e) => onVolumeChange(parseInt(e.target.value, 10) / 100)}
                  disabled={!settings.soundEnabled}
                  className="volume-slider"
                  aria-label="Volume level"
                />
                <span className="volume-value">{Math.round(settings.volume * 100)}%</span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Accessibility</h3>
            
            <div className="setting-item">
              <label htmlFor="motion-toggle">
                <span>Reduce Motion</span>
                <input
                  id="motion-toggle"
                  type="checkbox"
                  checked={settings.reducedMotion}
                  onChange={onToggleMotion}
                  className="toggle-checkbox"
                />
              </label>
              <p className="setting-description">Disables animations and transitions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SettingsPanel.propTypes = {
  settings: PropTypes.object.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
  onToggleSound: PropTypes.func.isRequired,
  onToggleMotion: PropTypes.func.isRequired,
  onToggleContrast: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(SettingsPanel);
