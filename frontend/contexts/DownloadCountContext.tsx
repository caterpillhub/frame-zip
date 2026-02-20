'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'framezip_download_count';
const INITIAL_COUNT = 100;

interface DownloadCountContextType {
  count: number;
  increment: () => void;
  isLoaded: boolean;
}

const DownloadCountContext = createContext<DownloadCountContextType | undefined>(undefined);

export function DownloadCountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState<number>(INITIAL_COUNT);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Always initialize with INITIAL_COUNT (100) on first load
    console.log('Initializing download count to:', INITIAL_COUNT);
    localStorage.setItem(STORAGE_KEY, INITIAL_COUNT.toString());
    setCount(INITIAL_COUNT);
    setIsLoaded(true);

    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const newValue = parseInt(e.newValue, 10);
        console.log('Storage changed from another tab, new count:', newValue);
        setCount(newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const increment = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      console.log('Incrementing download count from', prev, 'to', newCount);
      localStorage.setItem(STORAGE_KEY, newCount.toString());
      return newCount;
    });
  };

  return (
    <DownloadCountContext.Provider value={{ count, increment, isLoaded }}>
      {children}
    </DownloadCountContext.Provider>
  );
}

export function useDownloadCount() {
  const context = useContext(DownloadCountContext);
  if (!context) {
    throw new Error('useDownloadCount must be used within DownloadCountProvider');
  }
  return context;
}
