
const mailchimp = require('@mailchimp/mailchimp_marketing');

const allowedOrigins = [
  'http://localhost:5173',
  'https://kyan-job-portal.vercel.app',
  'https://career.kyanbrands.org',
  'https://www.career.kyanbrands.org'
];

export default async function handler(req, res) {

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // STEP 2: LOG THE INCOMING DATA
  console.log("Request body:", req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
try {
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    });
    
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    });

    console.log("Mailchimp success:", response);
    return res.status(200).json({ message: 'Successfully subscribed' });
  } catch (err) {
    console.error("!!! MAILCHIMP API ERROR !!!", err.response?.body || err);
    return res.status(400).json({ error: 'An error occurred during subscription.' });
  }
}