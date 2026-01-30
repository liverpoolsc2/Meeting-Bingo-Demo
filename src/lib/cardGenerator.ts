import { BingoCard, BingoSquare, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';

/**
 * Fisher-Yates shuffle algorithm
 * Returns a new shuffled array without mutating the original
 */
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}

/**
 * Generate a unique bingo card for a category
 * - Creates a 5x5 grid of BingoSquare objects
 * - Center square (2,2) is the FREE space and starts filled
 * - 24 random words from the category fill the remaining squares
 */
export function generateCard(categoryId: CategoryId): BingoCard {
  const category = CATEGORIES.find(c => c.id === categoryId);
  if (!category) {
    throw new Error(`Unknown category: ${categoryId}`);
  }

  // Shuffle and pick 24 words (25th is free space)
  const shuffledWords = shuffle(category.words);
  const selectedWords = shuffledWords.slice(0, 24);

  // Build 5x5 grid
  const squares: BingoSquare[][] = [];
  let wordIndex = 0;

  for (let row = 0; row < 5; row++) {
    const rowSquares: BingoSquare[] = [];

    for (let col = 0; col < 5; col++) {
      const isFreeSpace = row === 2 && col === 2;

      const square: BingoSquare = {
        id: `${row}-${col}`,
        word: isFreeSpace ? 'FREE' : selectedWords[wordIndex++]!,
        isFilled: isFreeSpace, // Free space starts filled
        isAutoFilled: false,
        isFreeSpace,
        filledAt: isFreeSpace ? Date.now() : null,
        row,
        col,
      };

      rowSquares.push(square);
    }

    squares.push(rowSquares);
  }

  return {
    squares,
    words: selectedWords, // For efficient word detection
  };
}

/**
 * Get all words on card (excluding free space)
 * Returns flat array for word detection
 */
export function getCardWords(card: BingoCard): string[] {
  return card.words;
}
