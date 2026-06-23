'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'text-white',
    'bg-gradient-to-br from-primary to-primary-light',
    'shadow-[0_4px_14px_rgba(15,76,92,0.3)]',
    'hover:shadow-[0_6px_20px_rgba(15,76,92,0.4)]',
    'hover:from-primary-light hover:to-primary',
    'focus:ring-primary/40',
    'active:scale-[0.98]',
  ].join(' '),
  secondary: [
    'text-white',
    'bg-gradient-to-br from-secondary to-success',
    'shadow-[0_4px_14px_rgba(91,138,114,0.3)]',
    'hover:shadow-[0_6px_20px_rgba(91,138,114,0.4)]',
    'hover:from-success hover:to-secondary',
    'focus:ring-secondary/40',
    'active:scale-[0.98]',
  ].join(' '),
  danger: [
    'text-white',
    'bg-gradient-to-br from-danger to-severe',
    'shadow-[0_4px_14px_rgba(224,122,95,0.3)]',
    'hover:shadow-[0_6px_20px_rgba(224,122,95,0.4)]',
    'hover:from-severe hover:to-danger',
    'focus:ring-danger/40',
    'active:scale-[0.98]',
  ].join(' '),
  ghost: [
    'text-primary',
    'bg-transparent',
    'hover:bg-primary/[0.06]',
    'focus:ring-primary/20',
    'active:bg-primary/10 active:scale-[0.98]',
  ].join(' '),
  outline: [
    'text-primary',
    'bg-white',
    'border-2 border-primary/20',
    'hover:border-primary/40 hover:bg-primary/[0.03]',
    'focus:ring-primary/20',
    'active:scale-[0.98]',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-300 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none',
        'hover:-translate-y-0.5',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}

export default Button;
