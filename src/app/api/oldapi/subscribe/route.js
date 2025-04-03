import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function POST(request) {
  try {
    const { subscription, title, body, icon, badge, url } = await request.json();

    const payload = JSON.stringify({
      title,
      body,
      icon,
      badge,
      url,
    });

    await webpush.sendNotification(subscription, payload);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
