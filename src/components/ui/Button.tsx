import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass' | 'glass-glow';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
    'hover:from-purple-500 hover:to-indigo-500',
    'shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40',
    'border border-purple-400/20'
  ),
  secondary: cn(
    'bg-white/10 backdrop-blur-lg text-white',
    'border border-white/20',
    'hover:bg-white/20 hover:border-white/30',
    'shadow-glass-sm hover:shadow-glass'
  ),
  ghost: cn(
    'bg-transparent text-white/80',
    'hover:bg-white/10 hover:text-white',
    'border border-transparent hover:border-white/10'
  ),
  glass: cn(
    'bg-white/10 backdrop-blur-xl text-white',
    'border border-white/20',
    'hover:bg-white/15 hover:border-white/30',
    'shadow-glass hover:shadow-glass-lg'
  ),
  'glass-glow': cn(
    'bg-white/10 backdrop-blur-xl text-white',
    'border border-purple-400/30',
    'hover:bg-white/15 hover:border-purple-400/50',
    'shadow-glow-purple hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]'
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className,
}: ButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-medium rounded-xl',
        'transition-all duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent',
        'active:scale-[0.98]',
        // Variant styles
        variantStyles[variant],
        // Size styles
        sizeStyles[size],
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
    >
      {children}
    </button>
  );
}
