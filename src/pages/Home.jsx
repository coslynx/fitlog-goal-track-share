// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom@6.22.1';
import { useAuth } from 'src/context/AuthContext.js';
import { validateEmail } from 'src/utils/helpers.js';

/**
 * Home component serving as the landing page for the application.
 * Displays a welcome message and options for users to log in or register if they are not authenticated,
 * or displays a personalized greeting and a link to the dashboard if they are logged in.
 */
const Home = () => {
  const { isAuthenticated } = useAuth();

  // Basic error handling for AuthContext
  if (isAuthenticated === undefined) {
    console.error('AuthContext values are undefined.');
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '20px' }}>
          Welcome to the Fitness Tracker!
        </h1>
        <p style={{ color: 'red', fontStyle: 'italic' }}>
          Authentication status unavailable. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '20px' }}>
        Welcome to the Fitness Tracker!
      </h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in. Welcome!</p>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
            Go to Dashboard
          </Link>
        </>
      ) : (
        <>
          <p>Please log in or register to start tracking your fitness goals.</p>
          <Link to="/login" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold', marginRight: '10px' }}>
            Login
          </Link>
          <Link to="/register" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;

/*
Testing Considerations:

Unit Tests:
- Rendering logic: Verify that the component renders correctly based on the authentication state.
- Authenticated state: Ensure that the welcome message and the link to the dashboard are displayed when the user is authenticated.
- Non-authenticated state: Ensure that the welcome message and the links to the login and register pages are displayed when the user is not authenticated.
- Error handling: Verify that the component displays an appropriate error message when the authentication context is not available.

Integration Tests:
- Verify that the Home component integrates correctly with the AuthContext and other components in the application.
- Test the navigation flow when the user clicks the links to the login, register, and dashboard pages.
- Ensure links are accessible and keyboard navigable.

Accessibility Considerations:
- Ensure that all links are accessible to users with disabilities.
- Provide appropriate ARIA attributes for screen readers.
*/