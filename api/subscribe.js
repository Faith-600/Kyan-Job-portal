const mailchimp = require('@mailchimp/mailchimp_marketing');


const allowedOrigins = [
  'http://localhost:5173', 
  'https://kyan-job-portal.vercel.app/',
  "https://career.kyanbrands.org/",
'https://www.career.kyanbrands.org'

];


mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, 
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
    email_address: email,
      status: 'subscribed',
    });

    return res.status(200).json({ message: 'Successfully subscribed' });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Something went wrong' });
  }
}
