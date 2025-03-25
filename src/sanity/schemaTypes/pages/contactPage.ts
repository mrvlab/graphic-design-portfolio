import { TranslateIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'richText',
      title: 'Rich Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
          ],
        },
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
        title: title || 'Contact Page',
        subtitle: `Last edited: ${formattedDate}`,
        media: TranslateIcon,
      };
    },
  },
});
