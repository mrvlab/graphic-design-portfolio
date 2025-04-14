import { StackCompactIcon } from '@sanity/icons';
import { defineType, defineField } from 'sanity';

export const softwareTools = defineType({
  name: 'softwareTools',
  title: 'Software Tools',
  type: 'document',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required().error('Category is required.'),
    }),
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
      category: 'category',
      updatedAt: '_updatedAt',
    },
    prepare({ title, category, updatedAt }) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet';

      return {
        title: title || 'Untitled',
        subtitle: `${category} • Last edited: ${formattedDate}`,
      };
    },
  },
});
