import { defineField, defineType } from 'sanity';
import { DocumentsIcon } from '@sanity/icons';

export const projectsIndex = defineType({
  name: 'projectsIndex',
  title: 'Projects Index',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'projects',
      title: 'Projects',
      description: 'Select the projects to display on the index page.',
      type: 'array',
      of: [
        defineField({
          name: 'project',
          title: 'Project',
          type: 'reference',
          to: [{ type: 'projects' }],
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
        title: title || 'Projects Index',
        subtitle: `Last edited: ${formattedDate}`,
        media: mediaGallery || DocumentsIcon,
      };
    },
  },
});
