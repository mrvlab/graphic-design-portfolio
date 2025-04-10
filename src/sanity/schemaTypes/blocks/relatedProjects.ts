import { defineType, defineField } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const relatedProjects = defineType({
  name: 'relatedProjects',
  title: 'Related Projects',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'projects',
      title: 'Projects',
      description: 'Select up to 4 projects to display on this section.',
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
      title: 'projects.0.title',
      mediaGallery: 'projects.0.mediaGallery.mediaItems.0.asset',
    },
    prepare({ mediaGallery }) {
      return {
        title: 'Related Projects',
        media: mediaGallery || DocumentIcon,
      };
    },
  },
});
