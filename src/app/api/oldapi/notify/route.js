import webpush from 'web-push';

// Set your VAPID keys here
webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Named export for POST requests
export async function POST(req) {
  try {
    const body = await req.json();
    const { subscription, title, body: messageBody, icon, badge, url } = body;

    // Debugging log for the subscription object received on the server
    console.log('Received subscription object:', subscription);

    const payload = JSON.stringify({ title, body: messageBody, icon, badge, url });

    await webpush.sendNotification(subscription, payload);
    return new Response(JSON.stringify({ message: 'Notification sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending notification:', error);
    return new Response(JSON.stringify({ error: 'Failed to send notification' }), { status: 500 });
  }
}
