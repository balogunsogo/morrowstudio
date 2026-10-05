import {type SchemaTypeDefinition} from 'sanity'
import {projectType} from './project'
import {fullWidthImageType} from './blocks/fullWidthImage'
import {textBlockType} from './blocks/textBlock'
import {imagePairType} from './blocks/imagePair'
import {containedImageType} from './blocks/containedImage'
import {largeStatementType} from './blocks/largeStatement'
import {imageWithTextType} from './blocks/imageWithText'
import {galleryType} from './blocks/gallery'
import {quoteBlockType} from './blocks/quoteBlock'
import {creditsBlockType} from './blocks/creditsBlock'
import {videoBlockType} from './blocks/videoBlock'
import {homepageType} from './homepage'
import {aboutType} from './about'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    projectType,
    homepageType,
    fullWidthImageType,
    textBlockType,
    imagePairType,
    containedImageType,
    largeStatementType,
    imageWithTextType,
    galleryType,
    quoteBlockType,
    creditsBlockType,
    videoBlockType,
    aboutType,
  ],
}