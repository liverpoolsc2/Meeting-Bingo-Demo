import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface LandingPageProps {
  onStart: () => void;
}

function DataParticles(): React.ReactElement {
  // Generate particles that float upward like data streaming to the cloud
  const particles = [...Array(20)].map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2, // 2-6px
    left: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 4 + Math.random() * 3, // 4-7s
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="data-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            bottom: '-20px',
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function GradientOrbs(): React.ReactElement {
  return (
    <>
      {/* Top-left cyan orb */}
      <div
        className="orb-cyan w-96 h-96 -top-48 -left-48 animate-float-slow"
        style={{ animationDelay: '0s' }}
      />
      {/* Bottom-right bright cyan orb */}
      <div
        className="orb-cyan-bright w-80 h-80 -bottom-40 -right-40 animate-float-slow"
        style={{ animationDelay: '2s' }}
      />
      {/* Center-right blue orb */}
      <div
        className="orb-blue w-64 h-64 top-1/3 -right-32 animate-float"
        style={{ animationDelay: '1s' }}
      />
      {/* Additional subtle cyan orb for depth */}
      <div
        className="orb-cyan w-48 h-48 top-1/4 -left-24 animate-float"
        style={{ animationDelay: '3s' }}
      />
    </>
  );
}

function GridOverlay(): React.ReactElement {
  return <div className="grid-overlay" />;
}

function AIBadge(): React.ReactElement {
  return (
    <div className="ai-badge animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      Powered by AI
    </div>
  );
}

export function LandingPage({ onStart }: LandingPageProps): React.ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background effects */}
      <GridOverlay />
      <GradientOrbs />
      <DataParticles />

      {/* Main content card with cyan AI-themed styling */}
      <div
        className={cn(
          'max-w-md w-full text-center',
          'glass-cyan rounded-3xl p-8 sm:p-10',
          'animate-float-slow',
          'relative z-10'
        )}
      >
        {/* Hero Section */}
        <div className="space-y-4 mb-6">
          <h1
            className={cn(
              'text-4xl sm:text-5xl md:text-6xl font-bold',
              'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500',
              'bg-clip-text text-transparent',
              'animate-slide-down'
            )}
          >
            Meeting Bingo
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 font-medium animate-fade-in">
            Turn boring meetings into fun!
          </p>

          {/* AI Badge */}
          <div className="flex justify-center pt-2">
            <AIBadge />
          </div>
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
            className="w-full sm:w-auto min-w-[200px] border-cyan-400/30 shadow-glow-cyan hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          >
            Start Playing
          </Button>
        </div>

        {/* Decorative shimmer line with cyan tint */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-50"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.4), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s linear infinite',
          }}
        />
      </div>
    </div>
  );
}
