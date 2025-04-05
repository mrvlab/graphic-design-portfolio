import { sanityFetch } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/utils';
import { Metadata } from 'next';
import { toPlainText } from 'next-sanity';
import { FetchSeoResult, FetchSeoTitleResult } from '../../sanity.types';

type PageData = FetchSeoResult | FetchSeoTitleResult;

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

  const baseUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL ||
    'http://localhost:3000';
  const url = slug ? `${baseUrl}/${slug}` : baseUrl;

  const description =
    page?.seo?.description ??
    (settings?.description
      ? toPlainText(settings.description)
      : 'Default description');

  const title =
    page?.seo?.title ??
    (page && 'title' in page ? page.title : null) ??
    settings?.title ??
    'Martina Quirici';

  const fullTitle =
    page?.seo?.title && settings?.title
      ? `${page.seo.title} | ${settings.title}`
      : page && 'title' in page && settings?.title
        ? `${page.title} | ${settings.title}`
        : title;

  const image =
    urlForImage(page?.seo?.image)?.url() ??
    urlForImage(settings?.image)?.url() ??
    'https://your-default-image.png';

  return {
    title: fullTitle,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
  };
}
