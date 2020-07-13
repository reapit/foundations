# Reapit React App Scaffolder

A CLI for generating React Apps, optimised for the marketplace, including Reapit Connect authentication and Elements. For usage visit [here](https://foundations-documentation.reapit.cloud/api/web#react-app-scaffolder).

- **Tech Stack**: Yeoman, React, Redux, Jest, React, Router, Linaria
- **Cloud Services**: NPM
- **Production**: https://www.npmjs.com/package/@reapit/generator-react-redux-app

For detailed documentation [visit here](https://foundations-documentation.reapit.cloud/open-source/packages#react-app-scaffolder).

For internal scaffolds, navigate to project folder and execute `yarn scaffold` to load the CLI.

For external users first;

`npm install -g yo @reapit/generator-react-app-scaffolder`

Then

`yo @reapit/react-app-scaffolder` to load the CLI.

For internal maintainers, to build an app locally, navigate to one of the external options within the templates folder, `yarn` and `yarn start:dev` to develop the scaffold.

For internal apps, scaffold a local app and copy your changes back to the main directory.