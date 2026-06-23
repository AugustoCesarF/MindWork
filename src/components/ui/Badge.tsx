import React from 'react';

type BadgeVariant = 'baixo' | 'moderado' | 'alto' | 'severo' | 'info' | 'default';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const variantClasses: Record<BadgeVariant, string> = {
  baixo: 'bg-success/15 text-[#3D7A5A] border-success/20',
  moderado: 'bg-warning/20 text-[#A67C2E] border-warning/30',
  alto: 'bg-danger/15 text-[#B04430] border-danger/20',
  severo: 'bg-severe/12 text-[#C22030] border-severe/20',
  info: 'bg-accent/15 text-primary border-accent/20',
  default: 'bg-gray-100 text-gray-600 border-gray-200',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-xs',
};

const dotColors: Record<BadgeVariant, string> = {
  baixo: 'bg-success',
  moderado: 'bg-warning',
  alto: 'bg-danger',
  severo: 'bg-severe',
  info: 'bg-accent',
  default: 'bg-gray-400',
};

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  icon,
  onClick,
}: BadgeProps) {
  return (
    <span
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1.5 rounded-full font-semibold border',
        'transition-colors duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
