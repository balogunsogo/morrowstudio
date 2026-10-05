// Local, static renderer examples. This does not contact Sanity or create an app route.
import {writeFileSync, mkdirSync} from 'node:fs'
import {renderToStaticMarkup} from 'react-dom/server'
import {compile} from 'sass'
import {JSDOM} from 'jsdom'
import {imageConfigDefault} from 'next/dist/shared/lib/image-config'
import nextConfig from '../next.config'
import ProjectContent from '@/components/project/ProjectContent'
import ProjectHero from '@/components/project/ProjectHero'
import ProjectMetadata from '@/components/project/ProjectMetadata'
import {contractFixture} from '../migration/fixtures/contract'
import type {Project} from '@/components/project/types'
import legacy from '../migration/fixtures/legacy-aster.json'

imageConfigDefault.remotePatterns = nextConfig.images?.remotePatterns ?? []
const css = compile('src/styles/globals.scss').css
const assets = '/morrow-export-master/morrow-export-3-assets-source/morrow-studio-export/assets/'
const font = `@font-face{font-family:Geist;src:url('${assets}fonts/Geist-Regular.woff2')}body{margin:0;--font-geist-sans:Geist;--font-geist-mono:monospace}`
const previews = [contractFixture, legacy as unknown as Project]
mkdirSync('migration/fixtures', {recursive: true})
for (const project of previews) {
  const document = new JSDOM(renderToStaticMarkup(<main className="morrow-project">
    <h1>{project.title}</h1><ProjectMetadata project={project} /><ProjectHero project={project} />
    <ProjectContent content={project.content} mobileOrder={project.mobileOrder} documentId={project._id} />
  </main>)).window.document
  // Preview the renderer with local reference JPEGs, never fake uploaded assets.
  document.querySelectorAll('source').forEach(source => source.remove())
  document.querySelectorAll('img').forEach((img, index) => {
    img.removeAttribute('srcset'); img.removeAttribute('loading')
    img.src = `${assets}images/${index % 2 ? 'aster-door.jpg' : 'aster.jpg'}`
  })
  document.querySelectorAll('link[rel="preload"]').forEach(link => link.remove())
  const file = project._id === contractFixture._id ? 'contract-preview.html' : 'legacy-aster-preview.html'
  writeFileSync(`migration/fixtures/${file}`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${project.title} — local fixture</title><style>${font}${css}</style></head><body>${document.body.innerHTML}</body></html>`)
}
console.log('Created two local HTML fixtures with local reference images. No remote requests.')
