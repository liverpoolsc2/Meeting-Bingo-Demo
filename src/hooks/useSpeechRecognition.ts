/**
 * useSpeechRecognition Hook
 *
 * A React hook that wraps the Web Speech API for speech-to-text functionality.
 * Provides continuous speech recognition with interim results.
 */

import { useState, useRef, useCallback, useEffect } from 'react';

// ============================================================================
// Web Speech API Type Declarations
// ============================================================================

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

// Extend the Window interface for cross-browser support
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

// ============================================================================
// Return Interface
// ============================================================================

export interface UseSpeechRecognitionReturn {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

// ============================================================================
// Hook Implementation
// ============================================================================

/**
 * Hook for speech recognition using the Web Speech API
 *
 * @returns Object containing recognition state and control functions
 *
 * @example
 * ```tsx
 * const {
 *   isSupported,
 *   isListening,
 *   transcript,
 *   interimTranscript,
 *   error,
 *   startListening,
 *   stopListening,
 *   resetTranscript
 * } = useSpeechRecognition();
 *
 * if (!isSupported) {
 *   return <p>Speech recognition not supported</p>;
 * }
 *
 * return (
 *   <div>
 *     <button onClick={isListening ? stopListening : startListening}>
 *       {isListening ? 'Stop' : 'Start'}
 *     </button>
 *     <p>Final: {transcript}</p>
 *     <p>Interim: {interimTranscript}</p>
 *   </div>
 * );
 * ```
 */
export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  // Check for Web Speech API support
  const isSupported =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition !== undefined ||
      window.webkitSpeechRecognition !== undefined);

  // State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const shouldBeListeningRef = useRef(false);

  /**
   * Initialize the speech recognition instance
   */
  const initRecognition = useCallback(() => {
    if (!isSupported) return null;

    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) return null;

    const recognition = new SpeechRecognitionClass();

    // Configure recognition
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // Handle results
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let currentInterimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (!result) continue;
        const alternative = result[0];
        if (!alternative) continue;
        const transcriptText = alternative.transcript;

        if (result.isFinal) {
          finalTranscript += transcriptText;
        } else {
          currentInterimTranscript += transcriptText;
        }
      }

      // Accumulate final transcript
      if (finalTranscript) {
        setTranscript((prev) => {
          const separator = prev && finalTranscript ? ' ' : '';
          return prev + separator + finalTranscript.trim();
        });
      }

      // Update interim transcript
      setInterimTranscript(currentInterimTranscript);
    };

    // Handle errors
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const errorMessages: Record<string, string> = {
        'no-speech': 'No speech was detected. Please try again.',
        'audio-capture': 'No microphone was found or microphone is not working.',
        'not-allowed': 'Microphone permission was denied.',
        'network': 'Network error occurred during recognition.',
        'aborted': 'Speech recognition was aborted.',
        'language-not-supported': 'The specified language is not supported.',
        'service-not-allowed': 'Speech recognition service is not allowed.',
      };

      const message = errorMessages[event.error] || `Speech recognition error: ${event.error}`;
      setError(message);

      // Don't auto-restart on permission or critical errors
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        shouldBeListeningRef.current = false;
        setIsListening(false);
      }
    };

    // Handle end - auto-restart if should still be listening
    recognition.onend = () => {
      if (shouldBeListeningRef.current) {
        // Clear interim transcript on restart
        setInterimTranscript('');
        try {
          recognition.start();
        } catch (e) {
          // Recognition might already be started
          setIsListening(false);
          shouldBeListeningRef.current = false;
        }
      } else {
        setIsListening(false);
        setInterimTranscript('');
      }
    };

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    return recognition;
  }, [isSupported]);

  /**
   * Start speech recognition
   */
  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    // Clear any previous error
    setError(null);

    // Initialize recognition if needed
    if (!recognitionRef.current) {
      recognitionRef.current = initRecognition();
    }

    if (recognitionRef.current) {
      shouldBeListeningRef.current = true;
      try {
        recognitionRef.current.start();
      } catch (e) {
        // Recognition might already be started
        if (e instanceof Error && e.message.includes('already started')) {
          // Already running, just ensure state is correct
          setIsListening(true);
        } else {
          setError('Failed to start speech recognition.');
          shouldBeListeningRef.current = false;
        }
      }
    }
  }, [isSupported, initRecognition]);

  /**
   * Stop speech recognition
   */
  const stopListening = useCallback(() => {
    shouldBeListeningRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Recognition might already be stopped
      }
    }

    setIsListening(false);
    setInterimTranscript('');
  }, []);

  /**
   * Reset the transcript
   */
  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      shouldBeListeningRef.current = false;

      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Ignore cleanup errors
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
}

export default useSpeechRecognition;
