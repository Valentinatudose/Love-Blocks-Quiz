// api/subscribe.js
// This file acts as a serverless function or API endpoint.
// It should be deployed in an environment that supports Node.js (e.g., Vercel, Netlify, or a traditional server).

const SibApiV3Sdk = require('@getbrevo/brevo');

// This function will be exported and used by the server environment.
module.exports = async (req, res) => {
  // Allow only POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // --- Configuration ---
  
  // The list IDs you provided.
  const LIST_IDS = {
    DRAMA_MAGNET: 6,
    ESCAPE_ARTIST: 4,
    PERFECTIONIST: 5,
    SELF_SACRIFICER: 3
  };

  // Initialize Brevo API client
  const apiInstance = new SibApiV3Sdk.ContactsApi();
  const apiKey = apiInstance.authentications['api-key'];
  
  // --- IMPORTANT SECURITY STEP ---
  // Your API key should be stored as an Environment Variable on your server, NOT here.
  // The server environment will make `process.env.BREVO_API_KEY` available to this script.
  apiKey.apiKey = process.env.BREVO_API_KEY; 
  // --------------------------------

  const { name, email, result } = req.body;
  const listId = LIST_IDS[result];

  if (!name || !email || !result || !listId) {
    return res.status(400).json({ error: 'Missing or invalid required fields.' });
  }
  
  if (!process.env.BREVO_API_KEY) {
      console.error('Brevo API key is not set in environment variables.');
      return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    createContact.attributes = { FIRSTNAME: name };
    createContact.listIds = [listId];
    createContact.updateEnabled = true; // Update the contact if they already exist

    await apiInstance.createContact(createContact);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Brevo API Error:', error.body || error.message);
    const errorMessage = error.body?.message || 'Could not subscribe user.';
    res.status(500).json({ error: errorMessage });
  }
};