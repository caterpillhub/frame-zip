'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { DynamicBackground } from '@/components/dynamic-background';
import { useDownloadCount } from '@/contexts/DownloadCountContext';

export default function CompressPage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const { increment: incrementDownloads } = useDownloadCount();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResultUrl(null);
    setError(null);

    const selected = e.target.files?.[0];

    if (!selected) return;

    if (!selected.name.endsWith('.zip')) {
      setError('Please upload a .zip file containing image frames.');
      return;
    }

    if (selected.size > 200 * 1024 * 1024) {
      setError('Zip file must be under 200MB.');
      return;
    }

    setFile(selected);
  };

  const handleCompress = async () => {
    if (!file) return;
    if (!API_URL) {
      setError('Backend API URL not configured.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch(`${API_URL}/compress`, {
        method: 'POST',
        body: form,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Upload failed');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);

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

      <section className="pt-40 pb-20 px-6 min-h-screen flex items-center justify-center relative">
        <div className="max-w-2xl w-full text-center">

          <h1 className="text-4xl lg:text-6xl font-bold mb-8">
            Upload ZIP & Compress
          </h1>

          <p className="text-lg text-gray-400 mb-10">
            Upload a ZIP file containing your frames. We'll merge them into one 16:9 image.
          </p>

          <div className="mb-10">
            <label
              htmlFor="file-upload"
              className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
            >
              <input
                id="file-upload"
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div>
                <p className="text-gray-400">Click or drag ZIP file here</p>
                {file && (
                  <p className="text-sm text-gray-300 mt-2">
                    {file.name}
                  </p>
                )}
              </div>
            </label>
          </div>

          <button
            onClick={handleCompress}
            disabled={!file || loading}
            className="inline-flex items-center gap-3 px-10 py-5 gradient-red text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Processing…' : 'Compress ZIP'}
          </button>

          {error && (
            <p className="text-red-500 mt-6">Error: {error}</p>
          )}

          {resultUrl && (
            <div className="mt-10">
              <p className="mb-4">Done! Download your result:</p>
              <a
                href={resultUrl}
                download="combined.jpg"
                className="inline-block px-6 py-3 bg-red-700 rounded-full hover:bg-red-600 transition"
              >
                Download Combined Image
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}