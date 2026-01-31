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

function CelebrationParticles(): React.ReactElement {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Colorful celebration particles - brand colors */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={cn(
            'absolute rounded-full animate-particle-float',
            i % 4 === 0 && 'w-3 h-3 bg-brand-blue/50',
            i % 4 === 1 && 'w-2 h-2 bg-brand-mint/60',
            i % 4 === 2 && 'w-4 h-4 bg-brand-lime/50',
            i % 4 === 3 && 'w-2 h-2 bg-brand-cream/60'
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.15}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
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
        'relative overflow-hidden'
      )}
    >
      {/* Background orbs - celebration colors */}
      <div className="orb-blue w-[500px] h-[500px] -top-64 -left-64 animate-float-slow opacity-40" />
      <div className="orb-lime w-96 h-96 -bottom-48 -right-48 animate-float-slow opacity-30" style={{ animationDelay: '1s' }} />
      <div className="orb-mint w-80 h-80 top-1/4 right-0 animate-float opacity-30" style={{ animationDelay: '2s' }} />

      {/* Celebration particles */}
      <CelebrationParticles />

      <div
        className={cn(
          'max-w-md w-full text-center space-y-8',
          'relative z-10',
          'animate-scale-in'
        )}
      >
        {/* Celebration Title */}
        <div className="space-y-4">
          <h1
            className={cn(
              'text-6xl sm:text-7xl md:text-8xl font-extrabold',
              'bg-gradient-to-r from-brand-lime via-brand-mint to-brand-blue',
              'bg-clip-text text-transparent',
              'drop-shadow-[0_0_30px_rgba(237,249,37,0.5)]',
              'animate-float'
            )}
          >
            BINGO!
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
            You did it! Congratulations!
          </p>
        </div>

        {/* Stats Card */}
        <div
          className={cn(
            'glass rounded-2xl p-6',
            'border-brand-blue/30 shadow-glow-blue',
            'animate-slide-up'
          )}
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-lg font-semibold text-white/90 mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-brand-mint to-brand-blue bg-clip-text text-transparent">
                {formatDuration(stats.time)}
              </p>
              <p className="text-sm text-white/60">Time to Win</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-brand-blue to-brand-lime bg-clip-text text-transparent">
                {stats.wordsDetected}
              </p>
              <p className="text-sm text-white/60">Words Detected</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button
            size="lg"
            variant="glass-glow"
            onClick={onPlayAgain}
            className="w-full"
          >
            Play Again
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={onShare}
            className="w-full"
          >
            Share Results
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={onGoHome}
            className="w-full"
          >
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
