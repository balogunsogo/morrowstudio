import type {SanityImageObject} from '@sanity/image-url'
import {stegaClean} from 'next-sanity'
import {childField, dataAttribute, type EditingField} from '@/sanity/lib/dataAttribute'
import {dataset, projectId} from '@/sanity/env'
import {urlFor} from '@/sanity/lib/image'
import SanityImage, {isSanityImage} from '../SanityImage'
import type {VideoFile} from '../types'

export type SanityVideoFile = VideoFile

export function isSanityVideoFile(value: unknown): value is SanityVideoFile {
  if (!value || typeof value !== 'object' || !('asset' in value)) return false
  const asset = value.asset
  return !!asset && typeof asset === 'object' && (
    ('_ref' in asset && typeof asset._ref === 'string') ||
    ('url' in asset && typeof asset.url === 'string')
  )
}

function httpUrl(value?: string): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(stegaClean(value))
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : undefined
  } catch {
    return undefined
  }
}

function fileUrl(file?: SanityVideoFile): string | undefined {
  if (!isSanityVideoFile(file)) return undefined
  const url = httpUrl(file.asset.url)
  if (url) return url
  const match = file.asset._ref?.match(/^file-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)$/)
  return match
    ? `https://cdn.sanity.io/files/${projectId}/${dataset}/${match[1]}.${match[2]}`
    : undefined
}

type VideoBlockProps = {
  sourceType?: 'file' | 'url' | 'unresolved'
  title?: string
  duration?: string
  videoFile?: SanityVideoFile
  videoUrl?: string
  poster?: SanityImageObject
  caption?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  editing?: EditingField
}

export default function VideoBlock({
  sourceType, videoFile, videoUrl, poster, caption, title, duration,
  autoplay = false, loop = false, muted = false, editing,
}: VideoBlockProps) {
  const src = sourceType === 'file' ? fileUrl(videoFile) : sourceType === 'url' ? httpUrl(videoUrl) : undefined
  if (!src) return isSanityImage(poster) ? (
    <figure className="project-video project-block" data-media-state="unresolved">
      <div className="project-video-preview">
        <SanityImage image={poster} alt="" editing={childField(editing, 'poster')} aspectRatio={16 / 9} />
        <div className="project-video-status"><span>{title || 'Film preview'}</span>{duration && <span>{duration}</span>}</div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  ) : null

  // URL fields also accept watch pages; only recognizable media URLs use video.
  const playable = sourceType === 'file' || /\.(mp4|webm|ogv|ogg|m4v)$/i.test(new URL(src).pathname)
  const media = playable ? (
    <video
      src={src}
      poster={isSanityImage(poster) ? urlFor(poster).width(1920).height(1080).fit('crop').auto('format').url() : undefined}
      controls
      aria-label={stegaClean(title) || 'Project film'}
      playsInline
      preload="metadata"
      autoPlay={autoplay && muted}
      loop={loop}
      muted={muted}
    />
  ) : <a href={src}>{title ? <>Watch {title}</> : 'Watch video'}</a>

  return (
    <figure className="project-video project-block" data-media-state="resolved" data-sanity={dataAttribute(childField(editing, sourceType === 'file' ? 'videoFile' : 'videoUrl'))}>
      {media}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
