import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

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
      name: 'richText',
      title: 'Rich Text',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
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
      title: 'richText',
    },
  },
})
