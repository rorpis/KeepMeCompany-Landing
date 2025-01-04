import { NextResponse } from 'next/server';

export async function GET(request) {
  const headers = Object.fromEntries(request.headers);
  
  return NextResponse.json({
    ip: request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        request.ip ||
        'unknown',
    headers: headers
  });
} 