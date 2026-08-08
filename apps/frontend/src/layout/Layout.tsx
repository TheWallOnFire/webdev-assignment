import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-slate-300 font-sans overflow-hidden">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar with responsive classes */}
      <div
        className={
          `fixed inset-y-0 left-0 z-50 transform ` +
          `${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} ` +
          `md:relative md:translate-x-0 transition-transform ` +
          `duration-200 ease-in-out`
        }
      >
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header
          className={
            'h-16 px-4 md:px-8 flex items-center border-b ' +
            'border-white/5 bg-secondary/10 shrink-0'
          }
        >
          <button
            className="md:hidden mr-4 p-2 -ml-2 text-slate-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex-1" />
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <footer
            className={
              'mt-8 pt-6 border-t border-white/5 text-center ' +
              'text-sm text-slate-500 shrink-0'
            }
          >
            <p className="mt-1 text-xs opacity-75">
              &copy; {new Date().getFullYear()} The Wall On Fire. All rights
              reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
