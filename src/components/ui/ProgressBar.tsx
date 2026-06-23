'use client';

import React from 'react';

type ProgressColor = 'primary' | 'success' | 'warning' | 'danger' | 'severe';
type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  color?: ProgressColor;
  size?: ProgressSize;
  className?: string;
  animated?: boolean;
}

const colorClasses: Record<ProgressColor, string> = {
  primary: 'bg-gradient-to-r from-primary to-primary-light',
  success: 'bg-gradient-to-r from-secondary to-success',
  warning: 'bg-gradient-to-r from-warning to-[#EDB96A]',
  danger: 'bg-gradient-to-r from-danger to-[#E99784]',
  severe: 'bg-gradient-to-r from-severe to-danger',
};

const trackColors: Record<ProgressColor, string> = {
  primary: 'bg-primary/10',
  success: 'bg-success/10',
  warning: 'bg-warning/15',
  danger: 'bg-danger/10',
  severe: 'bg-severe/10',
};

const sizeClasses: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export function ProgressBar({
  value,
  label,
  showPercentage = false,
  color = 'primary',
  size = 'md',
  className = '',
  animated = true,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-sm font-medium text-slate-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold text-slate-600 tabular-nums">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full rounded-full overflow-hidden ${trackColors[color]} ${sizeClasses[size]}`}
      >
        <div
          className={[
            'h-full rounded-full',
            colorClasses[color],
            animated
              ? 'transition-all duration-1000 ease-in-out'
              : '',
            size === 'lg' ? 'shadow-sm' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
