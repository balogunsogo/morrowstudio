// Run the installed CLI using the existing local environment. Only public
// Studio settings are sent into the browser build; normal CLI auth is retained.
import {spawn} from 'node:child_process'
import {fileURLToPath} from 'node:url'

const argumentsForCli = process.argv.slice(2)
if (!['build', 'schema', 'schemas', 'deploy'].includes(argumentsForCli[0])) throw new Error('Use the Studio build, schema or deployment command.')
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) throw new Error('Set the public Sanity project ID and dataset in .env.local before building the Studio.')
const child = spawn(process.execPath, [fileURLToPath(new URL('../node_modules/sanity/bin/sanity', import.meta.url)), ...argumentsForCli], {
  stdio: 'inherit',
  env: {...process.env, SANITY_STUDIO_BASE_PATH: '/', SANITY_STUDIO_PREVIEW_URL: process.env.SANITY_STUDIO_PREVIEW_URL || 'https://morrowstudio.balogunoluwasogo.com'},
  windowsHide: true,
})
child.on('error', error => {console.error(error.message); process.exitCode = 1})
child.on('exit', (code, signal) => {process.exitCode = code ?? (signal ? 1 : 0)})
