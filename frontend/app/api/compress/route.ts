import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  // proxy request body to Python backend
  const pythonUrl = 'http://localhost:8000/compress';
  const body = await req.arrayBuffer();
  const headers: Record<string, string> = {};
  const contentType = req.headers.get('content-type');
  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  const res = await fetch(pythonUrl, {
    method: 'POST',
    body,
    headers,
  });

  const buffer = await res.arrayBuffer();

  const responseHeaders: Record<string, string> = {};
  const ct = res.headers.get('content-type');
  if (ct) responseHeaders['Content-Type'] = ct;
  const cd = res.headers.get('content-disposition');
  if (cd) responseHeaders['Content-Disposition'] = cd;

  return new NextResponse(buffer, {
    status: res.status,
    headers: responseHeaders,
  });
}
