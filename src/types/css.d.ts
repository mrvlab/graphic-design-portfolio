// Next's own types only declare `*.module.css`, so plain side-effect imports
// such as `import './globals.css'` have no declaration. Editors running with
// noUncheckedSideEffectImports report those as TS2882/TS2307 without this.
// The more specific `*.module.css` declaration from next/types still wins.
declare module '*.css';
