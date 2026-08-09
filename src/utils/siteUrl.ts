export const CANONICAL_SITE_URL = 'https://www.martinaquirici.com';
export const SITE_NAME = 'Martina Quirici';
export const JOB_TITLE = 'Graphic Designer';

const stripTrailingSlash = (url: string) => url.replace(/\/+$/, '');

/**
 * Base URL for canonical links, structured data, sitemap and robots.
 *
 * Kept separate from NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL, which api.ts uses
 * as `studioUrl` for stega and click-to-edit — that one must stay pointed at
 * the deployment being previewed. It remains here only as a fallback so
 * environments without NEXT_PUBLIC_SITE_URL keep working.
 */
export const getSiteUrl = (): string =>
  stripTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
      process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL?.trim() ||
      'http://localhost:3000'
  );

/**
 * True only on the live www.martinaquirici.com build. Preview deployments
 * inherit the production Sanity preview URL, so the VERCEL_ENV check is what
 * actually keeps them out of the index.
 */
export const isCanonicalDeployment = (): boolean =>
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production') &&
  getSiteUrl() === CANONICAL_SITE_URL;
