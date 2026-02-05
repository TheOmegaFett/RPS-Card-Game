import React from 'react';
import PropTypes from 'prop-types';

/**
 * App layout wrapper that provides header and main content regions.
 * @param {Object} props
 * @param {React.ReactNode} props.header - Header content.
 * @param {React.ReactNode} props.children - Main content.
 */
function AppShell({ header = null, footer = null, children }) {
  return (
    <div className="app-shell">
      <header className="app-header">{header}</header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">{footer}</footer>
    </div>
  );
}

AppShell.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default React.memo(AppShell);
