import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card } from './ui/Card';

interface TranscriptPanelProps {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  detectedWords: string[];
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
    <Card className="p-4 flex flex-col gap-4">
      {/* Header with listening indicator */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'w-3 h-3 rounded-full',
            isListening
              ? 'bg-red-500 animate-pulse'
              : 'bg-gray-300'
          )}
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-800">
          {isListening ? 'Listening...' : 'Transcript'}
        </h2>
      </div>

      {/* Transcript display area */}
      <div
        className={cn(
          'min-h-[120px] max-h-[200px] overflow-y-auto',
          'rounded-lg border border-gray-200 bg-gray-50 p-3',
          'text-sm leading-relaxed'
        )}
        aria-live="polite"
        aria-label="Speech transcript"
      >
        {showEmptyState ? (
          <p className="text-gray-400 italic">
            Start listening to see the transcript here...
          </p>
        ) : (
          <>
            {transcript && (
              <span className="text-gray-700">{transcript}</span>
            )}
            {interimTranscript && (
              <span className="text-gray-400 italic">
                {transcript ? ' ' : ''}{interimTranscript}
              </span>
            )}
            <div ref={transcriptEndRef} />
          </>
        )}
      </div>

      {/* Detected words section */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-600">
          Detected Words
        </h3>
        <div className="flex flex-wrap gap-2 min-h-[32px]">
          {detectedWords.length > 0 ? (
            detectedWords.map((word) => (
              <span
                key={word}
                className={cn(
                  'inline-flex items-center px-3 py-1',
                  'bg-gradient-to-r from-purple-600 to-indigo-600',
                  'text-white text-sm font-medium',
                  'rounded-full shadow-sm'
                )}
              >
                {word}
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-sm italic">
              No words detected yet
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
