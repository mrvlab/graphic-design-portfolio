import { DoubleChevronUpIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: DoubleChevronUpIcon,
  // No group is marked default, so the Studio opens on its "All fields" tab.
  groups: [
    { name: 'text', title: 'Text' },
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
          type: 'object',
          name: 'navigationItem',
          title: 'Menu item',
          fields: [
            defineField({
              name: 'name',
              title: 'Label',
              description: 'Text shown in the menu.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              description:
                'Path this item links to, without the leading slash — for example "about".',
              type: 'slug',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'slug.current' },
            prepare: ({ title, subtitle }) => ({
              title: title || 'Untitled',
              subtitle: subtitle ? `/${subtitle}` : 'No slug',
            }),
          },
        }),
      ],
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
