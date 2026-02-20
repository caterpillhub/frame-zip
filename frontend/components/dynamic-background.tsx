'use client';

export function DynamicBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-black">
      {/* Base gradient layer - deep indigo to midnight blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0520] via-[#1a0a35] to-[#050015]" />

      {/* Left side buildings with perspective skew */}
      <div className="absolute left-0 top-10 w-1/4 h-3/4 bg-gradient-to-r from-[#1a1045] to-[#15084f] opacity-90 transform -skewY-12" />
      <div className="absolute left-8 top-16 w-1/5 h-2/3 bg-gradient-to-r from-[#15084f] to-[#0f0835] opacity-80 transform skewY-6" />

      {/* Right side inverted buildings */}
      <div className="absolute right-0 top-0 w-1/4 h-3/4 bg-gradient-to-l from-[#0f0835] to-[#1a1045] opacity-85 transform skewY-12" />
      <div className="absolute right-12 top-6 w-1/5 h-2/3 bg-gradient-to-l from-[#12093a] to-[#15084f] opacity-75 transform -skewY-8" />

      {/* Top floating inverted structure - left */}
      <div className="absolute left-1/3 -top-32 w-1/5 h-1/4 bg-[#1a1045] opacity-70 transform scale-y-[-1] blur-sm" />

      {/* Top floating inverted structure - right */}
      <div className="absolute right-1/3 -top-40 w-1/4 h-1/3 bg-[#0f0835] opacity-60 transform scale-y-[-1] blur-sm" />

      {/* Foreground bottom structures */}
      <div className="absolute bottom-0 left-1/4 w-1/5 h-1/3 bg-gradient-to-t from-[#12093a] to-transparent opacity-80" />
      <div className="absolute bottom-0 left-3/5 w-1/4 h-1/4 bg-gradient-to-t from-[#15084f] to-transparent opacity-75" />

      {/* Chromatic aberration layer - magenta right */}
      <div className="absolute inset-0 bg-gradient-to-l from-[rgba(236,20,180,0.04)] to-transparent pointer-events-none" />

      {/* Chromatic aberration layer - cyan left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,255,255,0.04)] to-transparent pointer-events-none" />

      {/* Halftone/noise texture overlay - very subtle */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(236,20,180,0.3) 1px, transparent 1px)`,
        backgroundSize: '8px 8px',
      }} />

      {/* Depth fog - top fade */}
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-[rgba(15,5,32,0.5)] to-transparent pointer-events-none" />

      {/* Depth fog - bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[rgba(5,0,15,0.4)] via-transparent to-transparent pointer-events-none" />

      {/* Vignette - dark indigo edge darkening */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 5, 32, 0.5) 100%)',
      }} />

      {/* Comic grain texture overlay - very subtle */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23ffffff' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
}
