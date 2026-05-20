import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button className={`mode-switch ${isDark ? 'is-dark' : ''}`} onClick={toggleTheme} aria-label="Dark Mode umschalten">
      <span className="mode-switch__label">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      <span className="mode-switch__track">
        <span className="mode-switch__thumb">{isDark ? <Moon size={15} /> : <Sun size={15} />}</span>
      </span>
    </button>
  );
}
