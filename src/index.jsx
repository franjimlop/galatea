import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Utiliza createRoot desde react-dom/client
const root = createRoot(document.getElementById('root'));

// Encapsula la aplicación dentro de createRoot
root.render(
  <Router>
    <App />
  </Router>
);