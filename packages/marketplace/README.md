# App Store

[![Build Status](https://dev.azure.com/reapit/App%20Store/_apis/build/status/reapit.app-store?branchName=develop)](https://dev.azure.com/reapit/App%20Store/_build/latest?definitionId=12&branchName=develop)
[![Deployment Status](https://vsrm.dev.azure.com/reapit/_apis/public/Release/badge/ce5c2b72-fc0b-47b0-a94b-cc369120b059/2/2)](https://d3ps8i1lmu75tx.cloudfront.net/)

App store for Reapit PAAS platform. Initial scaffold from [React App Boilerplate](https://github.com/reapit/react-app)

## Read on:

- [Getting Started](./src/docs/GETTING_STARTED.md)
- [E2E testing](./src/docs/E2E_TESTING.md)
- [Api Platform](./src/docs/API_PLATFORM.md)
- [Code Style](./src/docs/CODE_STYLE.md)
- [Version Control](./VERSION_CONTROL.md)
- [Definition of Done](./src/docs/DEFINITION_OF_DONE.md)
- [Deployment](./src/docs/DEPLOYMENT.md)

## How to use with @reapit/elements in local dev environment
### Step 1: Change Dir to element repo.
`yarn link`
### Step 2: Change dir to app-store repo.
`yarn link @reapit/elements`