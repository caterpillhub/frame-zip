'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const downloadCount = 4521;

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Download', href: '/download' },
    { label: 'Developer', href: '/developer' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 py-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white hover:text-red-600 transition-colors">
          FrameZip
        </Link>

        {/* Navigation - Center */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-light transition-all duration-300 ${
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

        {/* Download Count - Right */}
        <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
          <Download className="w-4 h-4" />
          <span>{downloadCount.toLocaleString()} Downloads</span>
        </div>
      </div>
    </nav>
  );
}
