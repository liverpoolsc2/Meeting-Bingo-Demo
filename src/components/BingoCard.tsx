import type { BingoCard as BingoCardType } from '@/types';
import { BingoSquare } from './BingoSquare';
import { cn } from '@/lib/utils';

interface BingoCardProps {
  card: BingoCardType;
  winningSquares?: string[];
  onSquareClick: (squareId: string) => void;
}

const BINGO_LETTERS = ['B', 'I', 'N', 'G', 'O'];

/**
 * BingoCard component that renders a 5x5 grid of BingoSquare components.
 * Handles displaying the card state including filled squares and winning highlights.
 */
export function BingoCard({
  card,
  winningSquares = [],
  onSquareClick,
}: BingoCardProps): React.ReactElement {
  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto',
        'glass rounded-2xl',
        'p-3 sm:p-4',
        'animate-scale-in'
      )}
      role="grid"
      aria-label="Bingo card"
    >
      {/* BINGO Header */}
      <div className="grid grid-cols-5 gap-1 sm:gap-2 mb-2 sm:mb-3">
        {BINGO_LETTERS.map((letter, index) => (
          <div
            key={letter}
            className={cn(
              'aspect-square flex items-center justify-center',
              'text-xl sm:text-2xl font-bold',
              'bg-gradient-to-br from-purple-500/30 to-indigo-500/30',
              'border border-purple-400/30 rounded-lg',
              'text-white',
              'animate-slide-down'
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Bingo Grid */}
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {card.squares.map((row, rowIndex) =>
          row.map((square, colIndex) => (
            <div
              key={square.id}
              className="animate-scale-in opacity-0"
              style={{
                animationDelay: `${(rowIndex * 5 + colIndex) * 0.03 + 0.3}s`,
                animationFillMode: 'forwards',
              }}
            >
              <BingoSquare
                word={square.word}
                isFilled={square.isFilled}
                isAutoFilled={square.isAutoFilled}
                isFreeSpace={square.isFreeSpace}
                isWinningSquare={winningSquares.includes(square.id)}
                onClick={() => onSquareClick(square.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
