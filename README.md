# graphql-app

## How to setup
Set up workspace experimental to true
- `yarn config set workspaces-experimental true`

Install dependencies
- `yarn`

## How to add dependencies for root project
- `./wapp add global <dependency_name>` OR `yarn add -D <dependency_name> -W` or `yarn add <dependency_name> --ignore-workspace-root-check`

## How to add dependencies to particular project
- `./wapp add <package_name> <dependency_name>` OR `yarn workspace <package_name> add <dependency_name>`

## How to add dev dependencies to particular project
- `./wapp add-dev <package_name> <dependency_name>` OR `yarn workspace <package_name> add -D <dependency_name>`

## How to run particular project
- `./wapp dev <package_name> <dependency_name>` OR `yarn workspace <package_name> dev`

## How to run test particular project
- `./wapp test <package_name> --watch` OR `yarn workspace <package_name> test --watch`

## How to create new project on packages
- `yarn workspace react-app-scaffolder scaffold`

## Read on:

- [Getting Started](./docs/GETTING_STARTED.md)
- [Api Platform](./docs/API_PLATFORM.md)
- [Code Style](./docs/CODE_STYLE.md)
- [Version Control](./VERSION_CONTROL.md)
- [Definition of Done](./docs/DEFINITION_OF_DONE.md)
- [Deployment](./docs/DEPLOYMENT.md)
