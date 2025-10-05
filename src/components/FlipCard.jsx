import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Reusable 3D flip card component
 * @param {Object} props
 * @param {React.ReactNode} props.front - Content to display on the front of the card
 * @param {React.ReactNode} props.back - Content to display on the back of the card
 * @param {boolean} props.isFlipped - External control for flip state
 * @param {Function} props.onFlip - Callback when card flips
 * @param {string} props.className - Additional CSS classes
 */
function FlipCard({ front, back, isFlipped, onFlip, className }) {
  const [internalFlipped, setInternalFlipped] = useState(false);

  const flipped = isFlipped !== undefined ? isFlipped : internalFlipped;

  const handleClick = useCallback(() => {
    if (isFlipped === undefined) {
      setInternalFlipped((prev) => !prev);
    }
    if (onFlip) {
      onFlip(!flipped);
    }
  }, [isFlipped, onFlip, flipped]);

  useEffect(() => {
    if (isFlipped !== undefined) {
      setInternalFlipped(isFlipped);
    }
  }, [isFlipped]);

  return (
    <div
      className={`flip-card ${className || ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label="Flip card"
    >
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back">{back}</div>
      </div>
    </div>
  );
}

FlipCard.propTypes = {
  front: PropTypes.node.isRequired,
  back: PropTypes.node.isRequired,
  isFlipped: PropTypes.bool,
  onFlip: PropTypes.func,
  className: PropTypes.string,
};

export default React.memo(FlipCard);
