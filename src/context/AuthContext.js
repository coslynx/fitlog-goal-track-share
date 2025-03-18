// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom@6.22.1';
import axios from 'axios@1.8.3';

// TypeScript interfaces
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface User {
  id: string;
  email: string;
  username: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Function to get the auth token from local storage
  const getAuthToken = useCallback(() => {
    try {
      const storedToken = localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_KEY || 'fitness_app_auth_token');
      return storedToken ? JSON.parse(storedToken) : null; // Parse if it exists
    } catch (error) {
      console.error("Error parsing token from local storage:", error);
      return null; // Return null in case of parsing errors
    }
  }, []);

  // Function to check if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAuthToken());

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      // Sanitize user input
      if (!credentials.email || !credentials.password) {
        alert('Please enter both email and password.');
        return;
      }

      const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
      const response = await axios.post(`${baseURL}/api/auth/login`, {
        email: credentials.email,
        password: credentials.password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store token and user data in context
        setToken(token);
        setUser(user);
        setIsAuthenticated(true);

        // Store token in localStorage after converting it to string
        localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN_KEY || 'fitness_app_auth_token', JSON.stringify(token));

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      // Handle different error status codes
      if (error.response) {
        if (error.response.status === 400) {
          alert('Invalid request. Please check your input.');
        } else if (error.response.status === 401) {
          alert('Incorrect email or password.');
        } else if (error.response.status === 500) {
          alert('Internal server error. Please try again later.');
        } else {
          alert(`Login failed: ${error.message}`);
        }
      } else {
        alert('Network error. Please check your connection.');
      }
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    try {
      // Sanitize user input
      if (!userData.email || !userData.username || !userData.password) {
        alert('Please fill in all fields.');
        return;
      }

      const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
      const response = await axios.post(`${baseURL}/api/auth/register`, {
        email: userData.email,
        username: userData.username,
        password: userData.password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store token and user data in context
        setToken(token);
        setUser(user);
        setIsAuthenticated(true);

        // Store token in localStorage after converting it to string
        localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN_KEY || 'fitness_app_auth_token', JSON.stringify(token));

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      // Handle different error status codes
      if (error.response) {
        if (error.response.status === 400) {
          alert('Invalid request. Please check your input.');
        } else if (error.response.status === 500) {
          alert('Internal server error. Please try again later.');
        } else {
          alert(`Registration failed: ${error.message}`);
        }
      } else {
        alert('Network error. Please check your connection.');
      }
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Remove token from context
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);

      // Remove token from localStorage
      localStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN_KEY || 'fitness_app_auth_token');

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  // Load token from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = getAuthToken();

      if (storedToken) {
        // Here you might want to add token validation logic
        // For example, you can make a request to /api/auth/verify
        // to check if the token is still valid

        // If the token is valid, set the token and user
        setToken(storedToken);
        setIsAuthenticated(true);
        // Mock user data (replace with actual data fetching if needed)
        setUser({
          id: '1',
          email: 'example@example.com',
          username: 'exampleUser',
        });
      }
    } catch (error) {
      console.error('Error loading token from localStorage:', error);
      // If there is an error, clear the local storage
      localStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN_KEY || 'fitness_app_auth_token');
    }
  }, [getAuthToken]); // Add getAuthToken as a dependency

  // Context value
  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};