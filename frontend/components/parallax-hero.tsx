'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={imageRef}
      className="relative w-full h-96 sm:h-[500px] lg:h-[650px] flex items-center justify-center overflow-hidden"
      style={{
        perspective: '1000px',
      }}
    >
      {/* Red circular glow background - premium effect */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-red-700 via-red-600 to-red-800 blur-3xl opacity-35" />
      </div>

      {/* Gradient overlay top */}
      <div className="absolute inset-0 top-0 h-32 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-10" />

      {/* Parallax image container with title overlay */}
      <div
        className="relative w-full h-full flex items-center justify-center z-5"
        style={{
          transform: `translateY(${scrollY * 0.4}px) scale(${1 - scrollY * 0.0005})`,
          opacity: Math.max(0.3, 1 - scrollY * 0.003),
          willChange: 'transform, opacity',
        }}
      >
        {/* Image */}
        <Image
          src="/spiderverse-character.png"
          alt="Spiderman character"
          width={450}
          height={600}
          className="object-contain drop-shadow-2xl"
          priority
          quality={100}
        />

        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-center px-6 sm:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Convert Movie Frames Into a{' '}
              <span className="italic text-red-400">Compressed Image</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Gradient overlay bottom */}
      <div className="absolute inset-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10" />

      {/* Subtle vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}
