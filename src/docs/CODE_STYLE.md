# Code Style

The vast majority of base code style is enforced by [TSLint](https://palantir.github.io/tslint/), with sensible community presets from [StandardJS](https://standardjs.com/) and [Prettier](https://prettier.io/). The linter runs in a pre-commit hook on staged files with an auto-fix flag set to address any trivial issues. TS Lint also runs in a parallel process with the TS Compiler so you will get constant feedback in the terminal on linting issues.

In addition to the lint rules, please also where possible, stick to the contribution guidelines below. These rules should be kept in mind when reviewing Pull Requests.

## Contribution Guidelines

- Code should be functional in style rather than Object Orientated or Imperitive unless there are no clean alternatives.
  - Use pure functions where possible to make them testable and modular.
  - Avoid mutating varibles and the `let` keyword.
  - React Components should be stateless functional components where possible.
  - Avoid classes and stateful modules where possible.
  - Avoid React lifecyle hooks.
  - Keep all state in Redux and business logic as pure functions of Redux State.
  - The above rules can be relaxed for test scripts.

- React components should be templates, free of logic. This is because we aim to re-use code in the future in React Native Applications so by keeping the React layer as purely presentational.
  - Presentational logic helpers should live in a utils file in the same folder as your component so they can be re-used agnostic of the template.

- Use Redux connect for nested components for better performance and reduced re-rendering over `prop drilling`. Use `React.memo` for the same reason and selectors if appropriate.
 
- Typesafe everything! Use `any` and `unknown` types only when there is no alternative - try to avoid `implicit any` - types should be documentation as code for the project. We can relax this as a convenience in test scripts.
  - Where possible use auto generated types from Swagger documentation or GraphQL defintions to ensure shared contracts with front and back end. These auto-generated types live in the main types folder.

- Syled Components are used for styling in all cases where a third party library (eg Bootstrap) is not used.
  - Styled Components should be kept out of the main components folder - they should live in the main styles folder. This is so we can easily abstract the styles into a styleguide the future, using a tool like Storybook or Bit. It also helps with reducing duplication.
  - The styles project should make extensive use of variables and mixins for things like colors, layouts, font sizes, line heights and so on. This ensures re-usablility and maintainability.
  - Where possible, use `rems` over `px` as a unit for layout.

- Maintain the separation of concerns in the folder structure laid out in the initial scaffold seen in the [React App Boilerplate](https://github.com/reapit/react-app) eg, reducers should all be in the reducers folder, global types in the types folder and so on. There are many React projects in the company and they should all follow a broadly familiar structure and architecture.

- Make extensive use of the constants files for significant strings and other re-usable constant variables used in the app.

- When adding third party libraries to the project consider carefully the following;
  - Is this a trivial package we can easily write in house? If so, take the time to roll your own.
  - Is this library well supported, under active development and widely used in the community? If not, do not use.
  - Do we use a similar but different library for the same task elsewhere in the company? If so, use this library for developer familiarity and consistency.
  - Will this library impact significantly performance or bundle size eg Lodash or Moment? If so, consider carefully if it is necessary or if there is a better alternative.

- We have two kinds of tests; Unit tests with Jest and e2e tests with Cypress. For all new features an approprate level of test coverage is an implicit part of the feature definition. 
  - For unit tests, the expectation is;
    - All functions / methods, especially utilities have i.o. tests, with internal conditional logic and edge cases tested.
    - All React templates have at least a snapshot, and any calls to action are tested to call their handlers with correct params.
    - Redux actions, reducers and sagas have test coverage for all cases.
    - Styled components do not require tests unless necessary, likewise constants and build scripts.
    - Tests should live in the same folder as their source in a `__tests__` folder. 
    - Mocks and stubs should also follow the same `__mocks__` & `__stubs__` pattern.
  - For e2e tests, the expectation is;
    - Happy path user journeys are all tested through the app.
    - Calls to action are all tested, verifying an appropriate change in the state of the application is observed.
    - The page object model for selectors and methods is used to ensure re-usability.
    - The tests should not be excessive or flaky to ensure they do not block dev workflow.

- File naming should be `kebab-case` for `.js(x), .ts(x), .css` files, and indeed all files where possible. No use of capitals to avoid issues where Unix systems do not respect casing when a file name is changed. 

- Exports from files can be either as variable or default exports, but please stick to naming the object before using `export default` to avoid anonomous module names in stack traces and React dev tools.

## Read on:

- [Home](../../README.md)
- [Getting Started](./GETTING_STARTED.md)
- [Api Platform](./API_PLATFORM.md)
- [Version Control](./VERSION_CONTROL.md)
- [Definition of Done](./DEFINITION_OF_DONE.md)
- [Deployment](./DEPLOYMENT.md)
