import { TranslateIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: TranslateIcon,
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO Settings',
      options: { collapsible: true, collapsed: true },
    },
  ],
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
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Displayed on social cards and search engine results.',
      fieldset: 'seo',
      fields: [
        defineField({
          name: 'title',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
        }),
        defineField({
          name: 'image',
          title: 'Social Share Image',
          type: 'image',
          options: { hotspot: true, metadata: ['lqip'] },
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
