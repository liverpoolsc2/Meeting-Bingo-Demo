import { formatDuration } from '@/lib/utils';

/**
 * Statistics for a winning game
 */
interface WinStats {
  time: number;
  wordsDetected: number;
}

/**
 * Generate shareable text for a bingo win
 *
 * @param stats - The win statistics including time and words detected
 * @returns Formatted share text with emojis and hashtag
 *
 * @example
 * generateShareText({ time: 154000, wordsDetected: 8 })
 * // Returns:
 * // "🎉 BINGO! 🎉
 * // I won Meeting Bingo in 2m 34s!
 * // Auto-detected 8 buzzwords.
 * // Play at: https://meeting-bingo.app
 * // #MeetingBingo"
 */
export function generateShareText(stats: WinStats): string {
  const formattedTime = formatDuration(stats.time);
  const wordLabel = stats.wordsDetected === 1 ? 'buzzword' : 'buzzwords';

  return `🎉 BINGO! 🎉
I won Meeting Bingo in ${formattedTime}!
Auto-detected ${stats.wordsDetected} ${wordLabel}.
Play at: https://meeting-bingo.app
#MeetingBingo`;
}

/**
 * Copy text to the clipboard
 *
 * @param text - The text to copy
 * @returns Promise that resolves to true if successful, false on error
 *
 * @example
 * const success = await copyToClipboard("Hello world");
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Share bingo win results using Web Share API or clipboard fallback
 *
 * Attempts to use the native Web Share API first for a better mobile experience.
 * Falls back to copying to clipboard if Web Share is not available.
 *
 * @param stats - The win statistics including time and words detected
 * @returns Promise that resolves to true if sharing/copying succeeded
 *
 * @example
 * const shared = await shareResults({ time: 154000, wordsDetected: 8 });
 * if (shared) {
 *   showToast("Results shared!");
 * }
 */
export async function shareResults(stats: WinStats): Promise<boolean> {
  const shareText = generateShareText(stats);

  // Try Web Share API first (better mobile experience)
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: 'Meeting Bingo - I Won!',
        text: shareText,
      });
      return true;
    } catch (error) {
      // User cancelled or share failed - fall through to clipboard
      // AbortError means user cancelled, which is expected behavior
      if (error instanceof Error && error.name === 'AbortError') {
        return false;
      }
    }
  }

  // Fall back to clipboard
  return copyToClipboard(shareText);
}
