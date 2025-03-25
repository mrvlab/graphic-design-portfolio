import { StackCompactIcon } from '@sanity/icons';
import { defineType, defineField } from 'sanity';

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
      richText: 'richText',
      updatedAt: '_updatedAt',
    },
    prepare({ richText, updatedAt }) {
      // Try to grab the first block's plain text
      const firstBlock = richText?.[0];
      const firstText =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        firstBlock?.children?.map((child: any) => child.text).join('') ||
        'Untitled';

      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet';

      return {
        title: firstText,
        subtitle: `Last edited: ${formattedDate}`,
      };
    },
  },
});
