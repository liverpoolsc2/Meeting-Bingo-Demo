/**
 * Meeting Bingo - TypeScript Type Definitions
 *
 * This module exports all type definitions for the Meeting Bingo game.
 */

// ============================================================================
// Category Types
// ============================================================================

/**
 * Valid category identifiers for bingo word sets
 */
export type CategoryId = 'agile' | 'corporate' | 'tech';

/**
 * Represents a category of bingo words
 */
export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  words: string[];
}

// ============================================================================
// Bingo Card Types
// ============================================================================

/**
 * Represents a single square on the bingo card
 */
export interface BingoSquare {
  id: string;              // "row-col" format e.g., "2-3"
  word: string;
  isFilled: boolean;
  isAutoFilled: boolean;   // Filled by speech recognition
  isFreeSpace: boolean;
  filledAt: number | null; // Timestamp
  row: number;
  col: number;
}

/**
 * Represents a complete 5x5 bingo card
 */
export interface BingoCard {
  squares: BingoSquare[][]; // 5x5 grid
  words: string[];          // Flat list for detection
}

// ============================================================================
// Game State Types
// ============================================================================

/**
 * Possible states of the game
 */
export type GameStatus = 'idle' | 'setup' | 'playing' | 'won';

/**
 * Represents a winning line on the bingo card
 */
export interface WinningLine {
  type: 'row' | 'column' | 'diagonal';
  index: number;           // 0-4 for row/col, 0-1 for diagonal
  squares: string[];       // IDs of winning squares
}

/**
 * Complete game state
 */
export interface GameState {
  status: GameStatus;
  category: CategoryId | null;
  card: BingoCard | null;
  isListening: boolean;
  startedAt: number | null;
  completedAt: number | null;
  winningLine: WinningLine | null;
  winningWord: string | null;
  filledCount: number;
}

// ============================================================================
// Speech Recognition Types
// ============================================================================

/**
 * State of the speech recognition system
 */
export interface SpeechRecognitionState {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
}

// ============================================================================
// UI Types
// ============================================================================

/**
 * Represents a toast notification
 */
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  duration?: number;
}
