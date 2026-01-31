import { cn } from '@/lib/utils';

interface BingoSquareProps {
  word: string;
  isFilled: boolean;
  isAutoFilled: boolean;
  isFreeSpace: boolean;
  isWinningSquare?: boolean;
  onClick: () => void;
}

/**
 * Individual bingo square component that displays one word on the card.
 * Handles multiple visual states including filled, auto-filled, free space,
 * and winning square highlighting.
 */
export function BingoSquare({
  word,
  isFilled,
  isAutoFilled,
  isFreeSpace,
  isWinningSquare = false,
  onClick,
}: BingoSquareProps): React.ReactElement {
  const displayText = isFreeSpace ? 'FREE' : word;

  return (
    <button
      type="button"
      role="button"
      aria-pressed={isFilled}
      aria-label={isFreeSpace ? 'Free space - always filled' : `${word} - ${isFilled ? 'filled' : 'not filled'}`}
      onClick={onClick}
      disabled={isFreeSpace}
      className={cn(
        // Base styles
        'aspect-square w-full flex items-center justify-center p-1 sm:p-2',
        'text-xs sm:text-sm font-medium text-center break-words hyphens-auto',
        'rounded-lg transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:ring-offset-1 focus:ring-offset-transparent',

        // Empty state (default) - glass effect
        !isFilled && !isFreeSpace && [
          'bg-white/5 backdrop-blur-sm',
          'border border-white/10',
          'hover:bg-white/10 hover:border-white/20',
          'hover:shadow-glass-sm',
          'text-white/80',
          'cursor-pointer',
        ],

        // Filled state (manual click) - glowing filled
        isFilled && !isFreeSpace && !isAutoFilled && [
          'bg-gradient-to-br from-brand-blue to-blue-600',
          'border border-brand-blue/50',
          'shadow-glow-blue',
          'text-white',
          'cursor-default',
        ],

        // Auto-filled state (speech detected) - with shimmer
        isAutoFilled && !isFreeSpace && [
          'bg-gradient-to-br from-brand-blue to-blue-600',
          'border border-brand-blue/50',
          'shadow-glow-blue',
          'text-white',
          'cursor-default',
          'animate-bounce-in',
          // Shimmer overlay effect
          'relative overflow-hidden',
        ],

        // Free space state
        isFreeSpace && [
          'bg-gradient-to-br from-brand-mint/30 to-brand-blue/30',
          'border border-brand-mint/30',
          'shadow-glow-mint',
          'text-white',
          'cursor-default',
          'font-bold',
        ],

        // Winning square highlight - pulsing glow with lime accent
        isWinningSquare && [
          'animate-glow-pulse',
          'border-2 border-brand-lime/70',
          'shadow-[0_0_25px_rgba(237,249,37,0.5)]',
        ]
      )}
    >
      <span className="leading-tight line-clamp-3 relative z-10">
        {displayText}
      </span>

      {/* Shimmer effect overlay for auto-filled squares */}
      {isAutoFilled && !isFreeSpace && (
        <div className="absolute inset-0 shimmer rounded-lg" />
      )}
    </button>
  );
}
