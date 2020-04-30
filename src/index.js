import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProviders from './context';
import App from './app';

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('app')
);
