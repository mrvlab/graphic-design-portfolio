import { defineQuery } from 'next-sanity';

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const getPageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    name,
    title,
    subheading,
    "slug": slug.current,
    richText
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);
export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)][]{
    "slug": slug.current
  }
`);
