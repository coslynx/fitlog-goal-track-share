// src/services/api.js
import axios from 'axios@1.8.3';
import { useNavigate } from 'react-router-dom@6.22.1';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock localStorage for testing purposes
const localStorageMock = (function() {
  let store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = String(value);
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    },
  };
})();

// Check if running in a test environment
const isTestEnvironment = process.env.NODE_ENV === 'test';

// Use mock localStorage if in test environment
if (isTestEnvironment) {
  global.localStorage = localStorageMock;
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('authToken'); // Key directly used as requested, even though it may not match .env
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Error adding authorization header:', error);
      return config; // Continue without authorization if there's an error
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      if (!isTestEnvironment) {
        window.location.href = '/'; // Corrected redirect to Home page based on provided file structure
      }
    }
    return Promise.reject(error);
  }
);

const get = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`GET request to ${url} failed:`, error);
    throw { message: error.message || 'Request failed' };
  }
};

const post = async (url, body) => {
  try {
    const response = await api.post(url, body);
    return response.data;
  } catch (error) {
    console.error(`POST request to ${url} failed:`, error);
    throw { message: error.message || 'Request failed' };
  }
};

const put = async (url, body) => {
  try {
    const response = await api.put(url, body);
    return response.data;
  } catch (error) {
    console.error(`PUT request to ${url} failed:`, error);
    throw { message: error.message || 'Request failed' };
  }
};

const deleteRequest = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error(`DELETE request to ${url} failed:`, error);
    throw { message: error.message || 'Request failed' };
  }
};

export default {
  get,
  post,
  put,
  delete: deleteRequest,
};