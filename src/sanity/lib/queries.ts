import { defineQuery } from 'next-sanity';

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const navigationQuery = defineQuery(`
  *[_type == "navigation"] | order(_updatedAt desc)[0...12]{
    _id,
    name,
    "slug": slug.current,
    _updatedAt
  }
`);
export const getPageQuery = defineQuery(`
  *[_type == "page" && defined(slug.current)][0...12]{
    _id,
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

export const projectsQuery = defineQuery(`
  *[_type == "projects" && defined(slug.current)][0...100]{
    _id,
    name,
    "slug": slug.current,
    title,
    year,
    richText,
    images,
    comingSoon
}
`);

export const singleProjectQuery = defineQuery(`
  *[_type == "projects" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    title,
    year,
    richText,
    images,
    comingSoon
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

export const fetchHeaderQuery = defineQuery(`
  *[_type == "header"][0]{
    _id,
    lefttext,
    name,
    workTitle,
    projectCloseText
  }
`);

export const fetchFooterQuery = defineQuery(`
  *[_type == "footer"][0]{
    _id,
    name,
    rights,
    location,
    lefttext
  }
`);
export const fetchHomePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    projects[]->{
    _id,
    name,
    "slug": slug.current,
    title,
    year,
    richText,
    images,
    comingSoon
    }
  }
`);
export const fetchProjectsIndexQuery = defineQuery(`
  *[_type == "projectsIndex"][0]{
    projects[]->{
    _id,
    name,
    "slug": slug.current,
    title,
    year,
    richText,
    images,
    comingSoon
    }
  }
`);
