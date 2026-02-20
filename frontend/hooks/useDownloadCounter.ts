import { useState, useEffect } from 'react';

const STORAGE_KEY = 'framezip_download_count';
const INITIAL_COUNT = 100;

export function useDownloadCounter() {
  const [count, setCount] = useState<number>(INITIAL_COUNT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load initial count from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCount(parseInt(stored, 10));
    } else {
      localStorage.setItem(STORAGE_KEY, INITIAL_COUNT.toString());
    }
    setIsLoaded(true);

    // Listen for changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setCount(parseInt(e.newValue, 10));
      }
    };

    // Listen for changes from same tab
    const handleCountUpdate = (e: any) => {
      setCount(e.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('downloadCountUpdated', handleCountUpdate);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('downloadCountUpdated', handleCountUpdate);
    };
  }, []);

  const increment = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem(STORAGE_KEY, newCount.toString());
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(
        new CustomEvent('downloadCountUpdated', { detail: newCount })
      );
      return newCount;
    });
  };

  return { count, increment, isLoaded };
}
