import {TiersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const experiences = defineType({
  name: 'experiences',
  title: 'Experiences',
  type: 'document',
  icon: TiersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title name is required.'),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      updatedAt: '_updatedAt',
    },
    prepare({title, updatedAt}) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet'

      return {
        title: title || 'Untitled',
        subtitle: `Last edited: ${formattedDate}`,
      }
    },
  },
})
