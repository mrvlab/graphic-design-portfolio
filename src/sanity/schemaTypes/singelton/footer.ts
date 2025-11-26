import { DoubleChevronDownIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { timezoneOptions } from '@/utils/timezones';

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: DoubleChevronDownIcon,
  fields: [
    defineField({
      name: 'lefttext',
      description: 'Left text for header',
      title: 'Left Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' }, // Only paragraph
          ],
          lists: [], // Disable bullet/numbered lists
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'rights',
      title: 'Rights',
      type: 'string',
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      description:
        'Select your timezone - this will determine both the city and time display',
      type: 'string',
      options: {
        list: timezoneOptions.map((tz) => ({
          title: tz.title,
          value: tz.value,
        })),
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'location',
      title: 'Location (Optional Override)',
      description:
        "Override the city name if you want to display something different than what's in the timezone",
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
        title: title || 'Footer',
        subtitle: `Last edited: ${formattedDate}`,
        media: DoubleChevronDownIcon,
      };
    },
  },
});
