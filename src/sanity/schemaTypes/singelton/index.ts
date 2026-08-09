import { header } from './header';
import { footer } from './footer';
import { settings } from './settings';

/**
 * Order here is the order shown in the Studio sidebar.
 *
 * Export statement order cannot drive it: `import * as` produces a module
 * namespace object whose keys are always sorted alphabetically, so
 * `Object.values()` would yield footer, header, settings regardless.
 */
export const singletons = [header, footer, settings];

export { header, footer, settings };
