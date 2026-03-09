import { useState, useEffect, useCallback } from "react";

/**
 * Drop-in replacement for useState that persists to localStorage.
 * Follows the same pattern as PreferencesContext: lazy init + sync write.
 */
export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) return defaultValue;
      return JSON.parse(saved) as T;
    } catch {
      return defaultValue;
    }
  });

  const setPersistedState = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    },
    [key]
  );

  // Cross-tab sync (mirrors PreferencesContext pattern)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          setState(e.newValue !== null ? JSON.parse(e.newValue) : defaultValue);
        } catch {
          setState(defaultValue);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, defaultValue]);

  return [state, setPersistedState];
}
