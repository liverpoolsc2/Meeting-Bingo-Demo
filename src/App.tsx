import { useState, useCallback } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { CategorySelect } from '@/components/CategorySelect';
import { GameBoard } from '@/components/GameBoard';
import { WinScreen } from '@/components/WinScreen';
import type { CategoryId } from '@/types';

/**
 * Valid screen states for the application
 */
type GameScreen = 'landing' | 'category' | 'game' | 'win';

/**
 * Statistics captured when a game is won
 */
interface WinStats {
  time: number;
  wordsDetected: number;
}

/**
 * Main App component with screen routing logic
 *
 * Screen Flow:
 * 1. landing -> Start button -> category
 * 2. category -> Select category -> game
 * 3. game -> Win -> win (or) Home button -> landing
 * 4. win -> Play Again -> game (same category) (or) Home -> landing
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('landing');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [winStats, setWinStats] = useState<WinStats | null>(null);

  /**
   * Navigate from landing to category selection
   */
  const handleStart = useCallback(() => {
    setCurrentScreen('category');
  }, []);

  /**
   * Handle category selection and start game
   */
  const handleCategorySelect = useCallback((categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
    setCurrentScreen('game');
  }, []);

  /**
   * Handle game win - save stats and navigate to win screen
   */
  const handleWin = useCallback((stats: { time: number; wordsDetected: number }) => {
    setWinStats(stats);
    setCurrentScreen('win');
  }, []);

  /**
   * Return to landing page and reset state
   */
  const handleGoHome = useCallback(() => {
    setCurrentScreen('landing');
    setSelectedCategory(null);
    setWinStats(null);
  }, []);

  /**
   * Play again with the same category
   */
  const handlePlayAgain = useCallback(() => {
    setWinStats(null);
    setCurrentScreen('game');
  }, []);

  /**
   * Handle sharing results via Web Share API or clipboard
   */
  const handleShare = useCallback(async () => {
    if (!winStats || !selectedCategory) return;

    const minutes = Math.floor(winStats.time / 60);
    const seconds = winStats.time % 60;
    const timeStr = minutes > 0
      ? `${minutes}m ${seconds}s`
      : `${seconds}s`;

    const shareText = `I won Meeting Bingo in ${timeStr}! Detected ${winStats.wordsDetected} buzzwords. Can you beat my time? #MeetingBingo`;

    // Try Web Share API first (mobile-friendly)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meeting Bingo',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (error) {
        // User cancelled or share failed, fall back to clipboard
        if ((error as Error).name === 'AbortError') {
          return; // User cancelled, do nothing
        }
      }
    }

    // Fall back to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      // Note: Toast notification would be handled by the component
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }, [winStats, selectedCategory]);

  /**
   * Render the appropriate screen based on current state
   */
  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onStart={handleStart} />;

      case 'category':
        return (
          <CategorySelect
            onSelect={handleCategorySelect}
          />
        );

      case 'game':
        if (!selectedCategory) {
          // Safety fallback - should never happen
          setCurrentScreen('category');
          return null;
        }
        return (
          <GameBoard
            categoryId={selectedCategory}
            onWin={handleWin}
            onGoHome={handleGoHome}
          />
        );

      case 'win':
        if (!winStats || !selectedCategory) {
          // Safety fallback - should never happen
          setCurrentScreen('landing');
          return null;
        }
        return (
          <WinScreen
            stats={winStats}
            onPlayAgain={handlePlayAgain}
            onGoHome={handleGoHome}
            onShare={handleShare}
          />
        );

      default:
        return <LandingPage onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen ai-gradient-bg">
      {renderScreen()}
    </div>
  );
}
