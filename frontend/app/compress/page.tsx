'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { DynamicBackground } from '@/components/dynamic-background';
import { useDownloadCount } from '@/contexts/DownloadCountContext';

export default function CompressPage() {
  const [files, setFiles] = React.useState<FileList | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const { increment: incrementDownloads } = useDownloadCount();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResultUrl(null);
    setError(null);
    setFiles(e.target.files);
  };

  const handleCompress = async () => {
    if (!files || files.length === 0) return;
    setLoading(true);
    setError(null);

    const pythonUrl = 'http://localhost:8000/compress';

    try {
      const form = new FormData();
      for (let i = 0; i < files.length; i++) {
        form.append('images', files[i]);
      }

      const res = await fetch(pythonUrl, {
        method: 'POST',
        body: form,
      });

      if (!res.ok) {
        throw new Error((await res.text()) || 'Upload failed');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      
      // Increment download counter
      console.log('Compression successful, incrementing downloads');
      incrementDownloads();
    } catch (err: any) {
      setError(err.message || 'Compression error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      <DynamicBackground />
      <Navbar />

      <section className="pt-40 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center relative web-accent">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8 text-balance">
            Upload & Compress
          </h1>

          <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 text-balance px-2">
            Drag or click to select frames; we'll combine them into one 16:9 image on the server.
          </p>

          <div className="mb-8 sm:mb-10 px-2">
            <label
              htmlFor="file-upload"
              className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
            >
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <p className="text-gray-400">Click or drag images here</p>
                {files && files.length > 0 && (
                  <p className="text-sm text-gray-300 mt-1">
                    {files.length} file{files.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            </label>
          </div>

          <button
            onClick={handleCompress}
            disabled={!files || files.length === 0 || loading}
            className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 gradient-red text-white rounded-full font-bold text-base sm:text-lg hover:gradient-red-hover hover:shadow-lg hover:shadow-red-800/50 hover:scale-105 transition-all duration-300 mb-6 sm:mb-8 disabled:opacity-50"
          >
            {loading ? 'Compressing…' : 'Compress Images'}
          </button>

          {error && (
            <p className="text-red-500 mt-4 px-2">Error: {error}</p>
          )}

          {resultUrl && (
            <div className="mt-8 sm:mt-10 px-2">
              <p className="mb-4 text-sm sm:text-base">Done! Click to download the result:</p>
              <a
                href={resultUrl}
                download="combined.jpg"
                className="inline-block px-6 py-3 bg-red-700 rounded-full hover:bg-red-600 transition text-sm sm:text-base"
              >
                Download Combined Image
              </a>
            </div>
          )}

          <div className="space-y-8 text-left max-w-2xl mx-auto mt-12 px-2 sm:px-0">
            <div>
              <h3 className="font-semibold text-red-700 mb-2 text-lg">
                How it works
              </h3>
              <p className="text-gray-300">
                The server takes the frames you upload, resizes them into vertical strips, and
                composes a 1920×1080 image you can download immediately. You don't need Python
                or any extra software on your machine.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-red-700 mb-2 text-lg">
                Requirements
              </h3>
              <p className="text-gray-300">
                Just a modern browser and some JPEG/PNG frames. Everything else runs in the cloud.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
