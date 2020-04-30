import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/landing';
import Canvas from './components/canvas';

const App = () => {
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
