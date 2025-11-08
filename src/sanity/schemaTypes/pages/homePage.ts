import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO Settings',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'enterSiteText',
      title: 'Enter Site Text',
      type: 'string',
      description: 'Text displayed on the entrance overlay button.',
      initialValue: 'Enter Site',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      description: 'Select up to 12 projects to display on the home page.',
      type: 'array',
      of: [
        defineField({
          name: 'project',
          title: 'Project',
          type: 'reference',
          to: [{ type: 'projects' }],
        }),
      ],
      validation: (Rule) =>
        Rule.max(12).error('You can only select up to 12 projects.'),
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
      mediaGallery: 'imageList.0.mediaItems.0.image',
      updatedAt: '_updatedAt',
    },
    prepare({ title, mediaGallery, updatedAt }) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet';

      return {
        title: title || 'Home Page',
        subtitle: `Last edited: ${formattedDate}`,
        media: mediaGallery || DocumentIcon,
      };
    },
  },
});
