import { CogIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'This field is the title of your blog.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        'Used for the <meta> description tag for SEO and the blog subheader.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                    description:
                      'Supports http(s), mailto, tel, or relative links.',
                    validation: (Rule) => Rule.required(),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO.',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const hasImage = !!(context.document?.ogImage as any)?.asset
                ?._ref;
              if (hasImage && !alt) {
                return 'Alternative text is required when an image is uploaded.';
              }
              return true;
            }),
        }),
        defineField({
          name: 'metadataBase',
          title: 'Metadata Base URL',
          type: 'url',
          description:
            'Used with Next.js generateMetadata(). Example: https://yourdomain.com',
        }),
      ],
    }),
    defineField({
      name: 'enterSiteText',
      title: 'Enter Site Text',
      description: 'Text displayed on the enter site button.',
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
        title: title || 'Untitled',
        subtitle: `Last edited: ${formattedDate}`,
      };
    },
  },
});
