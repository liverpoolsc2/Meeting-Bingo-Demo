import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 *
 * Uses clsx for conditional class handling and tailwind-merge
 * for deduplicating/resolving conflicting Tailwind classes.
 *
 * @example
 * cn("px-4 py-2", "px-8") // => "py-2 px-8"
 * cn("text-red-500", condition && "text-blue-500") // => "text-blue-500" if condition
 * cn("flex", className) // => merges with passed className prop
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format milliseconds to human readable duration
 * @example formatDuration(125000) => "2m 5s"
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
