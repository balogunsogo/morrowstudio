import {VisualEditing} from 'next-sanity/visual-editing'
import DisableDraftMode from './DisableDraftMode'
import PreviewRefresh from './PreviewRefresh'

export default function PreviewTools() {
  return <><VisualEditing /><DisableDraftMode /><PreviewRefresh /></>
}
