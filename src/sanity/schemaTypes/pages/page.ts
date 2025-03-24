import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Name is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Sub heading',
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
    // defineField({
    //   name: 'pageBuilder',
    //   title: 'Page builder',
    //   type: 'array',
    //   of: [{type: 'callToAction'}, {type: 'infoSection'}],
    //   options: {
    //     insertMenu: {
    //       // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
    //       views: [
    //         {
    //           name: 'grid',
    //           previewImageUrl: (schemaTypeName) =>
    //             `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
    //         },
    //       ],
    //     },
    //   },
    // }),
  ],
  preview: {
    select: {
      title: 'name',
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
        title: title || 'Page',
        subtitle: `Last edited: ${formattedDate}`,
      };
    },
  },
});
