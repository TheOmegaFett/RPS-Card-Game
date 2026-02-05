import React from 'react';
import PropTypes from 'prop-types';

/**
 * Screen-level container to keep content within the viewport.
 * @param {Object} props
 * @param {string} props.className - Additional CSS class names.
 * @param {string} props.ariaLabel - Accessible label for the container.
 * @param {React.ReactNode} props.children - Screen content.
 */
function ScreenContainer({ className = '', ariaLabel, children }) {
  const containerClassName = className
    ? `screen-container ${className}`
    : 'screen-container';

  return (
    <section className={containerClassName} aria-label={ariaLabel}>
      {children}
    </section>
  );
}

ScreenContainer.propTypes = {
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default React.memo(ScreenContainer);
