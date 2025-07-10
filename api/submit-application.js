
import { createClient } from '@sanity/client';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false, 
  apiVersion: '2023-05-03', 
});

// A helper to upload a file asset to Sanity
const uploadFile = async (fileData) => {
  const { base64, fileName, mimeType } = fileData;
  const buffer = Buffer.from(base64, 'base64');
  
  return writeClient.assets.upload('file', buffer, {
    filename: fileName,
    contentType: mimeType,
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { jobId, formResponses, fileData } = req.body;

    let fileAssetRef = null;
    if (fileData) {
      const fileAsset = await uploadFile(fileData);
      fileAssetRef = {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: fileAsset._id,
        },
      };
    }

    const applicationDoc = {
      _type: 'application',
      submittedAt: new Date().toISOString(),
      job: {
        _type: 'reference',
        _ref: jobId,
      },
      formResponses: formResponses,
      ...(fileAssetRef && { cvFile: fileAssetRef }),
    };

    await writeClient.create(applicationDoc);

    return res.status(200).json({ message: 'Application submitted successfully' });

  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ message: "Couldn't submit application", error: error.message });
  }
}