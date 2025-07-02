
import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'hscwnpyj', 
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01', 
});