import { StackCompactIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const softwareTools = defineType({
  name: 'softwareTools',
  title: 'Software Tools',
  type: 'document',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'richText',
      title: 'Rich Text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required().error('Text is required.'),
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
