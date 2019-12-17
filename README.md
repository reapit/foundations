# graphql-app

## How to setup
Set up workspace experimental to true
- `yarn config set workspaces-experimental true`
Install dependencies
- `yarn`

## How to add dependencies for root project
- `yarn add -D <module_name> --ignore-workspace-root-check` or `yarn add <module_name> --ignore-workspace-root-check`

## How to add dependencies to particular project
- `yarn workspace <packages_name> install express`

## How to run particular project
- `yarn workspace <packages_name> dev`

## Read on:

- [Getting Started](./docs/GETTING_STARTED.md)
- [Api Platform](./docs/API_PLATFORM.md)
- [Code Style](./docs/CODE_STYLE.md)
- [Version Control](./VERSION_CONTROL.md)
- [Definition of Done](./docs/DEFINITION_OF_DONE.md)
- [Deployment](./docs/DEPLOYMENT.md)
