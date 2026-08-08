import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className={
        'flex items-start gap-3 w-full max-w-md mx-auto mb-6 p-4 ' +
        'rounded-md bg-red-500/10 border border-red-500/20'
      }
    >
      <svg
        className="w-5 h-5 text-red-400 mt-0.5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={
            'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 ' +
            '1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 ' +
            '0L3.34 16c-.77 1.333.192 3 1.732 3z'
          }
        />
      </svg>
      <p className="text-sm text-red-400">
        {message}
      </p>
    </div>
  );
}
