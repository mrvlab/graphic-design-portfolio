import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
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
