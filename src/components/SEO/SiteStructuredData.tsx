import { sanityFetch } from '@/sanity/lib/live';
import { fetchHeaderQuery, settingsQuery } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import JsonLd from '@/components/JsonLd';
import {
  getBreadcrumbJsonLd,
  getPersonJsonLd,
  getSiteNavigationJsonLd,
  getWebSiteJsonLd,
} from '@/utils/jsonld';
import { getSiteUrl, JOB_TITLE, SITE_NAME } from '@/utils/siteUrl';

type Props = {
  variant: 'home' | 'page';
  /** Path of the current page without a leading slash, e.g. "about". */
  slug?: string;
  /** Breadcrumb label when the page is not in the menu, e.g. a project title. */
  label?: string;
};

/**
 * Emits the site-level structured data. Mounted once per segment layout —
 * never inside NavigationMenu, which every layout renders twice (mobile +
 * desktop) and would therefore duplicate every script tag.
 */
const SiteStructuredData = async ({ variant, slug, label }: Props) => {
  const baseUrl = getSiteUrl();
  const home = `${baseUrl}/`;

  const [{ data: settings }, { data: header }] = await Promise.all([
    sanityFetch({ query: settingsQuery, stega: false }),
    sanityFetch({ query: fetchHeaderQuery, stega: false }),
  ]);

  // Same source and order as the rendered menu.
  // CMS labels are trimmed — stray whitespace otherwise ends up in the markup.
  const menu = (header?.navigationItems ?? []).flatMap((item) =>
    item.slug && item.name
      ? [{ name: item.name.trim(), url: `${baseUrl}/${item.slug}` }]
      : []
  );

  const siteTitle = settings?.title?.trim() || SITE_NAME;

  const siteNavigation = getSiteNavigationJsonLd({
    items: [{ name: 'Home', url: home }, ...menu],
  });

  if (variant === 'home') {
    return (
      <>
        <JsonLd data={getWebSiteJsonLd({ name: siteTitle, url: home })} />
        <JsonLd
          data={getPersonJsonLd({
            name: header?.name?.trim() || siteTitle,
            jobTitle: header?.workTitle?.trim() || JOB_TITLE,
            url: home,
            image: resolveOpenGraphImage(settings?.image)?.url,
          })}
        />
        {menu.length > 0 && <JsonLd data={siteNavigation} />}
      </>
    );
  }

  const current = `${baseUrl}/${slug}`;
  const breadcrumb = getBreadcrumbJsonLd({
    items: [
      { name: 'Home', url: home },
      {
        name: label || menu.find((item) => item.url === current)?.name || slug!,
        url: current,
      },
    ],
  });

  return (
    <>
      {menu.length > 0 && <JsonLd data={siteNavigation} />}
      <JsonLd data={breadcrumb} />
    </>
  );
};

export default SiteStructuredData;
