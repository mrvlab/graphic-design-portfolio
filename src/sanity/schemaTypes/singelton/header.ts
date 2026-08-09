import { DoubleChevronUpIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: DoubleChevronUpIcon,
  groups: [
    { name: 'text', title: 'Text', default: true },
    { name: 'navigation', title: 'Navigation' },
  ],
  fields: [
    defineField({
      name: 'lefttext',
      description: 'Left text for header',
      title: 'Left Text',
      type: 'string',
      group: 'text',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Name for header',
      type: 'string',
      group: 'text',
    }),
    defineField({
      name: 'workTitle',
      title: 'Work Title',
      description: 'Title for work section',
      type: 'string',
      group: 'text',
    }),
    defineField({
      name: 'projectCloseText',
      description: 'Text for closing project',
      title: 'Project Close Text',
      type: 'string',
      group: 'text',
    }),
    defineField({
      name: 'navigationItems',
      title: 'Menu items',
      description:
        'Drag to reorder. This order is used for the menu, the breadcrumbs and the site structure sent to search engines.',
      type: 'array',
      group: 'navigation',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'navigation' }],
        }),
      ],
      validation: (rule) => rule.unique(),
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
        title: title || 'Header',
        subtitle: `Last edited: ${formattedDate}`,
        media: DoubleChevronUpIcon,
      };
    },
  },
});
