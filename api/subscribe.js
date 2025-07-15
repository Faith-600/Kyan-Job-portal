
const mailchimp = require('@mailchimp/mailchimp_marketing');

const allowedOrigins = [
  'http://localhost:5173',
  'https://kyan-job-portal.vercel.app',
  'https://career.kyanbrands.org',
  'https://www.career.kyanbrands.org'
];

export default async function handler(req, res) {
  // STEP 1: LOG THAT THE FUNCTION STARTED
  console.log("--- API subscribe handler started ---");

  const origin = req.headers.origin;
  console.log("Request origin:", origin);

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log("Responding to OPTIONS pre-flight request.");
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    console.log("Method not allowed:", req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // STEP 2: LOG THE INCOMING DATA
  console.log("Request body:", req.body);
  const { email } = req.body;

  if (!email) {
    console.log("Validation failed: Email is missing.");
    return res.status(400).json({ error: 'Email is required' });
  }
  
  console.log(`Email to subscribe: ${email}`);

  // STEP 3: LOG THE ENVIRONMENT VARIABLES (FOR DEBUGGING ONLY)
  // This will show if they are loaded correctly.
  console.log("Mailchimp Server Prefix:", process.env.MAILCHIMP_SERVER_PREFIX);
  console.log("Mailchimp List ID:", process.env.MAILCHIMP_LIST_ID);
  console.log("Mailchimp API Key is loaded:", !!process.env.MAILCHIMP_API_KEY); // Use !! to check if it exists without printing the key itself

  try {
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    });
    
    console.log("Attempting to add member to Mailchimp...");
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    });

    console.log("Mailchimp success:", response);
    return res.status(200).json({ message: 'Successfully subscribed' });
  } catch (err) {
    // STEP 4: LOG THE EXACT ERROR FROM MAILCHIMP
    console.error("!!! MAILCHIMP API ERROR !!!", err.response?.body || err);
    return res.status(400).json({ error: 'An error occurred during subscription.' });
  }
}