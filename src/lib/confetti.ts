import confetti from 'canvas-confetti';

/**
 * Theme colors for confetti celebrations
 * Purple, indigo, and gold to match the app theme
 */
const THEME_COLORS = ['#9333ea', '#6366f1', '#fbbf24'];

/**
 * Trigger a basic burst of confetti
 * Suitable for marking individual squares or minor achievements
 */
export function triggerConfetti(): void {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.3 },
    colors: THEME_COLORS,
  });
}

/**
 * Trigger an elaborate multi-burst confetti celebration
 * Used for BINGO wins - creates multiple bursts with staggered timing
 */
export function triggerBingoConfetti(): void {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    // Left burst
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.3 },
      colors: THEME_COLORS,
    });

    // Right burst
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.3 },
      colors: THEME_COLORS,
    });

    // Center burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.2 },
      colors: THEME_COLORS,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  // Initial large burst
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { x: 0.5, y: 0.2 },
    colors: THEME_COLORS,
  });

  // Start continuous celebration
  setTimeout(frame, 250);
}
