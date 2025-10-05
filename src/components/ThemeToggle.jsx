import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

/**
 * Theme toggle component with localStorage persistence
 * Switches between light and dark themes
 */
function ThemeToggle({ className }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  const handleToggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return (
    <button
      type="button"
      className={`theme-toggle ${className || ""}`}
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

ThemeToggle.propTypes = {
  className: PropTypes.string,
};

export default React.memo(ThemeToggle);
