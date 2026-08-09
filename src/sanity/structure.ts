import type { StructureBuilder, StructureResolver } from 'sanity/structure';

// Schema imports
import * as pages from './schemaTypes/pages';
import * as documents from './schemaTypes/documents';
import * as singelton from './schemaTypes/singelton';

const pageSchemas = Object.values(pages);
const documentSchemas = Object.values(documents);

// Object.values on a module namespace is alphabetical, so the singleton order
// is listed explicitly instead.
const singletonSchemas = [singelton.header, singelton.footer, singelton.settings];

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Portfolio')
    .items([
      // Pages
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              ...pageSchemas.map((schema) =>
                S.listItem()
                  .title(schema.title || schema.name)
                  .child(
                    S.document().schemaType(schema.name).documentId(schema.name)
                  )
                  .icon(schema.icon || undefined)
              ),
            ])
        ),

      S.divider(),

      // Content
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items(
              documentSchemas.map((schema) =>
                S.documentTypeListItem(schema.name).title(
                  schema.title || schema.name
                )
              )
            )
        ),

      S.divider(),

      // Global singletons
      ...singletonSchemas.map((schema) =>
        S.listItem()
          .title(schema.title || schema.name)
          .child(S.document().schemaType(schema.name).documentId(schema.name))
          .icon(schema.icon || undefined)
      ),
    ]);
