import { NextResponse } from 'next/server';
import { exchangeStravaToken } from '@/lib/strava';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(new URL('/profile?error=strava_auth_denied', request.url));
  }

  try {
    const tokenData = await exchangeStravaToken(code);

    // tokenData chứa access_token, refresh_token, expires_at, athlete (strava_id, firstname, lastname, profile)
    // Lưu vào DB / Cookie / Session...
    return NextResponse.redirect(new URL('/profile?success=strava_connected', request.url));
  } catch (err: any) {
    console.error('Strava token exchange error:', err);
    return NextResponse.redirect(new URL('/profile?error=token_exchange_failed', request.url));
  }
}
