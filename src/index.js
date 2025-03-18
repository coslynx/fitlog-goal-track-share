// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './styles/global.css';

try {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Failed to find the root element in the HTML.');
  }

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render the application:', error);
}