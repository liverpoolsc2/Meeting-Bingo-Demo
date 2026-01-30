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
        'border rounded-lg transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1',

        // Empty state (default)
        !isFilled && !isFreeSpace && [
          'bg-white border-gray-200',
          'hover:bg-gray-50 hover:border-gray-300 cursor-pointer',
          'text-gray-700',
        ],

        // Filled state (manual click)
        isFilled && !isFreeSpace && !isAutoFilled && [
          'bg-gradient-to-br from-purple-600 to-indigo-600',
          'border-purple-700 text-white',
          'shadow-md cursor-default',
        ],

        // Auto-filled state (speech detected)
        isAutoFilled && !isFreeSpace && [
          'bg-gradient-to-br from-purple-600 to-indigo-600',
          'border-purple-700 text-white',
          'shadow-md cursor-default',
          'animate-bounce-in',
        ],

        // Free space state
        isFreeSpace && [
          'bg-gradient-to-br from-indigo-500 to-purple-500',
          'border-indigo-600 text-white',
          'shadow-sm cursor-default',
          'font-bold',
        ],

        // Winning square highlight
        isWinningSquare && [
          'ring-2 ring-yellow-400 ring-offset-2',
          'animate-pulse-fast',
          'shadow-lg shadow-yellow-400/50',
        ]
      )}
    >
      <span className="leading-tight line-clamp-3">
        {displayText}
      </span>
    </button>
  );
}
