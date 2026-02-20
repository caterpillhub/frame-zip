'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { DynamicBackground } from '@/components/dynamic-background';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="bg-black text-white overflow-hidden relative z-0">
      <DynamicBackground />

      <Navbar />

      {/* CINEMATIC FULL-SCREEN HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        {/* Large Red Circular Backdrop - Premium Radial Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
          {/* Inner bright red core */}
          <div className="w-72 h-72 sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full blur-3xl opacity-60" style={{
            background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 0.5) 30%, rgba(185, 28, 28, 0.2) 70%, transparent 100%)',
          }} />
          {/* Outer atmospheric glow */}
          <div className="absolute w-96 h-96 sm:w-[650px] sm:h-[650px] lg:w-[900px] lg:h-[900px] rounded-full blur-2xl opacity-40" style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(220, 38, 38, 0.3) 50%, transparent 100%)',
          }} />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {/* Massive Title Text - Behind and Around Character */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black uppercase leading-none text-center max-w-5xl">
              <span className="text-white">Convert</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">
                Frames
              </span>
            </h1>
          </div>

          {/* Spider-Man Character - Masked Foreground Cut-out */}
          <div className="relative z-20 flex items-center justify-center h-full w-full px-4">
            <div
              className="w-96 sm:w-[450px] lg:w-[550px] h-auto"
              style={{
                aspectRatio: '500/700',
                backgroundImage: 'url(/spiderverse-character.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                WebkitMaskImage: 'url(/spiderverse-character.png)',
                WebkitMaskSize: 'contain',
                WebkitMaskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                maskImage: 'url(/spiderverse-character.png)',
                maskSize: 'contain',
                maskPosition: 'center',
                maskRepeat: 'no-repeat',
                filter: 'drop-shadow(0 0 80px rgba(220, 38, 38, 0.4))',
              }}
              aria-label="Spider-Man Character"
            />
          </div>
        </div>

        {/* Expandable Arrow Button - Bottom Right */}
        <Link
          href="/compress"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute bottom-8 right-8 z-40 flex items-center"
        >
          <div className={`
            flex items-center justify-center gap-3
            transition-all duration-300 ease-out
            ${isHovered 
              ? 'bg-red-700 px-6 py-3 rounded-full' 
              : 'bg-transparent px-0 py-0'
            }
            hover:bg-red-700 hover:px-6 hover:py-3
            cursor-pointer group
          `}>
            {/* Text appears only when hovered */}
            <span className={`
              font-semibold whitespace-nowrap
              transition-all duration-300
              ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}
            `}>
              Start Compressing
            </span>
            
            {/* Arrow Icon */}
            <ArrowRight className="w-6 h-6 text-white flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Gradient Overlay Bottom - Fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-30" />
      </section>
    </main>
  );
}
