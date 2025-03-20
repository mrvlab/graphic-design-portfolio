import {BookIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const studies = defineType({
  name: 'studies',
  title: 'Studies',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
      validation: (Rule) => Rule.required().error('Degree name is required.'),
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      degree: 'degree',
      institution: 'institution',
      startDate: 'startDate',
      endDate: 'endDate',
      updatedAt: '_updatedAt',
    },
    prepare({degree, institution, startDate, endDate, updatedAt}) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet'

      const formattedStart = new Date(startDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
      const formattedEnd = new Date(endDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })

      return {
        title: `${degree} ${institution} | ${formattedStart} – ${formattedEnd}` || 'Untitled',
        subtitle: `Last edited: ${formattedDate}`,
      }
    },
  },
})
