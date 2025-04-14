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

  const imageUrl =
    urlForImage(page?.seo?.image)?.url() ?? 'https://your-default-image.png';

  let imageWidth = 1200;
  let imageHeight = 630;

  if (
    page?.seo?.image &&
    typeof page.seo.image === 'object' &&
    'asset' in page.seo.image &&
    page.seo.image.asset
  ) {
    try {
      const imageAssetQuery = `*[_type == "sanity.imageAsset" && _id == $id][0]{
        metadata {
          dimensions {
            width,
            height
          }
        }
      }`;

      const imageAssetId = page.seo.image.asset._ref;
      const { data: imageAsset } = await sanityFetch({
        query: imageAssetQuery,
        params: { id: imageAssetId },
        stega: false,
      });

      if (imageAsset?.metadata?.dimensions) {
        imageWidth = imageAsset.metadata.dimensions.width;
        imageHeight = imageAsset.metadata.dimensions.height;
      }
    } catch (error) {
      console.error('Error fetching image dimensions:', error);
    }
  }

  return {
    title: fullTitle,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: settings?.title || 'Martina Quirici',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    other: {
      'og:site_name': settings?.title || 'Martina Quirici',
      'og:locale': 'en_US',
      'og:type': 'website',
      'og:image:width': imageWidth.toString(),
      'og:image:height': imageHeight.toString(),
      'og:image:alt': title,
      'og:image:secure_url': imageUrl,
      'og:image:type': 'image/jpeg',
    },
  };
}
