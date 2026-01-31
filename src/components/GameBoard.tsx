import { useEffect, useRef } from 'react';
import type { CategoryId } from '@/types';
import { useGame } from '@/hooks/useGame';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { BingoCard } from './BingoCard';
import { GameControls } from './GameControls';
import { TranscriptPanel } from './TranscriptPanel';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  categoryId: CategoryId;
  onWin: (stats: { time: number; wordsDetected: number }) => void;
  onGoHome: () => void;
}

/**
 * GameBoard is the main container component that orchestrates all game components.
 * It connects speech recognition to the game logic and manages the overall game flow.
 */
export function GameBoard({
  categoryId,
  onWin,
  onGoHome,
}: GameBoardProps): React.ReactElement {
  const game = useGame({ categoryId });
  const speech = useSpeechRecognition();

  // Track previous transcript to detect changes
  const prevTranscriptRef = useRef<string>('');
  // Track if we've already reported the win
  const hasReportedWinRef = useRef(false);

  // Process transcript changes through the game logic
  useEffect(() => {
    const currentTranscript = speech.transcript;

    // Only process if transcript has changed and there's new content
    if (currentTranscript && currentTranscript !== prevTranscriptRef.current) {
      game.processTranscript(currentTranscript);
      prevTranscriptRef.current = currentTranscript;
    }
  }, [speech.transcript, game]);

  // Handle win condition
  useEffect(() => {
    if (game.gameStatus === 'won' && !hasReportedWinRef.current) {
      hasReportedWinRef.current = true;
      const time = Date.now() - game.startTime;
      const wordsDetected = game.detectedWords.length;
      onWin({ time, wordsDetected });
    }
  }, [game.gameStatus, game.startTime, game.detectedWords.length, onWin]);

  // Reset win tracking when game resets
  useEffect(() => {
    if (game.gameStatus === 'playing') {
      hasReportedWinRef.current = false;
    }
  }, [game.gameStatus]);

  const handleStartListening = (): void => {
    speech.startListening();
  };

  const handleStopListening = (): void => {
    speech.stopListening();
  };

  const handleNewCard = (): void => {
    speech.resetTranscript();
    game.resetGame();
  };

  // Get winning squares for highlight
  const winningSquares = game.winningLine?.squares ?? [];

  return (
    <div
      className={cn(
        'min-h-screen',
        'flex flex-col gap-6',
        'w-full max-w-6xl mx-auto',
        'p-4 sm:p-6',
        'relative overflow-hidden'
      )}
    >
      {/* Background orbs */}
      <div className="orb-purple w-[400px] h-[400px] -top-48 -left-48 animate-float-slow fixed" />
      <div className="orb-cyan w-80 h-80 top-1/2 -right-40 animate-float-slow fixed" style={{ animationDelay: '2s' }} />
      <div className="orb-pink w-64 h-64 bottom-0 left-1/4 animate-float fixed" style={{ animationDelay: '1s' }} />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col gap-6">
        {/* Game Controls - Top */}
        <div className="w-full">
          <GameControls
            isListening={speech.isListening}
            isSupported={speech.isSupported}
            onStartListening={handleStartListening}
            onStopListening={handleStopListening}
            onNewCard={handleNewCard}
            onGoHome={onGoHome}
          />
        </div>

        {/* Main content area - responsive two-column layout */}
        <div
          className={cn(
            'grid gap-6',
            'grid-cols-1 lg:grid-cols-2',
            'items-start'
          )}
        >
          {/* Bingo Card - Left on desktop, top on mobile */}
          <div className="w-full flex justify-center">
            {game.card && (
              <BingoCard
                card={game.card}
                winningSquares={winningSquares}
                onSquareClick={game.toggleSquare}
              />
            )}
          </div>

          {/* Transcript Panel - Right on desktop, bottom on mobile */}
          <div className="w-full">
            <TranscriptPanel
              isListening={speech.isListening}
              transcript={speech.transcript}
              interimTranscript={speech.interimTranscript}
              detectedWords={game.detectedWords}
            />
          </div>
        </div>

        {/* Error display */}
        {speech.error && (
          <div
            className={cn(
              'p-4 rounded-xl',
              'glass border-red-400/30',
              'text-white',
              'animate-slide-up'
            )}
            role="alert"
          >
            <p className="font-medium text-red-300">Speech Recognition Error</p>
            <p className="text-white/70 text-sm mt-1">{speech.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
