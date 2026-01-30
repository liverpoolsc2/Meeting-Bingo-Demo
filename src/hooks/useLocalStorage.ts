import { useState, useEffect, useCallback } from 'react';

/**
 * A generic hook for persisting state to localStorage.
 *
 * Features:
 * - Works with any serializable type
 * - Handles SSR (checks for window/localStorage availability)
 * - Gracefully handles JSON parse errors
 * - Supports function updates like useState
 * - Syncs to localStorage on value changes
 *
 * @param key - The localStorage key to use
 * @param defaultValue - The default value if no stored value exists
 * @returns A tuple of [storedValue, setValue] similar to useState
 *
 * @example
 * const [settings, setSettings] = useLocalStorage('settings', { sound: true });
 * const [highScore, setHighScore] = useLocalStorage('highScore', 0);
 *
 * // Function updates are supported
 * setHighScore(prev => prev + 10);
 */
function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Lazy initializer to read from localStorage only once
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Handle SSR - check if window exists
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      // JSON parse error or localStorage access error
      console.warn(
        `useLocalStorage: Error reading key "${key}" from localStorage`,
        error
      );
      return defaultValue;
    }
  });

  // Memoized setter that handles both direct values and function updates
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prevValue) => {
        // Handle function updates like useState
        const newValue =
          value instanceof Function ? value(prevValue) : value;
        return newValue;
      });
    },
    []
  );

  // Sync to localStorage whenever storedValue changes
  useEffect(() => {
    // Handle SSR
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(
        `useLocalStorage: Error writing key "${key}" to localStorage`,
        error
      );
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
