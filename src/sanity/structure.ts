import type {StructureResolver} from 'sanity/structure'
import {HomeIcon, InfoOutlineIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .icon(HomeIcon)
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Home')
        ),

      S.listItem()
        .title('About')
        .icon(InfoOutlineIcon)
        .id('about')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
            .title('About')
        ),

      S.documentTypeListItem('project')
        .title('Projects')
        .child(S.documentTypeList('project').title('Projects').defaultOrdering([{field:'orderRank',direction:'asc'}])),
    ])
