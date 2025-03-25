import { TranslateIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'languages',
      title: 'Languages',
      description: 'Select languages in the desired order',
      type: 'array',
      of: [
        defineField({
          name: 'language',
          title: 'Language',
          type: 'reference',
          to: [{ type: 'languages' }],
        }),
      ],
    }),
    defineField({
      name: 'experiences',
      title: 'Experiences',
      description: 'Select experiences in the desired order',
      type: 'array',
      of: [
        defineField({
          name: 'experience',
          title: 'Experience',
          type: 'reference',
          to: [{ type: 'experiences' }],
        }),
      ],
    }),
    defineField({
      name: 'studies',
      title: 'Studies',
      description: 'Select studies in the desired order',
      type: 'array',
      of: [
        defineField({
          name: 'studie',
          title: 'Studie',
          type: 'reference',
          to: [{ type: 'studies' }],
        }),
      ],
    }),
    defineField({
      name: 'publications',
      title: 'Publications',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'publications' }],
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'mediaGallery' }],
    }),
    defineField({
      name: 'bodyTextSections',
      title: 'Body Text Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'richTextSection',
          title: 'Rich Text Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
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
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'skills',
      title: 'Skills',
      description: 'Select skills in the desired order',
      type: 'array',
      of: [
        defineField({
          name: 'skill',
          title: 'Skill',
          type: 'reference',
          to: [{ type: 'skills' }],
        }),
      ],
    }),
    defineField({
      name: 'softwareTools',
      title: 'Software Tools',
      description: 'Select software tools in the desired order',
      type: 'array',
      of: [
        defineField({
          name: 'softwareTool',
          title: 'Software Tool',
          type: 'reference',
          to: [{ type: 'softwareTools' }],
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
        title: title || 'About Page',
        subtitle: `Last edited: ${formattedDate}`,
        media: TranslateIcon,
      };
    },
  },
});
