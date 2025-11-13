import { defineType, defineField } from 'sanity';
import { DocumentsIcon, DocumentIcon } from '@sanity/icons';

export const projects = defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  icon: DocumentsIcon,
  fieldsets: [
    {
      name: 'projectInit',
      title: 'Project Init',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'projectPage',
      title: 'Project Page',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // ----- Project Init -----
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'projectInit',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'comingSoon',
      title: 'Project Coming Soon',
      type: 'boolean',
      fieldset: 'projectInit',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Required for published projects. Leave empty if project is marked as "coming soon". This slug will be used in the project URL.',
      options: {
        source: 'title',
        maxLength: 100,
      },
      fieldset: 'projectInit',
    }),
    defineField({
      name: 'richText',
      title: 'Rich Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
        },
      ],
      fieldset: 'projectInit',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'date',
      fieldset: 'projectInit',
    }),
    defineField({
      name: 'mediaBackgroundColor',
      title: 'Media Background Color',
      type: 'color',
      fieldset: 'projectInit',
    }),
    defineField({
      name: 'mediaGallery',
      title: 'Media Gallery',
      type: 'mediaGallery',
      fieldset: 'projectInit',
    }),
    // ----- Project page -----
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      fieldset: 'projectPage',
      options: {
        list: [
          { title: 'First Layout', value: 'firstLayout' },
          { title: 'Second Layout', value: 'secondLayout' },
          { title: 'Third Layout', value: 'thirdLayout' },
        ],
      },
    }),
    defineField({
      name: 'sectionList',
      title: 'Section List',
      type: 'array',
      of: [{ type: 'section' }, { type: 'relatedProjects' }],
      fieldset: 'projectPage',
    }),
    // ----- SEO -----
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
      comingSoon: 'comingSoon',
      updatedAt: '_updatedAt',
      firstMediaGallery: 'mediaGallery.mediaItems.0.asset',
    },
    prepare({ title, firstMediaGallery, comingSoon, updatedAt }) {
      const formattedDate = updatedAt
        ? new Date(updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No edits yet';

      return {
        title: `${title || 'Home Page'} ${comingSoon ? '(Coming Soon)' : ''}`,
        subtitle: `Last edited: ${formattedDate}`,
        media: firstMediaGallery || DocumentIcon,
      };
    },
  },
});
