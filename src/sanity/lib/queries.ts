import { defineQuery } from 'next-sanity';

export const fetchSeo = defineQuery(`
*[_type == "homePage"][0]{
  seo {
  title,
  description,
  image {
    _type,
    asset
  }
}
}
`);

export const fetchSeoTitle = defineQuery(`
  *[_type == "projects" && slug.current == $slug][0]{
    title,
    seo {
      title,
      description,
      image {
        _type,
        asset
      }
    }
  }
`);

export const settingsQuery = defineQuery(`
*[_type == "settings"][0]{
  _id,
  title,
  description,
  title,
  description,
  image {
    _type,
    asset
  },
  enterSiteText
}
`);

export const navigationQuery = defineQuery(`
  *[_type == "navigation"] | order(_updatedAt desc)[0...12]{
    _id,
    name,
    "slug": slug.current,
    _updatedAt
  }
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
export const fetchHomePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    projects[]->{
    _id,
    name,
    "slug": slug.current,
    title,
    year,
    richText,
    images {
      _type,
      mediaItems[] {
        _key,
        _id,
        alt,
        asset
      }
    },
    comingSoon
    },
    seo {
    title,
    description,
    image {
      _type,
      asset
    }
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
    images {
      _type,
      mediaItems[] {
        _key,
        _id,
        alt,
        asset
      }
    },
    comingSoon,
    seo {
      title,
      description,
      image {
        _type,
        asset
      }
    }
    },
    seo {
      title,
      description,
      image {
        _type,
        asset
      }
    }
  }
`);

export const singleProjectQuery = defineQuery(`
  *[_type == "projects" && slug.current == $slug][0]{
    _id,
    title,
    comingSoon,
    "slug": slug.current,
    year,
    richText,
    images {
      _type,
      mediaItems[] {
        _key,
        alt,
        asset
      }
    },
    sectionList[] {
      _type == "section" => {
        _type,
        _key,
        richText,
        richTextBottom,
        images {
          _type,
          mediaItems[] {
            _key,
            alt,
            asset
          }
        }
      },
      _type == "relatedProjects" => {
        _type,
        _key,
        projects[]->{
          _id,
          title,
          "slug": slug.current,
          comingSoon,
          year,
          images {
            _type,
            mediaItems[] {
              _key,
              alt,
              asset
            }
          }
        }
      }
    },
    seo {
    title,
    description,
    image {
      _type,
      asset
    }
  }
  }
`);
export const fetchAboutQuery = defineQuery(`
  *[_type == "aboutPage"][0]{
  _id,
  languages[]->{
    _id,
    title
  },
  experiences[]->{
    _id,
    title,
    company,
    startDate,
    endDate
  },
  studies[]->{
    _id,
    title,
    institution
  },
  publications[]->{
    _id,
    title,
    url
  },
  images[]{
    ogImage{
      _key,
      asset,
      alt,
      metadataBase
    }
  },
  bodyTextSections[]{
    title,
    content
  },
  skills[]->{
    _id,
    title,
    level
  },
  softwareTools[]->{
    _id,
    title,
    category
  },
  seo {
    title,
    description,
    image {
      asset
    }
  }
}
`);
export const fetchContactQuery = defineQuery(`
  *[_type == "contactPage"][0]{
  _id,
  richText,
  seo {
    title,
    description,
    image {
      asset
    }
  }
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

// export const getPageQuery = defineQuery(`
//   *[_type == "page" && defined(slug.current)][0...12]{
//     _id,
//     name,
//     title,
//     subheading,
//     "slug": slug.current,
//     richText
// }
// `);

// export const PAGE_QUERY = defineQuery(`
//   *[_type == "page" && slug.current == $slug][0]{
//     title,
//     name,
//     subheading,
//     richText,
//     mainImage
//   }
// `);

export const projectsQuery = defineQuery(`
  *[_type == "projects" && defined(slug.current)][0...100]{
    _id,
    name,
    "slug": slug.current,
    title,
    year,
    richText,
    images {
      _type,
      mediaItems[] {
        _key,
        alt,
        asset
      }
    },
    comingSoon,
    seo {
      title,
      description,
      image {
        _type,
        asset
      }
    }
  }
`);

// export const sitemapData = defineQuery(`
//   *[_type == "page" && defined(slug.current)] | order(_type asc) {
//     "slug": slug.current,
//     _type,
//     _updatedAt,
//   }
// `);
// export const pagesSlugs = defineQuery(`
//   *[_type == "page" && defined(slug.current)]
//   {"slug": slug.current}
// `);
