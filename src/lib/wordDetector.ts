/**
 * Word Detector Logic for Meeting Bingo
 *
 * Provides detection of bingo card words within speech transcripts.
 * Handles single words, multi-word phrases, and common aliases.
 */

/**
 * Escape special regex characters
 */
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Normalize text for comparison
 * - Converts to lowercase
 * - Normalizes quotes and apostrophes
 * - Trims whitespace
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .trim();
}

/**
 * Check if transcript contains any card words
 * Returns array of detected words (original casing from card)
 *
 * @param transcript - The speech transcript to search
 * @param cardWords - Array of words on the bingo card
 * @param alreadyFilled - Set of words already filled (lowercase)
 */
export function detectWords(
  transcript: string,
  cardWords: string[],
  alreadyFilled: Set<string>
): string[] {
  const normalizedTranscript = normalizeText(transcript);
  const detected: string[] = [];

  for (const word of cardWords) {
    // Skip already filled words
    if (alreadyFilled.has(word.toLowerCase())) continue;

    const normalizedWord = normalizeText(word);

    // Handle multi-word phrases (direct substring match)
    if (normalizedWord.includes(' ')) {
      if (normalizedTranscript.includes(normalizedWord)) {
        detected.push(word);
      }
    } else {
      // Word boundary match for single words
      const regex = new RegExp(`\\b${escapeRegex(normalizedWord)}\\b`, 'i');
      if (regex.test(normalizedTranscript)) {
        detected.push(word);
      }
    }
  }

  return detected;
}

/**
 * Common variations/synonyms mapping
 * Maps card words to alternative phrases that should also match
 */
export const WORD_ALIASES: Record<string, string[]> = {
  'ci/cd': ['ci cd', 'cicd', 'continuous integration continuous delivery'],
  'mvp': ['minimum viable product', 'm.v.p.', 'minimum viable'],
  'roi': ['return on investment', 'r.o.i.', 'return on'],
  'api': ['a.p.i.', 'application programming interface'],
  'devops': ['dev ops', 'dev-ops', 'development operations'],
  'sla': ['s.l.a.', 'service level agreement'],
  'kpi': ['k.p.i.', 'key performance indicator'],
  'okr': ['o.k.r.', 'objectives and key results'],
  'a/b test': ['ab test', 'a b test', 'split test'],
};

/**
 * Enhanced detection with aliases
 * First checks for direct matches, then checks aliases
 */
export function detectWordsWithAliases(
  transcript: string,
  cardWords: string[],
  alreadyFilled: Set<string>
): string[] {
  // First get direct matches
  const detected = detectWords(transcript, cardWords, alreadyFilled);
  const detectedSet = new Set(detected.map((w) => w.toLowerCase()));

  const normalizedTranscript = normalizeText(transcript);

  // Check for aliases
  for (const word of cardWords) {
    const lowerWord = word.toLowerCase();

    // Skip if already detected or filled
    if (alreadyFilled.has(lowerWord)) continue;
    if (detectedSet.has(lowerWord)) continue;

    const aliases = WORD_ALIASES[lowerWord];
    if (aliases) {
      for (const alias of aliases) {
        if (normalizedTranscript.includes(alias.toLowerCase())) {
          detected.push(word);
          detectedSet.add(lowerWord);
          break;
        }
      }
    }
  }

  return detected;
}
