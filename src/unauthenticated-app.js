import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/auth-context';
import Landing from './components/landing';

const App = () => {
  const { isAuthenticated, loading, loginWithRedirect } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
