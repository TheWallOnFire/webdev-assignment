import React from 'react';
import { NavLink } from 'react-router-dom';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
    isActive
      ? 'bg-primary/10 text-primary font-medium'
      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
  }`;

const MENU_ITEMS = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg
        aria-hidden="true"
        className="w-4 h-4 opacity-70"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={
            'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 ' +
            '0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 ' +
            '0 001 1m-6 0h6'
          }
        />
      </svg>
    ),
  },
  {
    path: '/',
    label: 'Search Scores',
    icon: (
      <svg
        aria-hidden="true"
        className="w-4 h-4 opacity-70"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    path: '/reports',
    label: 'Reports',
    icon: (
      <svg
        aria-hidden="true"
        className="w-4 h-4 opacity-70"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={
            'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 ' +
            '002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 ' +
            '2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 ' +
            '0 01-2-2z'
          }
        />
      </svg>
    ),
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: (
      <svg
        aria-hidden="true"
        className="w-4 h-4 opacity-70"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={
            'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 ' +
            '002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 ' +
            '2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 ' +
            '2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 ' +
            '1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 ' +
            '00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 ' +
            '0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 ' +
            '001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
          }
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div
      className={
        'w-64 bg-slate-900 md:bg-secondary/30 border-r border-white/5 ' +
        'flex flex-col h-screen shrink-0'
      }
    >
      <div
        className={
          'h-16 px-6 flex items-center justify-between border-b ' +
          'border-white/5 shrink-0'
        }
      >
        <h2 className="text-lg font-semibold tracking-tight text-white">
          G-Scores
        </h2>
        <button
          className="md:hidden text-slate-400 hover:text-white p-2 -mr-2"
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <nav
        aria-label="Sidebar Navigation"
        className="flex-1 px-4 py-6 space-y-8 overflow-y-auto"
      >
        <div>
          <p
            className={
              'text-[11px] font-semibold text-slate-500 uppercase ' +
              'tracking-wider mb-2 px-3'
            }
          >
            Menu
          </p>
          <div className="space-y-1">
            {MENU_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={getNavLinkClass}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
