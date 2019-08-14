# Reapit Elements

A collection of React components and utilities for building apps for Reapit Marketplace

## Contributing

### Typescript modules

- All modules are added to the src folder.
- React components should live in their own folder within the components folder and be PascalCased.
- Utilities should live in their own folder within the utilities folder and be kebab-cased.
- All components and utils should export from an `index.ts(x)` at the root of their folder.
- All components should be properly tested and contain their tests within their folder, following the `__tests__` convention.
- All modules should export their own type definitions.
- `index.tsx` at the root of `src` is the entry point for the app. All modules should be exported from here eg `export * from './components/Input'`

### Styles

- All components should use vanilla (S)CSS classes (no modules) - refactor where necessary.
- Styles live in the styles folder in all cases. 
- Styles export from `index.scss` at the root of the styles project, ensure any new files are `@import`ed here.

### Building and Publishing

- You will need an npm token to publish the package - this should be added to the `.npmrc` file.
- Publishing should always be from the master branch, when a Pull Request has been approved.
- You should follow standard convention semantic releasing.
- To publish run `npm publish`. This will;
  - Run the tests.
  - Build and minify the JavaScript dist files from the TypeScript into adm, esm and cjs versions.
  - Build and purify the Sass with rollup.
  - Export to dist folder
  - Publish to NPM
  - Tag the release (you need to manually push tags with `git push --tags`).
- You should publish a release on github from the generated tag.

### To use the project

- You will need an NPM token to install the package - this should be added to the `.npmrc` file.
- `yarn add @reapit/elements`to your project - you can then import the modules with your chosen module system.
- You will need to globally install / add the CSS file from `@reapit/elements/dist/index.css`.
