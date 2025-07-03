
import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'hscwnpyj', 
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01', 
});