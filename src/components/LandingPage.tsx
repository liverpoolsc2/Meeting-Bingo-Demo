import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface LandingPageProps {
  onStart: () => void;
}

function Particles(): React.ReactElement {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={cn(
            'particle',
            i % 3 === 0 && 'w-3 h-3',
            i % 3 === 1 && 'w-2 h-2',
            i % 3 === 2 && 'w-1 h-1'
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

function GradientOrbs(): React.ReactElement {
  return (
    <>
      {/* Top-left purple orb */}
      <div
        className="orb-purple w-96 h-96 -top-48 -left-48 animate-float-slow"
        style={{ animationDelay: '0s' }}
      />
      {/* Bottom-right cyan orb */}
      <div
        className="orb-cyan w-80 h-80 -bottom-40 -right-40 animate-float-slow"
        style={{ animationDelay: '2s' }}
      />
      {/* Center-right pink orb */}
      <div
        className="orb-pink w-64 h-64 top-1/3 -right-32 animate-float"
        style={{ animationDelay: '1s' }}
      />
    </>
  );
}

export function LandingPage({ onStart }: LandingPageProps): React.ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background effects */}
      <GradientOrbs />
      <Particles />

      {/* Main content card */}
      <div
        className={cn(
          'max-w-md w-full text-center',
          'glass rounded-3xl p-8 sm:p-10',
          'animate-float-slow',
          'relative z-10'
        )}
      >
        {/* Hero Section */}
        <div className="space-y-4 mb-8">
          <h1
            className={cn(
              'text-4xl sm:text-5xl md:text-6xl font-bold',
              'bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400',
              'bg-clip-text text-transparent',
              'animate-slide-down'
            )}
          >
            Meeting Bingo
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 font-medium animate-fade-in">
            Turn boring meetings into fun!
          </p>
        </div>

        {/* Description */}
        <div className="space-y-3 text-white/60 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-base sm:text-lg">
            Meeting Bingo listens to your meetings and automatically detects
            common buzzwords and phrases.
          </p>
          <p className="text-base sm:text-lg">
            Mark off squares as they happen and see how quickly you can get
            Bingo!
          </p>
        </div>

        {/* Call to Action */}
        <div className="pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button
            size="lg"
            variant="glass-glow"
            onClick={onStart}
            className="w-full sm:w-auto min-w-[200px]"
          >
            Start Playing
          </Button>
        </div>

        {/* Decorative shimmer line */}
        <div className="absolute bottom-0 left-0 right-0 h-px shimmer opacity-50" />
      </div>
    </div>
  );
}
