import {defineType, defineField} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

export const projects = defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),

    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'mediaGallery'}],
      validation: (Rule) => Rule.max(2).error('You can only add up to 2 images.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      updatedAt: '_updatedAt',
      mediaGallery: 'imageList.0.mediaItems.0.image',
    },
    prepare({title, mediaGallery, updatedAt}) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet'

      return {
        title: title || 'Home Page',
        subtitle: `Last edited: ${formattedDate}`,
        media: mediaGallery || DocumentsIcon,
      }
    },
  },
})
