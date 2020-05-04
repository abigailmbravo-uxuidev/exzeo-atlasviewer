import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/auth-context';
import Landing from './components/landing';
import Canvas from './components/canvas';

const App = () => {
  const { isAuthenticated, loading, loginWithRedirect } = useAuth();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      /*await loginWithRedirect({
        appState: { targetUrl: window.location.pathname }
      });*/
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<Canvas />} />
      </Routes>
    </Router>
  );
};

export default App;
