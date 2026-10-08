import fs from 'node:fs'
import {renderToStaticMarkup} from 'react-dom/server'
import {PathnameContext} from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import {compile} from 'sass'
import HomePage from '@/components/home/HomePage'
import type {Homepage} from '@/components/home/types'

const projects = ['first', 'second', 'third'].map(slug => ({_id: slug, title: slug, year: 2026, slug: {current: slug}}))
const outside = {_id: 'outside', title: 'Outside', year: 2026, slug: {current: 'outside'}}
const home: Homepage = {heroTitle: 'Morrow Studio', projectIndex: projects}
const fixtures = {
  reordered: {...home, mobileProjectIndex: [projects[2], projects[0]]},
  subset: {...home, mobileProjectIndex: [projects[1]]},
  outside: {...home, mobileProjectIndex: [outside]},
  absent: home,
  empty: {...home, mobileProjectIndex: []},
}
const output = '.tmp/awwwards/phase-2/fixtures'
fs.mkdirSync(output, {recursive: true})
const css = compile('src/components/home/Home.module.scss').css
for (const [name, value] of Object.entries(fixtures)) {
  const body = renderToStaticMarkup(<PathnameContext.Provider value="/"><HomePage home={value} /></PathnameContext.Provider>)
  fs.writeFileSync(`${output}/${name}.html`, `<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Arial}a{color:inherit}${css}</style></head><body>${body}</body></html>`)
}
console.log('Five local mobile-order fixtures generated using the real Home Sass. No network request.')
