import React, { useEffect } from 'react';
import {
  Navigate,
  Redirect,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { useAuth } from './context/auth-context';
import Landing from './components/landing';
import Canvas from './components/canvas';

const App = () => {
  const { isAuthenticated } = useAuth();
  let { pathname } = useLocation();

  if (pathname === '/map' && isAuthenticated === false)
    return <Navigate to="/" />;

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {isAuthenticated && <Route path="/map" element={<Canvas />} />}
    </Routes>
  );
};

export default App;
