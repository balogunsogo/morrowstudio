/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({
  api: {projectId, dataset},
  project: {basePath: '/'},
  deployment: {appId: 'jx92edwt8m3z7yjbo3928zw4', autoUpdates: false},
  schemaExtraction: {enabled: true, path: 'migration/reports/studio-schema.json'},
  vite: config => ({
    ...config,
    // These three settings are public identifiers, never API credentials.
    // Next normally injects them; standalone Vite needs the same explicit values.
    define: {
      ...config.define,
      'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
      'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
      'process.env.NEXT_PUBLIC_SANITY_API_VERSION': JSON.stringify(process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-10-04'),
    },
  }),
})
