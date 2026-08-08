import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
      isActive 
        ? 'bg-primary/10 text-primary font-medium' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
    }`;

  return (
    <div className="w-64 bg-secondary/30 border-r border-white/5 flex flex-col h-screen shrink-0">
      <div className="h-16 px-6 flex items-center border-b border-white/5 shrink-0">
        <h2 className="text-lg font-semibold tracking-tight text-white">G-Scores</h2>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Main</p>
          <NavLink to="/" className={getNavLinkClass}>
            <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Score Checker
          </NavLink>
        </div>
        
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Reports</p>
          <div className="space-y-1">
            <NavLink to="/statistics" className={getNavLinkClass}>
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Statistics
            </NavLink>
            <NavLink to="/top-group-a" className={getNavLinkClass}>
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Top 10 Group A
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
