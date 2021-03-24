# Reapit Elements

![lines](/packages/elements/src/tests/badges/badge-lines.svg) ![functions](/packages/elements/src/tests/badges/badge-functions.svg) ![branches](/packages/elements/src/tests/badges/badge-branches.svg) ![statements](/packages/elements/src/tests/badges/badge-statements.svg)

A UI toolkit for building web applications in the Reapit Marketplace. Exports a library of React Components, JavaScript and TypeScript utilities and a CSS Stylesheet.

## Documentation

For the React Component Storybook visit [here](https://elements.reapit.cloud).

For documentation and usage [visit here](https://foundations-documentation.reapit.cloud/app-development/elements).

## Roadmap

### Elements v1.x.x - Development So Far

Elements v1.x.x was developed quickly to launch the Foundations project and ground in terms of development. Our assumption was that the majority of our Reapit Foundations developers would use our starter tooling (CRA Template, Connect Session, Elements) to build apps in JavaScript / TypeScript and React.

As the project matured, we realised that whilst we had number of React apps in the Marketplace, over half of our developers were just using elements CSS classes and applying them to server side rendered templates, or to SPAs in other frameworks.

Furthermore, because of our desire to encourage rapid development, a number of React Libraries were included in Elements which lead to third party CSS classes that were hard to implement for non-React users, lack of developer flexibility, over dependency on external APIs and bloat.

With these points in mind, we have responded to both internal and external developer feedback to compile a list of problems we will resolve in future releases.

- The Bulma CSS library that helped us develop quickly makes it hard to change things; we have to override too many styles, too much dependency on a third party API and CSS bloat from unused classes.
- Elements has too much dependency on third party packages to do simple things. This gives a poor experience for non-React users and for our React users, adds blot and lacks flexibility.
- Rapid development has lead to inconsistent naming conventions and API for components / component props.
- Lack of variablisation means we can't change styles globally or support theming.
- React API not fully documented by Storybook meaning options / variants / props for components and styles are not clear to external developers.
- Limited support for non-react users - we need to ensure the stylesheet solution is as usable for non-React developers as the React components are for React Users.
- Utilities mixed in with React components - both a poor separation of concens and insufficient documentation for the utilities.
- Styleguide felt a bit tired and generic - because we ask that all Marketplace Apps use our UI for visual consistency, we need to ensure the styles are the best showcase of our development partner's work.

### Elements v2.x.x - Long Term Support

Whilst Elements v1.x.x has it's limitations, we are very mindful our developers have already successfully built a number of applications with the library and as such, require both a Long Term Support schedule and a straightforward upgrade path where possible.

As such, we decided that for our next major release v2.x.x, we would address only the final item on the above list.

Elements v2.x.x is a UI theme refresh, giving the styleguide a lift to ensure better visual consistency and appeal. The release includes a new font, typography, color pallet, form inputs, notifications and dialogue boxes. Essentially in line with the changes you will see in the Reapit Developer Portal and Marketplace from March 2021 to April 2021.

Whilst we can't guarantee that you will have no work to do uprgrading v1 to v2, we have taken care not to add any breaking changes to the TypeScript / React Components and generated CSS classes in the Elements Stylesheet. Upgrading should be a case of incremeting the version number from v1.x.x to v2.x.x, running an NPM install and making any small visual tweaks required to your application.

Whilst no future development in terms of features will be added to v2, we will endevour to provide long term support and security patches for the foreseeable future and when the time comes to deprecate the version, several months runway to upgrade before LTS ends.

### Elements v3.x.x - Coming Soon

Elements v3 is a full re-write of the library that will be the basis of Elements UI lib for the foreseeable future. It will address the structural problems with the v1 and v2 lib mentioned above, give a far better developer experience and have a more lighweight apporach.

Our product designer has been working on a full design language to accompany Elements v3 which we will roll out in the coming months. This will be published publicly along with suggested UX flows, sample layouts and guidance on how to take Elements and create a great user experience for any Marketplace App.

The working specifcation for Elements v3 is detailed below:

- Elements v3 components will be supported as part of Elements v2 and exported from the `@reapit/elements/v3` folder so that users can incrementally upgrade from v2 to v3 and use v2 and v3 components in the same app. v3 components will be documented sepatately in Storybook during the v3 development process.
- The progress of the v3 build can be monitored against [this milestone](https://github.com/reapit/foundations/milestone/8) and we welcome any feature requests through the Github issues page. 
- CSS will all be writting in-house so we have full control and flexibility over the styles and can provide sensible, predictable semantic classes to use in your code.
- NPM packages to be kept to an absolute bare minimum - where possible we will always use a native browser HTML behaviour to reduce bloat and for better flexibility and accessiblility.
- There should be far fewer components - there should be a single and obvious solution to all common UI patterns.
- As with v1 and v2, components to be strongly typed and heavily unit tested.
- Code that can be migrated or repurposed from v1 should be however, every component should be viewed critically, improved, upgraded, tidied and made consistent.
- Styles will be written in [Linaria CSS library](https://github.com/callstack/linaria). This gives us the benefits of CSS in JS for our developers but because Linaria has zero runtime, it is extremely lightweight and the styles will be extracted at compile time and bundled as a stylesheet to be imported as required.
- Our components will use the `linaria/react` `styled.tag` syntax familiar to React Developers in Styled Components and other libraries. Standlone utility classes to be toggled will be generated using the Linaria `css` helper. Classes will be composed using the Linaria `cx` helper.
- All classes will be prefixed with `el` to ensure we do not clash with third party libs or with v2 components on the same page eg `elIsFlex` in Linaria generates the class `el-is-flex`.
- Props should be consistent, boolean and imperative modifiers to allow for clean markup. These booleans should map to classes that can then be toggled with any JavaScript implementation - sample examples below:

```ts
isActive // maps to .el-is-active
isFlex // maps to .el-is-flex
hasTextCentered // maps to .el-has-text-centered
isPrimary // maps to .el-is-primary
isDanger // maps to .el-is-danger
isFullWidth // maps to .el-is-full-width
hasChildren // maps to .el-has-children
hasPadding // maps to .el-has-padding
isLoading // maps to .el-is-loading
shouldRender // maps to .el-should-render
```
- Components should where possible, render children and support `...rest` props so developers can add their own JS, pass their own props, classNames, ids etc, and use elements components purely as styled wrappers eg:
```tsx
export const GenericElementsComponent: React.FC = ({ children, className, ...rest }) => (
  <div className={cx(elStyledCssClass, className)} {...rest}>{children}</div>
)
```
- The pattern above will apply also to more complex JS patterns like forms, modals, date pickers. Components will  allow passing of callbacks via props to trigger actions onChange, onBlur, onClick, onSubmit and the available interfaces will be fully documented.
- The package should export a library of generic helper classes, that can be used and composed over writing new CSS. These helpers will be fully documented in Storybook.
- Colors, margins, borders, fonts, padding, font-sizes and anything that can be vairablized should be. We will expose a theming API to allow small global UI tweaks at runtime based on CSS variables.
- The docs should support Storybook Controls and will output an HTML only version of the rendered component markup in the code for non-React users. 
- Markdown files for every component will explain usage and the use cases for each component - inline written documentation as well as strongly typed interfaces to be published.
- The package will be guaranteed and tested to work in Edge (latest version before Chromium), Edge Chromium, Firefox, Chrome, Safari.
- Elements is a UI only library. Utilities and other modules will be migrated to a new `@reapit/utils` package that will be documented and released as a separate NPM package.
