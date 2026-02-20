import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useDownloadCounter() {
  const [count, setCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!API_URL) return;

    const fetchCount = async () => {
      try {
        const res = await fetch(`${API_URL}/downloads`);
        const data = await res.json();
        setCount(data.count);
      } catch (err) {
        console.error("Failed to fetch download count");
      } finally {
        setIsLoaded(true);
      }
    };

    fetchCount();
  }, []);

  const increment = async () => {
    if (!API_URL) return;

    try {
      const res = await fetch(`${API_URL}/downloads/increment`, {
        method: 'POST',
      });
      const data = await res.json();
      setCount(data.count);
    } catch (err) {
      console.error("Failed to increment download count");
    }
  };

  return { count, increment, isLoaded };
}