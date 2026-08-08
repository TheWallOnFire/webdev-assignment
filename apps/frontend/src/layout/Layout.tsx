import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-slate-300 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-8 flex items-center border-b border-white/5 bg-secondary/10 shrink-0">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Welcome, Examiner</span>
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-medium text-sm">
              EX
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
