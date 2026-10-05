// Isolated browser fixture: actual production inputs and Sanity form-value
// context, with a memory-only adapter in place of the authenticated Studio form.
import {useState} from 'react'
import {createRoot} from 'react-dom/client'
import {ThemeProvider, studioTheme} from '@sanity/ui'
import {FormValueProvider, PatchEvent, type FormDocumentValue, type Path} from 'sanity'
import {CreditMobileOrderInput, CreditOverrideTargetInput, GalleryMobileOrderInput, MobileSectionOrderInput} from '../src/sanity/components/MobileKeyInputs'
import {arrayProps, stringProps} from './studio-keyed-adapter'
import source from '../migration/data/source-mapping.json'
import {schema} from '../src/sanity/schemaTypes'
import {PendingVideoInput, StudioDocumentInput} from '../src/sanity/components/StudioGuidance'
import {blockPreview} from '../src/sanity/schemaTypes/shared/previews'
import {portableTextPreview} from '../src/sanity/components/keyedOptions'
import type {InputProps, ObjectInputProps} from 'sanity'

type Row = {_key: string; _type: string; images?: Row[]; items?: Row[]; mobileImageKeys?: string[]; mobileCreditKeys?: string[]}
type Document = FormDocumentValue & {title: string; content: Row[]; mobileOrder?: string[]}
const projects = [...source.filter(p => ['Aster House', 'Forma', 'Meridian'].includes(p.title!)), ...source.filter(p => p._type !== 'project').map(p => ({...p, title: p._type === 'homepage' ? 'Home' : 'About'}))] as unknown as Document[]

function Fixture() {
  const [index, setIndex] = useState(0)
  const [document, setDocument] = useState<Document>(() => structuredClone(projects[0]))
  const [readOnly, setReadOnly] = useState(false)
  const [target, setTarget] = useState<string>()
  const [group, setGroup] = useState<string>()
  function fieldProps(value: string[] | undefined, path: Path, update: (next: string[] | undefined) => void) {
    return {...arrayProps(value, update, readOnly), path}
  }
  function updateBlock(key: string, field: 'mobileImageKeys' | 'mobileCreditKeys', next: string[] | undefined) {
    setDocument(current => ({...current, content: current.content.map(block => block._key === key ? {...block, [field]: next} : block)}))
  }
  const content = document.content ?? []
  const credit = content.find(b => b._type === 'creditsBlock')
  const overrideProps = stringProps(target ?? credit?.items?.[0]._key, event => {
    for (const patch of PatchEvent.from(event).patches) if (patch.type === 'set') setTarget(patch.value as string)
  }, readOnly)
  overrideProps.path = ['content', {_key: credit?._key ?? ''}, 'mobileOverrides', {_key: 'fixture-only'}, 'creditKey']
  const definition = schema.types.find(type => type.name === document._type)!
  const groups = 'groups' in definition ? definition.groups ?? [] : []
  const activeGroup = group ?? groups.find(item => item.default)?.name
  const fields = ('fields' in definition ? definition.fields : []) ?? []
  const guidanceProps = {schemaType: {name: document._type}, value: document, renderDefault: () => null} as unknown as InputProps
  return <ThemeProvider theme={studioTheme}>
    <main style={{maxWidth: 960, margin: '24px auto', fontFamily: 'sans-serif', color: '#202020'}}>
      <h1>Studio inputs — local verification</h1>
      <p>Actual custom selectors; memory-only array adapter. No CMS connection.</p>
      <label>Project <select aria-label="Project" value={index} onChange={event => {
        const next = Number(event.currentTarget.value); setIndex(next); setDocument(structuredClone(projects[next])); setTarget(undefined); setGroup(undefined)
      }}>{projects.map((project, i) => <option key={project._id} value={i}>{project.title}</option>)}</select></label>
      <label style={{marginLeft: 24}}><input type="checkbox" checked={readOnly} onChange={event => setReadOnly(event.currentTarget.checked)} />Read only</label>
      <button onClick={() => setDocument(current => ({...current, mobileOrder: [...(current.mobileOrder ?? []), 'fixture-stale-key']}))}>Inject stale selection</button>
      <FormValueProvider value={document}>
        <StudioDocumentInput {...guidanceProps} renderDefault={() => <section data-field="document-groups">
          <h2>{document.title} — Field groups</h2>
          <p>Read-only schema inspection; live Studio provides native tabs and forms.</p>
          <div>{groups.map(item => <button key={item.name} aria-pressed={activeGroup === item.name} onClick={() => setGroup(item.name)}>{item.title}</button>)}</div>
          <dl>{fields.filter(field => field.group === activeGroup).map(field => <div key={field.name}>
            <dt>{field.title ?? field.name}</dt><dd>{typeof field.description === 'string' ? field.description : ''}</dd>
          </div>)}</dl>
          {document._type === 'about' && <p>{portableTextPreview(document.bio)}</p>}
        </section>} />
        {document._type === 'project' && <>
        <section data-field="sections"><h2>{document.title} — Mobile sections</h2>
          <MobileSectionOrderInput {...fieldProps(document.mobileOrder, ['mobileOrder'], next => setDocument(current => ({...current, mobileOrder: next})))} />
        </section>
        {content.filter(b => b._type === 'gallery' || b._type === 'creditsBlock').map(block => {
          const gallery = block._type === 'gallery'
          const field = gallery ? 'mobileImageKeys' : 'mobileCreditKeys'
          const props = fieldProps(block[field], ['content', {_key: block._key}, field], next => updateBlock(block._key, field, next))
          return <section data-field={gallery ? 'gallery' : 'credits'} key={block._key}><h2>{gallery ? 'Gallery images' : 'Credit rows'}</h2>
            {gallery ? <GalleryMobileOrderInput {...props} /> : <CreditMobileOrderInput {...props} />}
          </section>
        })}
        <section data-field="override"><h2>Credit override target</h2><CreditOverrideTargetInput {...overrideProps} /></section>
        <section data-field="block-previews"><h2>Case study previews</h2><ul>{content.map(block => {
          const preview = blockPreview(block._type, block)
          return <li key={block._key}>{preview.title} · {preview.subtitle}</li>
        })}</ul></section>
        {content.filter(block => block._type === 'videoBlock').map(block => <section key={block._key} data-field="video">
          <h2>Film editor guidance</h2>
          <PendingVideoInput {...({value: block, renderDefault: () => <p>Poster only — video source pending</p>} as unknown as ObjectInputProps)} />
        </section>)}
        </>}
      </FormValueProvider>
      <script type="application/json" id="fixture-state">{JSON.stringify({document, target: target ?? credit?.items?.[0]._key})}</script>
    </main>
  </ThemeProvider>
}

createRoot(document.getElementById('root')!).render(<Fixture />)
