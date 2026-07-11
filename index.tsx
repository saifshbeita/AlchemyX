import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Query target DOM container node
const rootElement = document.getElementById('root');

// Validate structural node layout presence before mount initialization
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Initialize target root instance pipeline
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
