import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
      // Notify other hook instances within the same window
      // so they can re-read and reflect updates immediately
      window.dispatchEvent(
        new CustomEvent('local-storage', {
          detail: { key }
        })
      );
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const item = localStorage.getItem(key);
          setStoredValue(item ? JSON.parse(item) : initialValue);
        } catch (error) {
          console.error(`Error syncing localStorage key "${key}":`, error);
        }
      }
    };

    const handleLocalStorageEvent = (event: Event) => {
      // Custom event fired after setItem in this tab; rehydrate state
      try {
        // Narrow to our event type and check key
        const detail: any = (event as CustomEvent).detail;
        if (detail?.key === key) {
          const item = localStorage.getItem(key);
          setStoredValue(item ? JSON.parse(item) : initialValue);
        }
      } catch (error) {
        console.error(`Error handling custom local-storage event for key "${key}":`, error);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('local-storage', handleLocalStorageEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('local-storage', handleLocalStorageEvent as EventListener);
    };
  }, [key, initialValue]);

  return [storedValue, setStoredValue] as const;
}
