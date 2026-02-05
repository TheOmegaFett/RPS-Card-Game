import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable container card for grouping content sections.
 * @param {Object} props
 * @param {string} props.className - Additional CSS class names.
 * @param {string} props.as - HTML tag to render.
 * @param {React.ReactNode} props.children - Section content.
 */
function SectionCard({ className = '', as: Component = 'section', children }) {
  const cardClassName = className ? `section-card ${className}` : 'section-card';
  return <Component className={cardClassName}>{children}</Component>;
}

SectionCard.propTypes = {
  className: PropTypes.string,
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default React.memo(SectionCard);
