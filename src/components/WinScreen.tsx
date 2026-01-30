import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { formatDuration, cn } from '@/lib/utils';

interface WinScreenProps {
  stats: {
    time: number; // milliseconds
    wordsDetected: number;
  };
  onPlayAgain: () => void;
  onGoHome: () => void;
  onShare: () => void;
}

export function WinScreen({
  stats,
  onPlayAgain,
  onGoHome,
  onShare,
}: WinScreenProps): React.ReactElement {
  // Trigger confetti on mount
  useEffect(() => {
    const triggerConfetti = async () => {
      try {
        const confettiModule = await import('@/lib/confetti');
        if (confettiModule.triggerConfetti) {
          confettiModule.triggerConfetti();
        }
      } catch {
        // Confetti module not available, silently ignore
      }
    };
    triggerConfetti();
  }, []);

  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center px-4 py-8',
        'bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700'
      )}
    >
      <div
        className={cn(
          'max-w-md w-full text-center space-y-8',
          'animate-in fade-in slide-in-from-bottom-4 duration-500'
        )}
      >
        {/* Celebration Title */}
        <div className="space-y-4">
          <h1
            className={cn(
              'text-6xl sm:text-7xl md:text-8xl font-extrabold',
              'text-white drop-shadow-lg',
              'animate-in zoom-in duration-300'
            )}
          >
            BINGO!
          </h1>
          <p className="text-xl sm:text-2xl text-purple-100 font-medium">
            You did it! Congratulations!
          </p>
        </div>

        {/* Stats Card */}
        <div
          className={cn(
            'bg-white/20 backdrop-blur-sm rounded-2xl p-6',
            'border border-white/30 shadow-xl'
          )}
        >
          <h2 className="text-lg font-semibold text-white mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-white">
                {formatDuration(stats.time)}
              </p>
              <p className="text-sm text-purple-200">Time to Win</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-white">
                {stats.wordsDetected}
              </p>
              <p className="text-sm text-purple-200">Words Detected</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            size="lg"
            onClick={onPlayAgain}
            className="w-full bg-white text-purple-700 hover:bg-purple-50 hover:text-purple-800"
          >
            Play Again
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={onShare}
            className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            Share Results
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={onGoHome}
            className="w-full text-white/80 hover:text-white hover:bg-white/10"
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
