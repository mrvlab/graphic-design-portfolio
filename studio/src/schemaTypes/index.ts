// Import object and document schemas
import * as blocks from './objects'
import * as documents from './documents'
import * as singletons from './singletons'

// Converting them into arrays
const allBlocks = Object.values(blocks)
const allDocuments = Object.values(documents)
const allSingletons = Object.values(singletons)

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  ...allSingletons,
  // Documents
  ...allDocuments,
  // Objects
  ...allBlocks,
]
