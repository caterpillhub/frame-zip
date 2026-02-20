'use client';

import { DownloadCountProvider } from '@/contexts/DownloadCountContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DownloadCountProvider>
      {children}
    </DownloadCountProvider>
  );
}
