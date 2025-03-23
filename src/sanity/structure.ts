import { CogIcon } from '@sanity/icons';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';

// Schema imports
import * as pages from './schemaTypes/pages';
import * as documents from './schemaTypes/documents';

const DISABLED_TYPES = ['settings'];

// Map of types by category
const pageSchemas = Object.values(pages);
const documentSchemas = Object.values(documents);

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Portfolio')
    .items([
      // Pages group
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items(
              pageSchemas.map((schema) =>
                S.documentTypeListItem(schema.name).title(
                  schema.title || schema.name
                )
              )
            )
        ),

      S.divider(),

      // Documents group
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items(
              documentSchemas
                .filter((schema) => !DISABLED_TYPES.includes(schema.name))
                .map((schema) =>
                  S.documentTypeListItem(schema.name).title(
                    schema.title || schema.name
                  )
                )
            )
        ),

      S.divider(),

      // Singleton: Site Settings
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ]);
