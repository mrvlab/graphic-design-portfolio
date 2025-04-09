import { defineType, defineField } from 'sanity';
import { BlockElementIcon } from '@sanity/icons';

export const section = defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  icon: BlockElementIcon,
  fieldsets: [
    {
      name: 'text',
      title: 'Text',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'richText',
      title: 'Rich Text Top',
      type: 'array',
      description: 'Leave empty if you want to add images only.',
      fieldset: 'text',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
        },
      ],
    }),
    defineField({
      name: 'richTextBottom',
      title: 'Rich Text Bottom',
      type: 'array',
      description: 'Leave empty if you want to add images only.',
      fieldset: 'text',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
        },
      ],
    }),
    defineField({
      name: 'mediaGallery',
      title: 'Media Gallery',
      type: 'mediaGallery',
    }),
    defineField({
      name: 'sectionBgColor',
      title: 'Section Background Color',
      type: 'string',
      description: 'Must be in hex format',
      placeholder: '#000000',
    }),
  ],
  preview: {
    select: {
      title: 'richText.0.children.0.text',
      mediaGallery: 'mediaGallery.mediaItems.0.asset ',
    },
    prepare({ title, mediaGallery }) {
      return {
        title: title || 'Section',
        media: mediaGallery || BlockElementIcon,
      };
    },
  },
});
