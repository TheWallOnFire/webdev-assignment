import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';

const ScoreChecker = lazy(() => import('../pages/ScoreChecker'));
const ScoreDistribution = lazy(() => import('../pages/ScoreDistribution'));
const TopGroupA = lazy(() => import('../pages/TopGroupA'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Reports = lazy(() => import('../pages/Reports'));
const Settings = lazy(() => import('../pages/Settings'));

const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <div 
      className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"
      role="status"
      aria-label="Loading page"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export function AppRoutes() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<ScoreChecker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<ScoreDistribution />} />
          <Route path="/top-group-a" element={<TopGroupA />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
