import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/auth-context';
import Landing from './components/landing';
import Canvas from './components/canvas';

const App = () => {
  const { isAuthenticated, loading, loginWithRedirect } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        {isAuthenticated && <Route path="/map" element={<Canvas />} />}
      </Routes>
    </Router>
  );
};

export default App;

