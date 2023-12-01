addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    // Parse the request body to get the caller's phone number
    const { callerNumber } = await request.json();

    // Accessing environment variables
    const TWILIO_PHONE_NUMBER = '61480092025'; // Your Twilio phone number

    // Preparing for basic auth
    const authHeader = 'Basic ' + btoa(TWILIO_ACCOUNT_SID + ':' + TWILIO_AUTH_TOKEN);

    // Twilio API request
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: callerNumber, // Number to send SMS to
        From: TWILIO_PHONE_NUMBER,
        Body: 'Your Link Goes Here: https://aatroxcommunications.com.au', // Customize your SMS message
      }),
    });

    return new Response('SMS Sent', { status: 200 });
  } else {
    return new Response('Invalid request method', { status: 405 });
  }
}
