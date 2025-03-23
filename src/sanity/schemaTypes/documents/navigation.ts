import { ArrowTopRightIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: ArrowTopRightIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'name for navigation',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      updatedAt: '_updatedAt', // Selects the last updated timestamp
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
