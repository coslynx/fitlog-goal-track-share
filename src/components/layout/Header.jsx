// src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom@6.22.1';
import { useAuth } from 'src/context/AuthContext.js';

/**
 * Header component displaying navigation links and user authentication status.
 */
const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  // Basic error handling for AuthContext
  if (isAuthenticated === undefined || logout === undefined) {
    console.error('AuthContext values are undefined.');
    return (
      <header style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
        <nav>
          <span>Authentication unavailable</span>
        </nav>
      </header>
    );
  }

  return (
    <header style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center' }}>
          <li style={{ marginRight: '10px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li style={{ marginRight: '10px' }}>
                <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#c82333';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#dc3545';
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li style={{ marginRight: '10px' }}>
                <Link to="/login" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

/*
Testing Considerations:

Unit Tests:
- Authentication state: Verify that the correct links are rendered based on the authentication state.
- Logout: Verify that the "Logout" button calls the logout function when clicked.
- Navigation: Test that the links navigate to the correct pages.

Integration Tests:
- Verify that the Header component integrates correctly with the AuthContext and other components in the application.
- Test the navigation flow when the user logs in and logs out.

Accessibility Considerations:
- Ensure that all links and buttons are accessible to users with disabilities.
- Provide appropriate ARIA attributes for screen readers.
*/