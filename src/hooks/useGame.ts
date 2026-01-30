import { useState, useCallback, useMemo } from 'react';
import type { BingoCard, CategoryId, GameStatus, WinningLine } from '@/types';
import { generateCard } from '@/lib/cardGenerator';
import { checkForBingo, countFilled } from '@/lib/bingoChecker';
import { detectWordsWithAliases } from '@/lib/wordDetector';

/**
 * Props for the useGame hook
 */
export interface UseGameProps {
  categoryId: CategoryId;
}

/**
 * Return type for the useGame hook
 */
export interface UseGameReturn {
  card: BingoCard;
  gameStatus: GameStatus;
  winningLine: WinningLine | null;
  detectedWords: string[];
  filledCount: number;
  startTime: number;
  toggleSquare: (squareId: string) => void;
  processTranscript: (transcript: string) => void;
  generateNewCard: () => void;
  resetGame: () => void;
}

/**
 * Main game state management hook for Meeting Bingo
 *
 * Manages:
 * - Bingo card state
 * - Game status (playing/won)
 * - Auto-filled words from speech recognition
 * - Win detection
 */
export function useGame({ categoryId }: UseGameProps): UseGameReturn {
  // Initialize card state
  const [card, setCard] = useState<BingoCard>(() => generateCard(categoryId));
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [winningLine, setWinningLine] = useState<WinningLine | null>(null);
  const [detectedWords, setDetectedWords] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(() => Date.now());

  // Compute filled count from card state
  const filledCount = useMemo(() => countFilled(card), [card]);

  // Get set of already filled words for efficient lookup
  const alreadyFilledWords = useMemo(() => {
    const filled = new Set<string>();
    for (const row of card.squares) {
      for (const square of row) {
        if (square.isFilled && !square.isFreeSpace) {
          filled.add(square.word.toLowerCase());
        }
      }
    }
    return filled;
  }, [card]);

  /**
   * Check for bingo after any card update
   * Updates game status and winning line if bingo is found
   */
  const checkAndUpdateWinStatus = useCallback((updatedCard: BingoCard) => {
    const result = checkForBingo(updatedCard);
    if (result) {
      setWinningLine(result);
      setGameStatus('won');
    }
  }, []);

  /**
   * Toggle a square's filled state manually
   * Only works while game is in 'playing' status
   */
  const toggleSquare = useCallback(
    (squareId: string) => {
      if (gameStatus !== 'playing') return;

      setCard((prevCard) => {
        // Find and toggle the square
        const newSquares = prevCard.squares.map((row) =>
          row.map((square) => {
            if (square.id === squareId && !square.isFreeSpace) {
              return {
                ...square,
                isFilled: !square.isFilled,
                filledAt: !square.isFilled ? Date.now() : null,
                // Keep isAutoFilled false for manual toggles
                isAutoFilled: false,
              };
            }
            return square;
          })
        );

        const updatedCard: BingoCard = {
          ...prevCard,
          squares: newSquares,
        };

        // Check for bingo with the updated card
        checkAndUpdateWinStatus(updatedCard);

        return updatedCard;
      });
    },
    [gameStatus, checkAndUpdateWinStatus]
  );

  /**
   * Process a speech transcript to detect and auto-fill matching words
   */
  const processTranscript = useCallback(
    (transcript: string) => {
      if (gameStatus !== 'playing' || !transcript.trim()) return;

      // Detect words in transcript that match card words
      const detected = detectWordsWithAliases(
        transcript,
        card.words,
        alreadyFilledWords
      );

      if (detected.length === 0) return;

      // Track newly detected words
      setDetectedWords((prev) => [...prev, ...detected]);

      // Auto-fill detected squares
      setCard((prevCard) => {
        const detectedLower = new Set(detected.map((w) => w.toLowerCase()));

        const newSquares = prevCard.squares.map((row) =>
          row.map((square) => {
            if (
              !square.isFilled &&
              !square.isFreeSpace &&
              detectedLower.has(square.word.toLowerCase())
            ) {
              return {
                ...square,
                isFilled: true,
                isAutoFilled: true,
                filledAt: Date.now(),
              };
            }
            return square;
          })
        );

        const updatedCard: BingoCard = {
          ...prevCard,
          squares: newSquares,
        };

        // Check for bingo with the updated card
        checkAndUpdateWinStatus(updatedCard);

        return updatedCard;
      });
    },
    [gameStatus, card.words, alreadyFilledWords, checkAndUpdateWinStatus]
  );

  /**
   * Generate a new card and reset all game state
   */
  const generateNewCard = useCallback(() => {
    setCard(generateCard(categoryId));
    setGameStatus('playing');
    setWinningLine(null);
    setDetectedWords([]);
    setStartTime(Date.now());
  }, [categoryId]);

  /**
   * Reset the game (alias for generateNewCard)
   */
  const resetGame = useCallback(() => {
    generateNewCard();
  }, [generateNewCard]);

  return {
    card,
    gameStatus,
    winningLine,
    detectedWords,
    filledCount,
    startTime,
    toggleSquare,
    processTranscript,
    generateNewCard,
    resetGame,
  };
}

export default useGame;
