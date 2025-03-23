import { defineQuery } from 'next-sanity';

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const getPageQuery = defineQuery(`
  *[_type == "page" && defined(slug.current)][0...12]{
  __id,
    name,
    title,
    subheading,
    "slug": slug.current,
    richText
}
`);

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    name,
    subheading,
    richText,
    mainImage
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
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);
