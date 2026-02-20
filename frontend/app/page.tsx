'use client';

import { Navbar } from '@/components/navbar';
import { DynamicBackground } from '@/components/dynamic-background';
import { Lock, Zap, Code2 } from 'lucide-react';

export default function Home() {
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

        {/* Gradient Overlay Bottom - Fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-30" />
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                icon: Lock,
                title: 'Runs Locally',
                desc: 'No uploads, no cloud processing',
              },
              {
                icon: Zap,
                title: 'Privacy First',
                desc: 'Your frames stay on your machine',
              },
              {
                icon: Code2,
                title: 'Simple Setup',
                desc: 'Just Python and one script',
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <Icon className="w-8 h-8 text-red-700 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center text-balance">
            How It Works
          </h2>

          <div className="space-y-12">
            {[
              {
                number: '1',
                title: 'Download the Python Script',
                desc: 'Get the lightweight script from our download page. No installation needed beyond Python.',
              },
              {
                number: '2',
                title: 'Point to Your Folder',
                desc: 'Replace the folder path inside the script with your movie frames directory.',
              },
              {
                number: '3',
                title: 'Run Locally',
                desc: 'Execute the script on your machine. Watch as your frames compress into a single image.',
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-shrink-0 pt-1">
                  <span className="inline-flex w-10 h-10 sm:w-12 sm:h-12 rounded-full gradient-red text-white font-bold text-lg items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
