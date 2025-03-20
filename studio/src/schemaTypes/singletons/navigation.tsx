import {ArrowTopRightIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: ArrowTopRightIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'Title for navigation',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      updatedAt: '_updatedAt', // Selects the last updated timestamp
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
