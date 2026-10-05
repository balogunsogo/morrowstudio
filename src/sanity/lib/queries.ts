import {defineQuery} from 'next-sanity'

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && !(_id in path("drafts.**"))]
  | order(coalesce(orderRank, 2147483647) asc, year desc, title asc, _id asc){
    _id,
    _updatedAt,
    title,
    slug,
    year,
    client,
    disciplines,
    sector,
    orderRank,
    summary,
    coverImage,heroImage,mobileHeroImage
  }
`)

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id, _updatedAt, title, slug, year, client, sector, location, services, orderRank,
    disciplines, summary, summaryBody, coverImage, heroImage, mobileHeroImage, mobileOrder,
    mobileMetadata{client, services},
    content[]{
      _key, _type, visibility,
      _type == "textBlock" => {label, body, mobile{body}},
      _type in ["fullWidthImage", "containedImage"] => {image, alt, caption, size, alignment, mobile{image, alt, caption}},
      _type == "imagePair" => {left{image, alt, caption}, right{image, alt, caption}, leftImage, rightImage, sharedCaption,
        mobile{left{image, alt, caption}, right{image, alt, caption}, sharedCaption, order}},
      _type == "largeStatement" => {body, text, alignment},
      _type == "imageWithText" => {label, image, alt, body, layout, mobile{image, alt, body}},
      _type == "gallery" => {images, layout, mobileImageKeys},
      _type == "quoteBlock" => {quote, author, role, alignment, mobile{quote, author, role}},
      _type == "creditsBlock" => {title, items[]{_key, role, name}, mobileCreditKeys, mobileOverrides[]{_key, creditKey, role, name}},
      _type == "videoBlock" => {title, duration, sourceType, videoFile, videoUrl, poster, caption, autoplay, loop, muted}
    }
  }
`)

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage" && _id == "homepage"][0]{
    heroEyebrow,
    generalEmail,studioHours,
    heroTitle,
    heroIntro,
    mobileHeroIntro, established, availability, studioBody,studioStatementBody,studioCapabilities,archiveIntro,
    heroImage,
    location,

    featuredProjects[]{
      _key,
      layout,
      description,
      project->{
        _id,
        title,
        slug,
        year,
        client,
        disciplines,
        sector, orderRank,
        summary,
        coverImage
      }
    },

    projectIndex[]->{_id,title,slug,year,sector,disciplines,summary,coverImage,orderRank},
    mobileProjectIndex[]->{_id,title,slug,year,sector,disciplines,summary,coverImage,orderRank},

    studioStatement,
    projectIndexHeading,

    footerHeading,
    footerEmail,
    socialLinks[]{
      _key,
      label,
      url
    },
    footerLocation
  }
`)

export const ABOUT_QUERY = defineQuery(`
  *[_type == "about" && _id == "about"][0]{
    eyebrow,
      studioAddress,pressEmail,
    statement,
    statementBody, mobileStatementBody, mobileBio, primaryCaption, secondaryCaption, capabilityItems, mobileClients,
    bio,
    primaryImage,
    secondaryImage,
    capabilities,
    clients,
    recognition[]{
      _key,
      title,
      year
      ,project
    },
    contactHeading,
    contactEmail,
    socialLinks[]{
      _key,
      label,
      url
    }
  }
`)
