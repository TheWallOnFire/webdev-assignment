import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScoreChecker from './pages/ScoreChecker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScoreChecker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
