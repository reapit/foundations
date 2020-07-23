# CRA external template

A scaffolder for external users made with [Create-React-App](https://create-react-app.dev/)

## Local development guide

- scaffolder the package using `npx create-react-app {app name} --template file:{path to cra-external template folder}`
  E.g.: `npx create-react-app demo --template file:/Users/phmngocnghia/Desktop/graphql-app/packages/cra-external-template`

- link package `@reapit/connect-session` using `yarn link` in `connect-session` folder, and `yarn link @reapit/connect-session` in generated folder (At the time writting this, @reapit/connect-session haven't been published)

- remove package `react` in generator folder using `yarn remove react`, and link `react` package in "foundation" folder: `yarn link` in `node_modules/react`, and `yarn link react` in generated folder (foundation, and our generated react package is not the same and will lead to https://reactjs.org/warnings/invalid-hook-call-warning.html, because we have 2 copy of react module. One in "foundation", one in generated folder)

## How to use
- Step 1: install the packages `npm install -g @reapit/cra-template-external`
- scaffold the project by run the command `npx create-react-app my-app --template @reapit/cra-template-external`
