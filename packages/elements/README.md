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

- NOTED: THIS PROCESS WON'T BUMP THE PACKAGE VERSION AUTOMATICALLY FOR YOU

- When a PR is created, checks will run to make sure testcases have been passed, code have passes linter standard. If one of checks fail, the PR won't able to be merged, and require the sumbmitter to update his/her code again.
- Create a PR to merge develop. When the PR merged to develop, there will be a tag published that have a version based on version field on package.json file. If there were a tag that has the same tag name created, the old tag would be overridden by the new tag. Install them on other by edit package.json as `@reapit/elements:git+ssh:git@github.com:reapit/elements.git#{tag}`. eg `@reapit/elements: "git+ssh:git@github.com:reapit/elements.git#v0.5.4-beta"`, or commandline: `yarn add @reapit/elements@git+ssh:git@github.com:reapit/elements.git#v0.5.4-beta`
- To release a stable version of npm package, create a PR to merge master. When the PR was merged, npm package will be published to npm , a new release will be created automatically, and storybook assets will be deployed to GH-pages.

### To use the project

- You will need an NPM token to install the package - this should be added to the `.npmrc` file.
- `yarn add @reapit/elements`to your project - you can then import the modules with your chosen module system.
- You will need to globally install / add the CSS file from `@reapit/elements/dist/index.css`.

### Storybook

- All React components should have their own Storybook stories in their own folder using the `component.stories.tsx` convention.
- You should add as many variants of your component as is helpful for future devs - these are our live docs.
- All future component work for generic components should be "Storybook" first if possible.
- To run a local Storybook instance with a dev server run `yarn storybook`.
- To build and publish to Github Pages at https://reapit.github.io/elements/ run `yarn deploy-storybook` - this happens by default in a postpublish hook when you deploy to NPM.
