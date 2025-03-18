// src/components/common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable button component with customizable styling and click handling.
 *
 * @param {string} label - The text displayed on the button (required).
 * @param {function} onClick - A function that is called when the button is clicked (required).
 * @param {object} [style] - Optional inline styles to apply to the button.
 * @param {string} [className] - Optional CSS class names to apply to the button.
 * @param {boolean} [disabled=false] - Whether the button is disabled.
 */
const Button = ({ label, onClick, style, className, disabled = false }) => {
  // Input validation
  if (typeof label !== 'string' || !label) {
    console.error('Button: The `label` prop must be a non-empty string.');
    return null; // Or a placeholder, or handle it differently
  }

  if (typeof onClick !== 'function') {
    console.error('Button: The `onClick` prop must be a function.');
    return null; // Or a placeholder, or handle it differently
  }

  // Sanitize label (basic XSS protection)
  const sanitizedLabel = String(label).replace(/[<>"']/g, (match) => {
    switch (match) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return match;
    }
  });

  // Default button styles
  const defaultStyles = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    ':hover': {
      backgroundColor: '#0056b3',
    },
  };

  // Merge default styles with provided styles
  const mergedStyles = { ...defaultStyles, ...style };

  return (
    <button
      type="button"
      className={className}
      style={mergedStyles}
      onClick={disabled ? null : onClick}
      disabled={disabled}
    >
      {sanitizedLabel}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;

/*
Example Usage:

import Button from './Button';

const MyComponent = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <Button label="Click Me" onClick={handleClick} />
      <Button label="Disabled Button" onClick={() => {}} disabled />
      <Button
        label="Styled Button"
        onClick={() => {}}
        style={{ backgroundColor: 'green', color: 'yellow' }}
      />
    </div>
  );
};

Testing Considerations:

Unit Tests:
- Click handling: Verify that the onClick function is called when the button is clicked.
- Style variations: Ensure that the button renders with the correct styles based on the style and className props.
- Disabled state: Verify that the button is disabled when the disabled prop is true and that click events are prevented.
- Label: Validate that the label is rendered correctly.

Integration Tests:
- Verify that the button integrates correctly with other components in the application, particularly AuthForm.jsx and GoalForm.jsx (if applicable).
*/