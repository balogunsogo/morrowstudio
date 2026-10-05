'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {resolve} from './src/sanity/presentation/resolve'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import {MorrowMark, StudioDocumentInput} from './src/sanity/components/StudioGuidance'

export default defineConfig({
  title: 'Morrow Studio',
  icon: MorrowMark,
  basePath: process.env.SANITY_STUDIO_BASE_PATH || '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  form: {components: {input: StudioDocumentInput}},
  plugins: [
    structureTool({structure, title: 'Content'}),
    presentationTool({
      resolve,
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
