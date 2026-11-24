import { NextRequest, NextResponse } from 'next/server';

/**
 * licences.autoconnecto.in → /licences (same marketing app).
 * GoDaddy: A record licences → 151.185.47.153 (E2E), nginx serves website-dist.
 */
export function middleware(request: NextRequest) {
  const host = String(request.headers.get('host') || '')
    .toLowerCase()
    .split(':')[0];
  const path = request.nextUrl.pathname;

  if (
    (host === 'licences.autoconnecto.in' || host === 'license.autoconnecto.in') &&
    path === '/'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/licences';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
