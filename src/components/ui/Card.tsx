import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'glass' | 'glass-glow' | 'glass-soft';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: CardVariant;
  style?: React.CSSProperties;
}

const variantStyles: Record<CardVariant, string> = {
  default: cn(
    'bg-white/10 backdrop-blur-xl',
    'border border-white/20',
    'shadow-glass'
  ),
  glass: cn(
    'bg-white/10 backdrop-blur-xl',
    'border border-white/20',
    'shadow-glass'
  ),
  'glass-glow': cn(
    'bg-white/10 backdrop-blur-xl',
    'border border-purple-400/30',
    'shadow-glow-purple'
  ),
  'glass-soft': cn(
    'bg-white/5 backdrop-blur-lg',
    'border border-white/10',
    'shadow-glass-sm'
  ),
};

export function Card({
  children,
  className,
  onClick,
  variant = 'glass',
  style,
}: CardProps): React.ReactElement {
  return (
    <div
      style={style}
      className={cn(
        'rounded-2xl transition-all duration-300',
        variantStyles[variant],
        onClick && [
          'cursor-pointer',
          'hover:bg-white/15 hover:border-white/30',
          'hover:shadow-glass-lg hover:-translate-y-1',
          'active:scale-[0.99]',
        ],
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
