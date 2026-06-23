import React from 'react';

type SkeletonRounded = 'sm' | 'md' | 'lg' | 'full' | 'none';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: SkeletonRounded;
  className?: string;
  lines?: number;
}

const roundedClasses: Record<SkeletonRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
};

export function Skeleton({
  width,
  height,
  rounded = 'md',
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={[
        'bg-gray-200/70 animate-pulse',
        roundedClasses[rounded],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}

/* Convenience presets */

export function SkeletonText({
  lines = 3,
  className = '',
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          width={i === lines - 1 ? '75%' : '100%'}
          rounded="sm"
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`p-6 rounded-2xl bg-white/50 border border-gray-100 space-y-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <Skeleton width={40} height={40} rounded="full" />
        <div className="space-y-2 flex-1">
          <Skeleton height={14} width="60%" rounded="sm" />
          <Skeleton height={10} width="40%" rounded="sm" />
        </div>
      </div>
      <SkeletonText lines={2} />
      <Skeleton height={32} width="100%" rounded="md" />
    </div>
  );
}

export default Skeleton;
