import type { BingoCard as BingoCardType } from '@/types';
import { BingoSquare } from './BingoSquare';
import { cn } from '@/lib/utils';

interface BingoCardProps {
  card: BingoCardType;
  winningSquares?: string[];
  onSquareClick: (squareId: string) => void;
}

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
        'grid grid-cols-5',
        'gap-1 sm:gap-2',
        'w-full max-w-md mx-auto',
        'p-2 sm:p-4',
        'bg-gray-100 rounded-xl'
      )}
      role="grid"
      aria-label="Bingo card"
    >
      {card.squares.map((row) =>
        row.map((square) => (
          <BingoSquare
            key={square.id}
            word={square.word}
            isFilled={square.isFilled}
            isAutoFilled={square.isAutoFilled}
            isFreeSpace={square.isFreeSpace}
            isWinningSquare={winningSquares.includes(square.id)}
            onClick={() => onSquareClick(square.id)}
          />
        ))
      )}
    </div>
  );
}
