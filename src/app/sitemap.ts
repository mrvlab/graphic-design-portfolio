import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { sitemapQuery } from '@/sanity/lib/queries';
import { getSiteUrl } from '@/utils/siteUrl';

export const revalidate = 3600;

// sitemap.ts runs outside a request, so it uses the plain client rather than
// sanityFetch (which reads draft-mode cookies). Stega is configured on the
// shared client and must never leak into <loc>.
const seoClient = client.withConfig({ stega: false, perspective: 'published' });

const STATIC_PAGES = [
  { id: 'projectsIndex', path: 'projects' },
  { id: 'aboutPage', path: 'about' },
  { id: 'contactPage', path: 'contact' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const { pages, projects, nav } = await seoClient.fetch(sitemapQuery);

  const navSlugs = new Set(nav.map((item) => item.slug));
  const updatedAt = (id: string) => {
    const page = pages.find((item) => item._id === id);
    return page?._updatedAt ? new Date(page._updatedAt) : new Date();
  };

  return [
    {
      // Matches the home canonical exactly, which Next emits without a
      // trailing slash.
      url: baseUrl,
      lastModified: updatedAt('homePage'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...STATIC_PAGES.map(({ id, path }) => ({
      url: `${baseUrl}/${path}`,
      lastModified: updatedAt(id),
      changeFrequency: 'monthly' as const,
      priority: navSlugs.has(path) ? 0.8 : 0.6,
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/project/${project.slug}`,
      lastModified: project._updatedAt
        ? new Date(project._updatedAt)
        : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
