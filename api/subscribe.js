// api/subscribe.js
// This file acts as a serverless function or API endpoint using ES Module syntax.
import SibApiV3Sdk from '@getbrevo/brevo';

// This function will be exported and used by the server environment.
export default async function handler(req, res) {
  // 1. Log the start of the function and the request method
  console.log(`Function invoked. Method: ${req.method}`);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // 2. Log the request body to see what data is being received
  console.log('Request body:', req.body);

  const { name, email, result } = req.body;

  // --- Configuration ---
  // The list IDs you provided. Make sure these are correct.
  const LIST_IDS = {
    DRAMA_MAGNET: 5,
    ESCAPE_ARTIST: 4,
    PERFECTIONIST: 6,
    SELF_SACRIFICER: 3
  };
  
  // Check for required fields
  if (!name || !email || !result) {
    console.error('Validation Error: Missing required fields.');
    return res.status(400).json({ error: 'Missing required fields: name, email, and result are required.' });
  }

  const listId = LIST_IDS[result];
  if (!listId) {
    // 3. Log an error if the result type from the quiz is invalid
    console.error(`Validation Error: Invalid result type "${result}" received. No matching list ID found.`);
    return res.status(400).json({ error: 'Invalid quiz result provided.' });
  }
  
  // 4. Check for the API key and log a specific error if it's missing
  if (!process.env.BREVO_API_KEY) {
    console.error('Configuration Error: BREVO_API_KEY environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error. Please contact support.' });
  }
  
  console.log(`Attempting to add user "${email}" to list ID: ${listId}`);

  // Initialize Brevo API client
  const apiInstance = new SibApiV3Sdk.ContactsApi();
  const apiKey = apiInstance.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  try {
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    createContact.attributes = { FIRSTNAME: name };
    createContact.listIds = [listId];
    createContact.updateEnabled = true; // Update the contact if they already exist

    console.log('Sending request to Brevo API...');
    await apiInstance.createContact(createContact);
    console.log('Successfully added contact to Brevo.');

    res.status(200).json({ success: true });

  } catch (error) {
    // 5. Log the detailed error from Brevo
    console.error('Brevo API Error:', error.body || error.message);
    const errorMessage = error.body?.message || 'An error occurred while subscribing. Please try again.';
    res.status(500).json({ error: errorMessage });
  }
}