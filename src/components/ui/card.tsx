'use client';

import React from 'react';

type CardVariant = 'default' | 'glass' | 'elevated' | 'outlined';
type CardPadding = 'sm' | 'md' | 'lg' | 'none';

interface CardProps {
  variant?: CardVariant;
  hoverable?: boolean;
  padding?: CardPadding;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variantClasses: Record<CardVariant, string> = {
  default:
    'bg-white border border-gray-100 shadow-soft rounded-2xl',
  glass:
    'bg-white/70 backdrop-blur-xl border border-white/20 shadow-glass rounded-2xl',
  elevated:
    'bg-white border border-gray-50 shadow-elevated rounded-2xl',
  outlined:
    'bg-white/50 border-2 border-gray-200 rounded-2xl',
};

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'glass',
  hoverable = false,
  padding = 'md',
  className = '',
  children,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        'transition-all duration-300',
        variantClasses[variant],
        paddingClasses[padding],
        hoverable
          ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-glass-hover hover:border-accent/20'
          : '',
        onClick ? 'cursor-pointer' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

/* ---- Sub-components for structured cards ---- */

export function CardHeader({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`px-6 pt-6 pb-2 ${className}`}>{children}</div>;
}

export function CardTitle({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3 className={`text-xl font-semibold font-outfit text-slate-900 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={`text-sm text-slate-500 mt-1 ${className}`}>{children}</p>
  );
}

export function CardContent({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`px-6 pb-6 pt-2 ${className}`}>{children}</div>;
}

export default Card;
