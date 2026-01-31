import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

interface GameControlsProps {
  isListening: boolean;
  isSupported: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onNewCard: () => void;
  onGoHome: () => void;
}

function MicrophoneIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2a1 1 0 0 1 2 0v2a5 5 0 0 0 10 0v-2a1 1 0 0 1 2 0Z" />
      <path d="M12 19a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function ShuffleIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 3h5v5" />
      <path d="M4 20 21 3" />
      <path d="M21 16v5h-5" />
      <path d="M15 15 4 4" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ListeningWaves(): React.ReactElement {
  return (
    <div className="flex items-center gap-0.5 h-4 mr-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="wave-bar h-2.5 opacity-70"
          style={{
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export function GameControls({
  isListening,
  isSupported,
  onStartListening,
  onStopListening,
  onNewCard,
  onGoHome,
}: GameControlsProps): React.ReactElement {
  const handleListeningToggle = (): void => {
    if (isListening) {
      onStopListening();
    } else {
      onStartListening();
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        'sm:flex-row sm:items-center sm:justify-center sm:gap-4',
        'animate-slide-down'
      )}
    >
      <div className="relative group">
        <Button
          variant={isListening ? 'glass' : 'glass-glow'}
          size="lg"
          disabled={!isSupported}
          onClick={handleListeningToggle}
          className={cn(
            'w-full sm:w-auto relative',
            isListening && [
              'border-pink-400/30',
              'shadow-pink-500/20',
              'hover:border-pink-400/50',
            ]
          )}
        >
          {isListening ? (
            <>
              <ListeningWaves />
              Stop Listening
            </>
          ) : (
            <>
              <MicrophoneIcon className="w-5 h-5 mr-2" />
              Start Listening
            </>
          )}
        </Button>

        {/* Tooltip for unsupported browsers */}
        {!isSupported && (
          <div
            className={cn(
              'absolute bottom-full left-1/2 -translate-x-1/2 mb-2',
              'px-4 py-2 text-sm',
              'glass rounded-lg',
              'text-white/90',
              'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
              'pointer-events-none whitespace-nowrap z-20'
            )}
            role="tooltip"
          >
            Speech recognition is not supported in your browser
            <div
              className={cn(
                'absolute top-full left-1/2 -translate-x-1/2',
                'border-4 border-transparent border-t-white/20'
              )}
            />
          </div>
        )}
      </div>

      <Button
        variant="secondary"
        size="lg"
        onClick={onNewCard}
        className="w-full sm:w-auto"
      >
        <ShuffleIcon className="w-5 h-5 mr-2" />
        New Card
      </Button>

      <Button
        variant="ghost"
        size="lg"
        onClick={onGoHome}
        className="w-full sm:w-auto"
      >
        <HomeIcon className="w-5 h-5 mr-2" />
        Home
      </Button>
    </div>
  );
}
