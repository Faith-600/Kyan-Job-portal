
import { createClient } from '@sanity/client';

const writeClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

// Helper to upload a file
const uploadFile = async (fileData) => {
  const { base64, fileName, mimeType } = fileData;
  const buffer = Buffer.from(base64, 'base64');
  return writeClient.assets.upload('file', buffer, {
    filename: fileName,
    contentType: mimeType,
  });
};

// Main handler
export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle the preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle the actual POST request
  if (req.method === 'POST') {
    try {
      const { jobId, formResponses, fileData } = req.body;

      if (!jobId || !formResponses) {
        return res.status(400).json({ message: 'Missing required fields: jobId and formResponses' });
      }

      let fileAssetRef = null;
      if (fileData) {
        const fileAsset = await uploadFile(fileData);
        fileAssetRef = {
          _type: 'file',
          asset: { _type: 'reference', _ref: fileAsset._id },
        };
      }

      const applicationDoc = {
        _type: 'application',
        submittedAt: new Date().toISOString(),
        job: { _type: 'reference', _ref: jobId },
        formResponses: formResponses,
        ...(fileAssetRef && { cvFile: fileAssetRef }),
      };

      await writeClient.create(applicationDoc);

      return res.status(200).json({ message: 'Application submitted successfully' });

    } catch (error) {
      // Log the detailed error on the server
      console.error('SERVER ERROR:', error);
      // Send back a generic error message
      return res.status(500).json({ message: "An internal server error occurred.", details: error.message });
    }
  }

  // If the method is not OPTIONS or POST
  res.setHeader('Allow', ['POST', 'OPTIONS']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}