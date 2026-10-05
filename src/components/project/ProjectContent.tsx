import {stegaClean} from 'next-sanity'
import TextBlock from './blocks/TextBlock'
import LargeStatement from './blocks/LargeStatement'
import FullWidthImage from './blocks/FullWidthImage'
import ContainedImage from './blocks/ContainedImage'
import ImagePair from './blocks/ImagePair'
import ImageWithText from './blocks/ImageWithText'
import Gallery from './blocks/Gallery'
import QuoteBlock from './blocks/QuoteBlock'
import CreditsBlock from './blocks/CreditsBlock'
import VideoBlock from './blocks/VideoBlock'
import {isSanityImage} from './SanityImage'
import {contentForViewport, creditsForViewport, galleryForViewport, imageUseForViewport, needsResponsiveContent, pairForViewport, type Viewport} from './contract'
import type {ContentBlock} from './types'
export type {ContentBlock} from './types'

type Props = {content?: ContentBlock[]; mobileOrder?: string[]; documentId?: string}

export default function ProjectContent({content, mobileOrder, documentId}: Props) {
  if (!content?.length) return null
  function render(viewport: Viewport) {
    let textCount = 0
    return contentForViewport(content ?? [], viewport, mobileOrder).map(block => {
      const editing = documentId ? {id: documentId, path: 'content[_key==' + JSON.stringify(block._key) + ']'} : undefined
      const mobile = viewport === 'mobile'
      let element
      switch (block._type) {
        case 'textBlock': {
          const body = mobile ? block.mobile?.body ?? block.body : block.body
          const fallback = textCount++ === 0 ? 'Overview' : 'Approach'
          element = body?.length ? <TextBlock body={body} label={block.label ?? fallback} /> : null
          break
        }
        case 'fullWidthImage':
        case 'containedImage': {
          const use = imageUseForViewport(block, block.mobile, viewport)
          const imagePath = mobile && block.mobile?.image ? 'mobile.image' : 'image'
          const props = {...use, editing, imagePath}
          element = block._type === 'fullWidthImage'
            ? <FullWidthImage {...props} />
            : <ContainedImage {...props} size={stegaClean(block.size) ?? undefined} alignment={stegaClean(block.alignment) ?? undefined} />
          break
        }
        case 'imagePair':
          element = <ImagePair {...pairForViewport(block, viewport)} editing={editing} />
          break
        case 'largeStatement':
          element = <LargeStatement body={block.body} text={block.text} alignment={stegaClean(block.alignment) ?? undefined} />
          break
        case 'imageWithText': {
          const use = imageUseForViewport(block, block.mobile, viewport)
          const body = mobile ? block.mobile?.body ?? block.body : block.body
          element = <ImageWithText {...use} body={body ?? []} label={block.label ?? undefined}
            layout={stegaClean(block.layout) ?? undefined} editing={editing}
            imagePath={mobile && block.mobile?.image ? 'mobile.image' : 'image'} />
          break
        }
        case 'gallery': {
          const images = (block.images ?? []).filter(isSanityImage)
          element = <Gallery images={galleryForViewport(images, viewport, block.mobileImageKeys)} layout={stegaClean(block.layout) ?? undefined} editing={editing} />
          break
        }
        case 'quoteBlock': {
          const override = mobile ? block.mobile : undefined
          const quote = override?.quote ?? block.quote
          element = quote ? <QuoteBlock quote={quote} author={override?.author ?? block.author}
            role={override?.role ?? block.role} alignment={stegaClean(block.alignment) ?? undefined} /> : null
          break
        }
        case 'creditsBlock':
          element = <CreditsBlock title={block.title} items={creditsForViewport(block, viewport)} />
          break
        case 'videoBlock':
          element = <VideoBlock {...block} sourceType={stegaClean(block.sourceType)} editing={editing} />
          break
        default:
          return null
      }
      return element ? <div className="project-content-entry" data-content-key={block._key} key={block._key}>{element}</div> : null
    })
  }
  if (!needsResponsiveContent(content, mobileOrder)) return render('desktop')
  // CSS switches complete SSR branches at the existing 760px breakpoint. Hidden
  // branches leave the accessibility tree; resizing never needs hydration state.
  return <>
    <div className="project-desktop-only" data-content-viewport="desktop">{render('desktop')}</div>
    <div className="project-mobile-only" data-content-viewport="mobile">{render('mobile')}</div>
  </>
}
