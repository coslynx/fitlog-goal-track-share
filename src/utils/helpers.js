// src/utils/helpers.js

/**
 * Formats a date string into "MM/DD/YYYY" format.
 *
 * @param {string} dateString - The date string to format (e.g., "YYYY-MM-DD" or a JavaScript Date object parsable string).
 * @returns {string} - The formatted date string in "MM/DD/YYYY" format, or an empty string if the input is invalid.
 */
export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date string provided to formatDate:', dateString);
      return '';
    }

    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Calculates the age in years based on a birth date string.
 *
 * @param {string} birthDateString - The birth date string (e.g., "YYYY-MM-DD").
 * @returns {number | null} - The age in years as a whole number, or null if the input is invalid.
 */
export const calculateAge = (birthDateString) => {
  try {
    const birthDate = new Date(birthDateString);
    if (isNaN(birthDate.getTime())) {
      console.error('Invalid birth date string provided to calculateAge:', birthDateString);
      return null;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  } catch (error) {
    console.error('Error calculating age:', error);
    return null;
  }
};

/**
 * Validates if an email string is in a valid format.
 *
 * @param {string} email - The email string to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const validateEmail = (email) => {
  if (typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} string - The string to capitalize.
 * @returns {string} - A new string with the first letter capitalized, or an empty string if the input is empty.
 */
export const capitalizeFirstLetter = (string) => {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Truncates a string if it exceeds a maximum length, adding "..." to the end.
 *
 * @param {string} text - The string to truncate.
 * @param {number} [maxLength=50] - The maximum length of the string.
 * @returns {string} - The truncated string, or the original string if it's shorter than the maximum length.
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) {
    return '';
  }
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

// Unit tests (as comments):
/*
// formatDate tests:
console.assert(formatDate('2024-01-01') === '01/01/2024', 'formatDate test 1 failed');
console.assert(formatDate('2024-12-31') === '12/31/2024', 'formatDate test 2 failed');
console.assert(formatDate('invalid-date') === '', 'formatDate test 3 failed: Invalid date');
console.assert(formatDate(null) === '', 'formatDate test 4 failed: Null date');

// calculateAge tests:
console.assert(calculateAge('1990-01-01') === new Date().getFullYear() - 1990, 'calculateAge test 1 failed');
console.assert(calculateAge('2020-01-01') === new Date().getFullYear() - 2020, 'calculateAge test 2 failed');
console.assert(calculateAge('invalid-date') === null, 'calculateAge test 3 failed: Invalid date');

// validateEmail tests:
console.assert(validateEmail('test@example.com') === true, 'validateEmail test 1 failed');
console.assert(validateEmail('invalid-email') === false, 'validateEmail test 2 failed');
console.assert(validateEmail(null) === false, 'validateEmail test 3 failed');

// capitalizeFirstLetter tests:
console.assert(capitalizeFirstLetter('hello') === 'Hello', 'capitalizeFirstLetter test 1 failed');
console.assert(capitalizeFirstLetter('') === '', 'capitalizeFirstLetter test 2 failed: Empty string');

// truncateText tests:
console.assert(truncateText('This is a long string', 10) === 'This is a ...', 'truncateText test 1 failed');
console.assert(truncateText('Short string', 20) === 'Short string', 'truncateText test 2 failed');
console.assert(truncateText(null) === '', 'truncateText test 3 failed: Null string');
*/