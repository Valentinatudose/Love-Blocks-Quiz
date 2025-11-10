import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email,
        listIds: [YOUR_ACTUAL_LIST_ID_HERE], // ← REPLACE THIS
        updateEnabled: true
      })
    });

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      const error = await response.json();
      res.status(400).json({ error: error.message || 'Subscription failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
