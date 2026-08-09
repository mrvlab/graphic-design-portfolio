import { sanityFetch } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import { getSiteUrl, isCanonicalDeployment, SITE_NAME } from '@/utils/siteUrl';
import { Metadata } from 'next';
import { toPlainText } from 'next-sanity';

type PageData = {
  title?: string | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    image?: unknown;
  } | null;
} | null;

export async function generateSeoMetadata({
  slug,
  page,
}: {
  slug?: string;
  page?: PageData;
}): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  });

  // CMS strings are trimmed — stray whitespace otherwise shows up in <title>.
  const siteTitle = settings?.title?.trim() || SITE_NAME;
  const isHome = !slug;

  // Next serves /about and redirects /about/ — sub-page canonicals must not
  // have a trailing slash, while the home canonical is the root "/".
  // sitemap.ts must emit these exact same strings.
  const baseUrl = getSiteUrl();
  const url = isHome ? `${baseUrl}/` : `${baseUrl}/${slug.replace(/^\/+/, '')}`;

  const description =
    page?.seo?.description ??
    (settings?.description ? toPlainText(settings.description) : undefined);

  const pageTitle =
    page?.seo?.title?.trim() || page?.title?.trim() || siteTitle;

  // The root layout applies the "%s | Martina Quirici" template, so pages
  // return their bare title. The home page opts out and stays the brand name.
  const title = isHome ? { absolute: siteTitle } : pageTitle;
  const ogTitle = isHome ? siteTitle : `${pageTitle} | ${siteTitle}`;

  const image =
    resolveOpenGraphImage(page?.seo?.image) ??
    resolveOpenGraphImage(settings?.image);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: siteTitle,
      locale: 'en_US',
      type: 'website',
      ...(image && { images: [image] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      ...(image && { images: [image.url] }),
    },
    // Preview and beta deployments must never compete with the live site.
    ...(!isCanonicalDeployment() && {
      robots: { index: false, follow: false },
    }),
  };
}
