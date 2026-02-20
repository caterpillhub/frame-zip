'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download } from 'lucide-react';
import { useDownloadCount } from '@/contexts/DownloadCountContext';

export function Navbar() {
  const pathname = usePathname();
  const { count: downloadCount, isLoaded } = useDownloadCount();

  console.log('Navbar rendered with count:', downloadCount, 'isLoaded:', isLoaded);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Compress', href: '/compress' },
    { label: 'Developer', href: '/developer' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-6 sm:py-8 mt-4 sm:mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4 sm:gap-0">
        {/* Logo and Download Count - Top Row */}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white hover:text-red-600 transition-colors">
            FrameZip
          </Link>
          <div className="flex sm:hidden items-center gap-1 text-red-700 text-xs font-medium whitespace-nowrap">
            <Download className="w-3 h-3" />
            <span>{isLoaded ? downloadCount.toLocaleString() : '...'}</span>
          </div>
        </div>

        {/* Navigation - Horizontal */}
        <div className="flex items-center gap-6 sm:gap-8 w-full sm:w-auto justify-center sm:justify-start">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs sm:text-sm font-light transition-all duration-300 ${
                isActive(item.href)
                  ? 'text-red-600'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <div className="h-0.5 bg-red-600 mt-1" />
              )}
            </Link>
          ))}
        </div>

        {/* Download Count - Right (Desktop only) */}
        <div className="hidden sm:flex items-center gap-2 text-red-700 text-sm font-medium whitespace-nowrap">
          <Download className="w-4 h-4" />
          <span>{isLoaded ? downloadCount.toLocaleString() : '...'} Downloads</span>
        </div>
      </div>
    </nav>
  );
}
