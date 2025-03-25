import { DoubleChevronUpIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: DoubleChevronUpIcon,
  fields: [
    defineField({
      name: 'lefttext',
      description: 'Left text for header',
      title: 'Left Text',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Name for header',
      type: 'string',
    }),
    defineField({
      name: 'workTitle',
      title: 'Work Title',
      description: 'Title for work section',
      type: 'string',
    }),
    defineField({
      name: 'projectCloseText',
      description: 'Text for closing project',
      title: 'Project Close Text',
      type: 'string',
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
