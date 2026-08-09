type NavItem = { name: string; url: string };

const personId = (url: string) => `${url}#person`;

export function getWebSiteJsonLd({ name, url }: { name: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    name,
    url,
    inLanguage: 'en',
    publisher: { '@id': personId(url) },
  };
}

export function getPersonJsonLd({
  name,
  jobTitle,
  url,
  image,
  description,
  sameAs,
}: {
  name: string;
  jobTitle: string;
  url: string;
  image?: string;
  description?: string;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId(url),
    name,
    jobTitle,
    url,
    ...(image && { image }),
    ...(description && { description }),
    ...(sameAs?.length && { sameAs }),
  };
}

/** Tells Google the main sections of the site — mirrors the CMS menu. */
export function getSiteNavigationJsonLd({ items }: { items: NavItem[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function getBreadcrumbJsonLd({ items }: { items: NavItem[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
