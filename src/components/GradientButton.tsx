import { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function GradientButton({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
}: GradientButtonProps) {
  const variants = {
    primary: 'gradient-button hover:shadow-2xl hover:shadow-fuchsia-500/50',
    secondary: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-2xl hover:shadow-blue-500/50',
    accent: 'gradient-accent hover:shadow-2xl hover:shadow-purple-500/50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variants[variant]} text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
}
