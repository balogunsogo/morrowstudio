import {defineField, defineType} from 'sanity'
import {visibilityField} from '../shared/fields'
import {hasImage, record, validateDuration, validateVideo} from '../shared/validation'
import {PlayIcon} from '@sanity/icons'
import {collapsed, organizeFields} from '../shared/editorial'
import {blockPreview} from '../shared/previews'
import {PendingVideoInput} from '../../components/StudioGuidance'

export const videoBlockType = defineType({
  name: 'videoBlock',
  title: 'Video',
  type: 'object',
  icon: PlayIcon,
  components: {input: PendingVideoInput},
  fieldsets: [{name: 'playback', title: 'Playback settings', options: collapsed, hidden: ({parent}) => parent?.sourceType === 'unresolved'}],

  fields: organizeFields([
    visibilityField,
    defineField({name: 'title', title: 'Film / trailer title', type: 'string',
      validation: rule => rule.custom((value, context) => hasImage(record(context.parent).poster) &&
        !(typeof value === 'string' && value.trim()) ? 'Add a film title for this poster.' : true).warning(),
    }),
    defineField({name: 'duration', title: 'Duration', type: 'string', description: 'MM:SS or H:MM:SS.',
      validation: rule => [rule.custom(validateDuration), rule.custom((value, context) =>
        hasImage(record(context.parent).poster) && !value ? 'Add the film duration when it is known.' : true).warning()],
    }),
    defineField({
      name: 'sourceType',
      title: 'Video source',
      description:'Keep Poster only while the film is pending. When ready, choose a source and add the file or link below. Clear any old source before switching between file and link.',
      type: 'string',
      initialValue: 'file',
      options: {
        list: [
          {title: 'Uploaded video', value: 'file'},
          {title: 'Website link', value: 'url'},
          {title: 'Poster only — video source pending', value: 'unresolved'},
        ],
        layout: 'radio',
      },
      validation: rule => [rule.required().custom(value => value === undefined ||
        ['file', 'url', 'unresolved'].includes(value) || 'Choose Uploaded video, Website link or Poster only.'),
        rule.custom(value => value !== 'unresolved' || 'Video source still needed. The poster will display until a video file or URL is added.').warning()],
    }),

    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({parent}) => parent?.sourceType !== 'file',
    }),

    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({parent}) => parent?.sourceType !== 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),

    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'muted',
      title: 'Muted',
      type: 'boolean',
      initialValue: true,
    }),
  ], [{name: 'title', title: 'Film title'}, {name: 'duration', description: 'Film length, for example 01:24 or 1:02:30.'}, {name: 'poster', title: 'Poster image', description: 'Shown before playback, or on its own while the video source is pending.'}, {name: 'caption'}, {name: 'sourceType'}, {name: 'videoFile', title: 'Video file'}, {name: 'videoUrl', title: 'Video link'}, {name: 'autoplay', fieldset: 'playback', title: 'Play automatically'}, {name: 'loop', fieldset: 'playback', title: 'Repeat playback'}, {name: 'muted', fieldset: 'playback', title: 'Mute sound'}, {name: 'visibility'}]),
  validation: rule => rule.custom(validateVideo),
  preview: {select: {title: 'title', duration: 'duration', sourceType: 'sourceType', media: 'poster', visibility: 'visibility'}, prepare: value => blockPreview('videoBlock', value)},
})
