import { render, screen, fireEvent } from '@testing-library/react';
import SettingsPanel from '../SettingsPanel';

describe('SettingsPanel', () => {
  const mockSettings = {
    theme: 'light',
    difficulty: 'NORMAL',
    soundEnabled: true,
    volume: 0.7,
    reducedMotion: false,
    highContrast: false,
  };

  const mockHandlers = {
    onToggleTheme: jest.fn(),
    onToggleSound: jest.fn(),
    onToggleMotion: jest.fn(),
    onToggleContrast: jest.fn(),
    onVolumeChange: jest.fn(),
    onDifficultyChange: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders settings panel', () => {
    render(<SettingsPanel settings={mockSettings} {...mockHandlers} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('renders all sections', () => {
    render(<SettingsPanel settings={mockSettings} {...mockHandlers} />);
    expect(screen.getByRole('tab', { name: /Appearance/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Gameplay/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Audio/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Accessibility/i })).toBeInTheDocument();
  });

  test('dark mode toggle calls handler', () => {
    render(<SettingsPanel settings={mockSettings} {...mockHandlers} />);
    const toggle = screen.getByLabelText(/Dark Mode/i);
    fireEvent.click(toggle);
    expect(mockHandlers.onToggleTheme).toHaveBeenCalledTimes(1);
  });

  test('sound toggle calls handler', () => {
    render(<SettingsPanel settings={mockSettings} {...mockHandlers} />);
    fireEvent.click(screen.getByRole('tab', { name: /Audio/i }));
    const toggle = screen.getByLabelText(/Sound Effects/i);
    fireEvent.click(toggle);
    expect(mockHandlers.onToggleSound).toHaveBeenCalledTimes(1);
  });

  test('close button calls onClose', () => {
    render(<SettingsPanel settings={mockSettings} {...mockHandlers} />);
    const closeBtn = screen.getByLabelText('Close settings');
    fireEvent.click(closeBtn);
    expect(mockHandlers.onClose).toHaveBeenCalledTimes(1);
  });

  test('difficulty select calls handler', () => {
    render(<SettingsPanel settings={mockSettings} {...mockHandlers} />);
    fireEvent.click(screen.getByRole('tab', { name: /Gameplay/i }));
    const select = screen.getByLabelText(/Difficulty/i);
    fireEvent.change(select, { target: { value: 'HARD' } });
    expect(mockHandlers.onDifficultyChange).toHaveBeenCalledWith('HARD');
  });
});
