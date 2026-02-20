'use client';

import { Navbar } from '@/components/navbar';
import { DynamicBackground } from '@/components/dynamic-background';
import { Github, Linkedin, Heart } from 'lucide-react';

export default function DeveloperPage() {
  const socialLinks = [
    {
      name: 'GitHub Profile',
      icon: Github,
      href: 'https://github.com/caterpillhub',
      color: 'hover:text-gray-400',
      desc: 'Check out my repositories and open source work',
    },
    {
      name: 'LinkedIn Profile',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/kavin-rrahul-3710b4261/',
      color: 'hover:text-blue-400',
      desc: 'Connect with me on professional network',
    },
    {
      name: 'Contribute',
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Built by an Independent Developer
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-16 text-balance">
            A passion project created to solve a simple problem: efficiently organizing and compressing movie frames. Built with care, designed to be straightforward, and shared openly with the community.
          </p>

          {/* Social Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
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
                  <h3 className="text-lg font-semibold mb-2">{link.name}</h3>
                  <p className="text-sm text-gray-400">{link.desc}</p>
                  <div className="mt-4 text-xs text-red-700 group-hover:translate-x-1 transition-transform inline-block">
                    Visit →
                  </div>
                </a>
              );
            })}
          </div>

          {/* About Section - Inline Text */}
          <div className="text-left space-y-8 max-w-2xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">About This Project</h2>
              <p className="text-gray-300 mb-3">
                FrameZip started as a simple utility to handle a specific problem: converting sequences of movie frames into compressed images for efficient storage and sharing.
              </p>
              <p className="text-gray-300">
                The goal is to keep it simple, lightweight, and free to use. No complicated setup, no cloud dependencies, no tracking. Just a Python script that does one thing well.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-red-700">Why Open Source?</h3>
              <p className="text-gray-300">
                I believe in sharing tools that solve real problems. Whether you're a filmmaker, developer, or someone working with image sequences, this tool is here to help. Feel free to fork, modify, and adapt it to your needs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-red-700">Get Involved</h3>
              <p className="text-gray-300">
                Have an idea for improvement? Found a bug? Want to contribute features? All contributions are welcome! Check out the GitHub repository to open issues or submit pull requests.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 pt-8 text-center border-t border-neutral-800">
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
