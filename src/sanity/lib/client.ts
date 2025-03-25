// lib/sanity.client.ts
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';
import { token } from './token';

// Read preview mode from env
const isPreviewMode = process.env.NEXT_PUBLIC_SANITY_PREVIEW_MODE === 'true';

// Factory function to create the client dynamically if needed
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !isPreviewMode, // Use CDN in production (non-preview)
  perspective: isPreviewMode ? 'previewDrafts' : 'published',
  token: isPreviewMode ? token : undefined, // Only needed for previewing drafts
  ignoreBrowserTokenWarning: isPreviewMode,
  stega: {
    studioUrl,
  },
});
