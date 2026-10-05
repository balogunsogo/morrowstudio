import {defineDocuments, defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {route: '/', filter: '_type == "homepage" && _id in ["homepage", "drafts.homepage"]'},
    {route: '/about', filter: '_type == "about" && _id in ["about", "drafts.about"]'},
    {route: '/work/:slug', filter: '_type == "project" && slug.current == $slug'},
  ]),
  locations: {
    homepage: defineLocations({locations: [{title: 'Homepage', href: '/'}]}),
    about: defineLocations({locations: [{title: 'About', href: '/about'}]}),
    project: defineLocations({
      select: {title: 'title', slug: 'slug.current'},
      resolve: doc => ({
        locations: doc?.slug ? [
          {title: doc.title || 'Project', href: `/work/${doc.slug}`},
          {title: 'Work archive', href: '/work'},
        ] : [{title: 'Work archive', href: '/work'}],
      }),
    }),
  },
}
