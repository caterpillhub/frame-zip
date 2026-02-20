'use client';

import { Navbar } from '@/components/navbar';
import { DynamicBackground } from '@/components/dynamic-background';
import { Github, Linkedin, Heart } from 'lucide-react';

export default function DeveloperPage() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/caterpillhub',
      color: 'hover:text-gray-400',
      desc: 'Check out my repositories and open source work',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/kavin-rrahul-3710b4261/',
      color: 'hover:text-blue-400',
      desc: 'Connect with me on professional network',
    },
    {
      name: 'Repository',
      icon: Heart,
      href: 'https://github.com/caterpillhub/frame-zip',
      color: 'hover:text-red-400',
      desc: 'Help improve this project on GitHub',
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      <DynamicBackground />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center relative web-accent">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-balance">
            Have a look!
          </h1>

          {/* Social Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {socialLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-red-700/50 hover:shadow-lg hover:shadow-red-800/20 transition-all duration-300 transform hover:scale-105"
                >
                  <Icon className="w-12 h-12 mb-4 mx-auto text-red-700 group-hover:text-red-600 transition-colors" />
                  <h3 className="text-lg font-semibold">{link.name}</h3>
                  <p className="text-sm text-gray-400 mt-2">{link.desc}</p>
                  <div className="mt-4 text-xs text-red-700 group-hover:translate-x-1 transition-transform inline-block">
                    Visit →
                  </div>
                </a>
              );
            })}
          </div>

          {/* Footer */}
          <div className="pt-8 text-center border-t border-neutral-800">
            <p className="text-gray-300 mb-3">
              Made with passion by an indie developer. If you find this tool useful, please consider sharing it!
            </p>
            <p className="text-sm text-gray-400">
              ◆ FrameZip - Convert, compress, create
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
