import { NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.STRAVA_VERIFY_TOKEN || 'company_sports_verify_token_2026';

/**
 * Endpoint xác thực Webhook với Strava API (GET)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Strava Webhook Subscription verified!');
    return NextResponse.json({ 'hub.challenge': challenge }, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

/**
 * Endpoint nhận sự kiện mới từ Strava (POST)
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log('Received Strava Webhook event:', payload);

    // payload: { aspect_type: 'create', object_type: 'activity', object_id: 123456, owner_id: 998811, ... }
    if (payload.object_type === 'activity' && payload.aspect_type === 'create') {
      const activityId = payload.object_id;
      const athleteStravaId = payload.owner_id;

      // Xử lý kéo bài tập chi tiết từ Strava API và lưu vào Supabase
      console.log(`Auto-syncing activity #${activityId} for athlete #${athleteStravaId}`);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
