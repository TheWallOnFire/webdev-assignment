import React, { useState } from 'react';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-secondary/50 border border-white/5 rounded-xl shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100 mb-1">General Settings</h1>
          <p className="text-sm text-slate-400">Manage your application preferences and configurations.</p>
        </div>
        
        <div className="space-y-6">
          {/* Email Notifications Toggle */}
          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <div>
              <h3 className="text-slate-200 font-medium">Email Notifications</h3>
              <p className="text-sm text-slate-400">Receive system updates and summary reports via email.</p>
            </div>
            <button 
              type="button"
              role="switch"
              aria-checked={notifications}
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${notifications ? 'bg-primary' : 'bg-slate-600'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <div>
              <h3 className="text-slate-200 font-medium">Dark Mode</h3>
              <p className="text-sm text-slate-400">Switch between dark and light themes (currently locked to dark).</p>
            </div>
            <button 
              type="button"
              role="switch"
              aria-checked={darkMode}
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${darkMode ? 'bg-primary' : 'bg-slate-600'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${darkMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <div>
              <h3 className="text-slate-200 font-medium">Language</h3>
              <p className="text-sm text-slate-400">Select your preferred interface language.</p>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-background border border-white/10 rounded-md px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary min-w-[120px]"
            >
              <option value="en">English</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>
        </div>

        <div className="mt-8 pt-4 flex justify-end">
          <button className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-all shadow-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
