import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card } from './ui/Card';

interface TranscriptPanelProps {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  detectedWords: string[];
}

function TypingIndicator(): React.ReactElement {
  return (
    <div className="inline-flex items-center gap-1.5 ml-2">
      <div className="typing-dot opacity-60" style={{ animationDelay: '0s' }} />
      <div className="typing-dot opacity-60" style={{ animationDelay: '0.3s' }} />
      <div className="typing-dot opacity-60" style={{ animationDelay: '0.6s' }} />
    </div>
  );
}

/**
 * Live transcript display panel that shows speech-to-text output
 * and highlights detected bingo words.
 */
export function TranscriptPanel({
  isListening,
  transcript,
  interimTranscript,
  detectedWords,
}: TranscriptPanelProps): React.ReactElement {
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when transcript updates
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, interimTranscript]);

  const hasContent = transcript || interimTranscript;
  const showEmptyState = !isListening && !hasContent;

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4 animate-scale-in">
      {/* Header with listening indicator */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'rounded-full transition-all duration-300',
            isListening
              ? 'listening-dot'
              : 'w-2 h-2 bg-white/30'
          )}
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-white">
          {isListening ? (
            <span className="flex items-center">
              Listening
              <TypingIndicator />
            </span>
          ) : (
            'Transcript'
          )}
        </h2>
      </div>

      {/* Transcript display area */}
      <div
        className={cn(
          'min-h-[120px] max-h-[200px] overflow-y-auto',
          'glass-soft rounded-xl p-4',
          'text-sm leading-relaxed',
          'scrollbar-glass'
        )}
        aria-live="polite"
        aria-label="Speech transcript"
      >
        {showEmptyState ? (
          <p className="text-white/40 italic">
            Start listening to see the transcript here...
          </p>
        ) : (
          <>
            {transcript && (
              <span className="text-white/90">{transcript}</span>
            )}
            {interimTranscript && (
              <span className="text-white/50 italic">
                {transcript ? ' ' : ''}{interimTranscript}
              </span>
            )}
            <div ref={transcriptEndRef} />
          </>
        )}
      </div>

      {/* Detected words section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-white/60">
          Detected Words
        </h3>
        <div className="flex flex-wrap gap-2 min-h-[36px]">
          {detectedWords.length > 0 ? (
            detectedWords.map((word, index) => (
              <span
                key={word}
                className={cn(
                  'inline-flex items-center px-3 py-1.5',
                  'bg-gradient-to-r from-brand-blue/25 to-brand-mint/20',
                  'border border-brand-blue/30',
                  'text-brand-cream text-sm font-medium',
                  'rounded-full',
                  'shadow-glow-blue',
                  'animate-scale-in'
                )}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {word}
              </span>
            ))
          ) : (
            <p className="text-white/40 text-sm italic">
              No words detected yet
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
