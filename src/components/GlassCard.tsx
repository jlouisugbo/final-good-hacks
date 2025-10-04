import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', hover = false, onClick }: GlassCardProps) {
  const hoverClasses = hover
    ? 'hover:bg-white/20 hover:backdrop-blur-xl hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer'
    : '';

  return (
    <div
      className={`glass rounded-2xl p-6 shadow-lg shadow-purple-500/10 transition-all duration-500 ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
