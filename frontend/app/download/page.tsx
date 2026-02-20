'use client';

import { Navbar } from '@/components/navbar';
import { DynamicBackground } from '@/components/dynamic-background';
import { Download, Github } from 'lucide-react';

export default function DownloadPage() {
  const handleDownload = () => {
    // Create a sample Python script
    const scriptContent = `#!/usr/bin/env python3
"""
FrameZip - Convert movie frames to a compressed image
"""

import os
from PIL import Image
import sys

def compress_frames(folder_path, output_name="output.png"):
    """
    Convert a folder of movie frames into a single compressed image
    """
    if not os.path.exists(folder_path):
        print(f"Error: Folder '{folder_path}' not found")
        return
    
    # Get all image files
    image_files = [f for f in os.listdir(folder_path) 
                   if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    
    if not image_files:
        print("No image files found in the folder")
        return
    
    # Sort files
    image_files.sort()
    
    print(f"Found {len(image_files)} images. Processing...")
    
    # Open images
    images = []
    for img_file in image_files:
        img_path = os.path.join(folder_path, img_file)
        img = Image.open(img_path)
        images.append(img)
    
    # Create a grid
    total = len(images)
    cols = int(total ** 0.5) + 1
    rows = (total + cols - 1) // cols
    
    # Get image dimensions
    w, h = images[0].size
    grid_width = cols * w
    grid_height = rows * h
    
    # Create new image
    output = Image.new('RGB', (grid_width, grid_height), 'black')
    
    # Paste images
    for idx, img in enumerate(images):
        row = idx // cols
        col = idx % cols
        output.paste(img, (col * w, row * h))
    
    # Save
    output.save(output_name, 'PNG', optimize=True)
    print(f"✓ Saved to {output_name}")

if __name__ == "__main__":
    # TODO: Replace with your folder path
    folder = "path/to/your/frames"
    compress_frames(folder)
`;

    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(scriptContent)
    );
    element.setAttribute('download', 'framezip.py');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      <DynamicBackground />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center relative web-accent">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-balance">
            Get the Script
          </h1>

          <p className="text-lg text-gray-400 mb-12 text-balance">
            One simple Python script. No dependencies. No installation hassle. Just download and run.
          </p>

          {/* Main Download Button */}
          <button
            onClick={handleDownload}
            className="group inline-flex items-center gap-3 px-10 py-5 gradient-red text-white rounded-full font-bold text-lg hover:gradient-red-hover hover:shadow-lg hover:shadow-red-800/50 hover:scale-105 transition-all duration-300 mb-6"
          >
            <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
            Download framezip.py
          </button>

          {/* Secondary Button */}
          <div className="mb-12">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-red-700 text-red-700 rounded-full hover:border-red-600 hover:text-red-600 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>

          {/* Info - Inline Text */}
          <div className="space-y-8 text-left max-w-2xl mx-auto">
            <div>
              <h3 className="font-semibold text-red-700 mb-2 text-lg">
                Requirements
              </h3>
              <p className="text-gray-300">
                Python 3.7+ and Pillow library (install with: <span className="text-white">pip install Pillow</span>)
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-red-700 mb-2 text-lg">
                What's Included
              </h3>
              <ul className="text-gray-300 space-y-1">
                <li>✓ Single Python script (~50 lines)</li>
                <li>✓ Runs completely offline</li>
                <li>✓ No installation beyond Python</li>
                <li>✓ MIT License - use freely</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-red-700 mb-2 text-lg">
                Quick Start
              </h3>
              <ol className="text-gray-300 space-y-1">
                <li>1. Download framezip.py</li>
                <li>2. Edit the script and replace folder path</li>
                <li>3. Run: <span className="text-white">python framezip.py</span></li>
                <li>4. Find output.png in the same folder</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
