import { BlockquoteIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const publications = defineType({
  name: 'publications',
  title: 'Publications',
  type: 'document',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('title name is required.'),
    }),
    defineField({
      title: 'Link',
      name: 'href',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      updatedAt: '_updatedAt',
    },
    prepare({ title, updatedAt }) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet';

      return {
        title: title || 'Untitled',
        subtitle: `Last edited: ${formattedDate}`,
      };
    },
  },
});
