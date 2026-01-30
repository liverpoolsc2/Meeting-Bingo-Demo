import { BingoCard, BingoSquare, WinningLine } from '../types';

/**
 * Safely get a square from the grid (5x5 is guaranteed)
 */
function getSquare(squares: BingoSquare[][], row: number, col: number): BingoSquare {
  return squares[row]![col]!;
}

/**
 * Check all possible winning lines
 * Returns the first winning line found, or null
 *
 * Checks in order: rows (5), columns (5), diagonals (2)
 */
export function checkForBingo(card: BingoCard): WinningLine | null {
  const { squares } = card;

  // Check rows (5 possible)
  for (let row = 0; row < 5; row++) {
    const rowSquares = squares[row]!;
    if (rowSquares.every(sq => sq.isFilled)) {
      return {
        type: 'row',
        index: row,
        squares: rowSquares.map(sq => sq.id),
      };
    }
  }

  // Check columns (5 possible)
  for (let col = 0; col < 5; col++) {
    const columnFilled = squares.every(row => row[col]!.isFilled);
    if (columnFilled) {
      return {
        type: 'column',
        index: col,
        squares: squares.map(row => row[col]!.id),
      };
    }
  }

  // Check diagonal (top-left to bottom-right)
  const diagonal1Filled = [0, 1, 2, 3, 4].every(i => getSquare(squares, i, i).isFilled);
  if (diagonal1Filled) {
    return {
      type: 'diagonal',
      index: 0,
      squares: [0, 1, 2, 3, 4].map(i => `${i}-${i}`),
    };
  }

  // Check diagonal (top-right to bottom-left)
  const diagonal2Filled = [0, 1, 2, 3, 4].every(i => getSquare(squares, i, 4 - i).isFilled);
  if (diagonal2Filled) {
    return {
      type: 'diagonal',
      index: 1,
      squares: [0, 1, 2, 3, 4].map(i => `${i}-${4 - i}`),
    };
  }

  return null;
}

/**
 * Count filled squares on the card
 */
export function countFilled(card: BingoCard): number {
  return card.squares.flat().filter(sq => sq.isFilled).length;
}

/**
 * Check how close to bingo (for UI hints)
 * Returns the line closest to completion
 */
export function getClosestToWin(card: BingoCard): { needed: number; line: string } | null {
  const { squares } = card;
  let closest = { needed: 5, line: '' };

  // Build all possible lines
  const lines: { squares: BingoSquare[]; name: string }[] = [];

  // Rows
  for (let row = 0; row < 5; row++) {
    lines.push({
      squares: squares[row]!,
      name: `Row ${row + 1}`,
    });
  }

  // Columns
  for (let col = 0; col < 5; col++) {
    lines.push({
      squares: squares.map(row => row[col]!),
      name: `Column ${col + 1}`,
    });
  }

  // Diagonals
  lines.push({
    squares: [0, 1, 2, 3, 4].map(i => getSquare(squares, i, i)),
    name: 'Diagonal ↘',
  });
  lines.push({
    squares: [0, 1, 2, 3, 4].map(i => getSquare(squares, i, 4 - i)),
    name: 'Diagonal ↙',
  });

  for (const line of lines) {
    const filled = line.squares.filter(sq => sq.isFilled).length;
    const needed = 5 - filled;
    if (needed < closest.needed && needed > 0) {
      closest = { needed, line: line.name };
    }
  }

  return closest.needed < 5 ? closest : null;
}
