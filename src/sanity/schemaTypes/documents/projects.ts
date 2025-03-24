import { defineType, defineField } from 'sanity';
import { DocumentsIcon, DocumentIcon } from '@sanity/icons';

export const projects = defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
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
      name: 'year',
      title: 'Year',
      type: 'date',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'mediaGallery' }],
      validation: (Rule) =>
        Rule.max(2).error('You can only add up to 2 images.'),
    }),
    defineField({
      name: 'comingSoon',
      title: 'Project Coming Soon',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      updatedAt: '_updatedAt',
      mediaGallery: 'imageList.0.mediaItems.0.image',
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
