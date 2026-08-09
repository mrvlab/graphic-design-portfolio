import * as pages from './pages';
import * as blocks from './blocks';
import * as documents from './documents';
import * as partials from './partials';
import { singletons } from './singelton';

// Converting them into arrays
const allPages = Object.values(pages);
const allBlocks = Object.values(blocks);
const allDocuments = Object.values(documents);
const allPartials = Object.values(partials);
const allSingelton = singletons;

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schema = {
  types: [
    // Objects
    ...allPages,
    // Objects
    ...allBlocks,
    // Documents
    ...allDocuments,
    // Partials
    ...allPartials,
    // Partials
    ...allSingelton,
  ],
};
