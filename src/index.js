import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProviders from './context';
import App from './app';

ReactDOM.render(
  <AppProviders>
    <Router>
      <App />
    </Router>
  </AppProviders>,
  document.getElementById('app')
);
