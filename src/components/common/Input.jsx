// src/components/common/Input.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable input component with label and validation.
 *
 * @param {string} label - The text label for the input (required).
 * @param {string} type - The type of input (e.g., "text", "password", "email") (defaults to 'text').
 * @param {string} value - The current value of the input (required).
 * @param {function} onChange - A function that is called when the input value changes (required).
 * @param {string} [error] - An error message to display below the input (optional).
 * @param {string} [placeholder] - A placeholder text for the input (optional).
 * @param {string} [className] - Optional CSS class names to apply to the input.
 */
const Input = ({ label, type = 'text', value, onChange, error, placeholder, className }) => {
  // Input validation
  if (typeof label !== 'string' || !label) {
    console.error('Input: The `label` prop must be a non-empty string.');
    return null;
  }

  if (typeof value !== 'string') {
    console.error('Input: The `value` prop must be a string.');
    return null;
  }

  if (typeof onChange !== 'function') {
    console.error('Input: The `onChange` prop must be a function.');
    return null;
  }

  // Sanitize value (basic XSS protection)
  const sanitizedValue = String(value).replace(/[<>\"']/g, (match) => {
    switch (match) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '\"': return '&quot;';
      case "'": return '&#39;';
      default: return match;
    }
  });

  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={label}
        className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
          error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
        } ${className || ''}`}
        placeholder={placeholder}
        value={sanitizedValue}
        onChange={onChange}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Input;

/*
Example Usage:

import Input from './Input';

const MyComponent = () => {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Basic email validation
    if (!newEmail) {
      setEmailError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  return (
    <div>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
        placeholder="Enter your email"
        className="custom-input"
      />
    </div>
  );
};

Testing considerations:

* Unit tests for rendering with different props (label, type, value, error, placeholder, className).
* Unit tests for onChange event handling.
* Integration tests with AuthForm.jsx and GoalForm.jsx to ensure consistent styling and behavior.
* Test cases for XSS protection.
* Ensure accessibility by providing appropriate ARIA attributes.
*/