import { defineQuery } from 'next-sanity';

export const fetchSeo = defineQuery(`
*[_id == "homePage" || _id == "drafts.homePage"][0]{
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
*[_id == "settings" || _id == "drafts.settings"][0]{
  _id,
  title,
  description,
  title,
  description,
  image {
    _type,
    asset
  }
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
  *[_id == "header" || _id == "drafts.header"][0]{
    _id,
    _type,
    lefttext,
    name,
    workTitle,
    projectCloseText
  }
`);
export const fetchHomePageQuery = defineQuery(`
  *[_id == "homePage" || _id == "drafts.homePage"][0]{
    _id,
    _type,
    enterSiteText,
    enterSiteLogo {
      mediaType,
      image {
        alt,
        asset-> {
          _id,
          url,
          metadata
        }
      },
      video {
        asset-> {
          _id,
          playbackId,
          assetId,
          filename,
          url
        }
      }
    },
    projects[]->{
    _id,
    name,
    "slug": slug.current,
    title,
    year,
    richText,
    mediaBackgroundColor,
    mediaGallery {
      _type,
      mediaItems[] {
        _key,
        _id,
        alt,
        asset-> {
          _id,
          _ref,
          playbackId,
          assetId,
          filename,
          url
        }
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
  *[_id == "projectsIndex" || _id == "drafts.projectsIndex"][0]{
    _id,
    _type,
    projects[]->{
    _id,
    name,
    "slug": slug.current,
    title,
    year,
    richText,
    mediaBackgroundColor,
    mediaGallery {
      _type,
      mediaItems[] {
        _key,
        _id,
        alt,
        asset-> {
          _id,
          _ref,
          playbackId,
          assetId,
          filename,
          url
        }
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
    _type,
    title,
    comingSoon,
    "slug": slug.current,
    year,
    richText,
    mediaBackgroundColor,
    mediaGallery {
      _type,
      mediaItems[] {
        _key,
        alt,
        asset-> {
          _id,
          _ref,
          playbackId,
          assetId,
          filename,
          url
        }
      }
    },
    layout,
    sectionList[] {
      _type,
      _key,
      richText,
      richTextBottom,
      sectionBgColor,
      mediaGallery {
      _type,
      mediaItems[] {
        _key,
        alt,
        asset-> {
          _id,
          _ref,
          playbackId,
          assetId,
          filename,
          url
        }
        }
      },
      projects[]->{
        _id,
        title,
        "slug": slug.current,
        comingSoon,
        year,
        mediaBackgroundColor,
        mediaGallery {
      _type,
      mediaItems[] {
        _key,
        alt,
        asset-> {
            _id,
            _ref,
            playbackId,
            assetId,
            filename,
            url
          }
        }
      },
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
  *[_id == "aboutPage" || _id == "drafts.aboutPage"][0]{
    _id,
    _type,
    languages[]->{
      _id,
      _type,
      language,
      level
    },
    experiences[]->{
      _id,
      _type,
      title,
      location,
      role,
      startDate,
      endDate
    },
    studies[]->{
      _id,
      _type,
      degree,
      institution,
      startDate,
      endDate
    },
    publications[]->{
      _id,
      _type,
      title,
      href
    },
    portrait {
      _type,
      asset
    },
    bodyTextSections[]{
      _key,
      title,
      content
    },
    skills[]->{
      _id,
      _type,
      title
    },
    softwareTools[]->{
      _id,
      _type,
      richText
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

export const fetchContactQuery = defineQuery(`
  *[_id == "contactPage" || _id == "drafts.contactPage"][0]{
  _id,
  _type,
  richText,
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

export const fetchFooterQuery = defineQuery(`
  *[_id == "footer" || _id == "drafts.footer"][0]{
    _id,
    _type,
    name,
    rights,
    timezone,
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
    mediaBackgroundColor,
    mediaGallery {
      _type,
      mediaItems[] {
        _key,
        alt,
        asset-> {
          _id,
          _ref,
          playbackId,
          assetId,
          filename,
          url
        }
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
