import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

export const DifficultyLevel = Object.freeze({
  EASY: "EASY",
  NORMAL: "NORMAL",
  HARD: "HARD",
});

/**
 * Difficulty selector component with localStorage persistence
 * @param {Object} props
 * @param {Function} props.onDifficultyChange - Callback when difficulty changes
 * @param {string} props.className - Additional CSS classes
 */
function DifficultySelect({ onDifficultyChange, className }) {
  const [difficulty, setDifficulty] = useState(() => {
    const saved = localStorage.getItem("difficulty");
    return saved && DifficultyLevel[saved] ? saved : DifficultyLevel.NORMAL;
  });

  useEffect(() => {
    localStorage.setItem("difficulty", difficulty);
    if (onDifficultyChange) {
      onDifficultyChange(difficulty);
    }
  }, [difficulty, onDifficultyChange]);

  const handleChange = useCallback((e) => {
    setDifficulty(e.target.value);
  }, []);

  return (
    <div className={`difficulty-select ${className || ""}`}>
      <label htmlFor="difficulty-dropdown">
        Difficulty:
        <select
          id="difficulty-dropdown"
          value={difficulty}
          onChange={handleChange}
          className="difficulty-dropdown"
        >
          <option value={DifficultyLevel.EASY}>Easy</option>
          <option value={DifficultyLevel.NORMAL}>Normal</option>
          <option value={DifficultyLevel.HARD}>Hard</option>
        </select>
      </label>
    </div>
  );
}

DifficultySelect.propTypes = {
  onDifficultyChange: PropTypes.func,
  className: PropTypes.string,
};

export default React.memo(DifficultySelect);
