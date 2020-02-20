import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from 'react-router-dom';

import Landing from './Landing';
import Canvas from './Canvas';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<Canvas />} />
      </Routes>
    </div>
  );
};

export default App;
