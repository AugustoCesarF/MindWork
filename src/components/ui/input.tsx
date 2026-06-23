'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, icon, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              'block w-full rounded-xl border bg-white/80 backdrop-blur-sm',
              'px-4 py-2.5 text-sm text-slate-900',
              'placeholder:text-slate-400',
              'transition-all duration-200 ease-out',
              'focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary',
              'hover:border-slate-300',
              icon ? 'pl-10' : '',
              error
                ? 'border-severe focus:ring-severe/20 focus:border-severe'
                : 'border-slate-200',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-1.5 text-xs text-severe flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-xs text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export type { InputProps };
export default Input;
