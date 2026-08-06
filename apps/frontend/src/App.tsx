import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScoreChecker from './pages/ScoreChecker';
import ScoreDistribution from './pages/ScoreDistribution';
import TopGroupA from './pages/TopGroupA';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ScoreChecker />} />
          <Route path="/statistics" element={<ScoreDistribution />} />
          <Route path="/top-group-a" element={<TopGroupA />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
