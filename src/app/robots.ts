import { MetadataRoute } from 'next';
import { getSiteUrl, isCanonicalDeployment } from '@/utils/siteUrl';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  // Preview and beta deployments must not be indexed — they would compete with
  // the live site as duplicate content and fragment its identity.
  if (!isCanonicalDeployment()) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/draft-mode/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
