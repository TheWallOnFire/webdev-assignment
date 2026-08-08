import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(() => {
    return !document.documentElement.classList.contains('light-mode');
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [darkMode]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100 mb-1">
            General Settings
          </h1>
          <p className="text-sm text-slate-400">
            Manage your application preferences and configurations.
          </p>
        </div>

        <div className="space-y-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <div>
              <h3 className="text-slate-200 font-medium">Dark Mode</h3>
              <p className="text-sm text-slate-400">
                Switch between dark and light themes.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={darkMode}
              onClick={() => setDarkMode(!darkMode)}
              className={
                `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer ` +
                `rounded-full border-2 border-transparent transition-colors ` +
                `duration-200 ease-in-out focus:outline-none focus:ring-2 ` +
                `focus:ring-primary focus:ring-offset-2 ` +
                `focus:ring-offset-background ${
                  darkMode ? 'bg-primary' : 'bg-slate-600'
                }`
              }
            >
              <span
                className={
                  `pointer-events-none inline-block h-5 w-5 transform ` +
                  `rounded-full bg-white shadow ring-0 transition duration-200 ` +
                  `ease-in-out ${
                    darkMode ? 'translate-x-5' : 'translate-x-0'
                  }`
                }
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
        <div className="mb-6 border-b border-white/5 pb-4">
          <h2 className="text-xl font-semibold text-slate-100 mb-1">
            About This Application
          </h2>
          <p className="text-sm text-slate-400">
            Information about the G-Scores project.
          </p>
        </div>

        <div className="space-y-4 text-slate-300 text-sm">
          <p>
            <strong className="text-slate-200">G-Scores</strong> is a
            high-performance web application designed to quickly search and
            analyze the 2024 National High School Exam results.
          </p>
          <p>
            It provides instantaneous registration number lookups, detailed score
            distributions by subject, and automated rankings for Top Group A
            students.
          </p>

          <div className="pt-4 mt-6 border-t border-white/5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Developer / Author</span>
              <span className="font-medium text-slate-200">
                The Wall On Fire
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Version</span>
              <span className="font-medium text-slate-200">
                1.0.0 (Production)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Repository</span>
              <a
                href="https://github.com/TheWallOnFire/webdev-assignment"
                target="_blank"
                rel="noreferrer"
                className={
                  'text-primary hover:text-blue-400 transition-colors ' +
                  'font-medium flex items-center gap-1'
                }
              >
                GitHub
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 ' +
                      '4h6m0 0v6m0-6L10 14'
                    }
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
