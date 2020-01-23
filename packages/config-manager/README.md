# Config Manager

Simple wrapper around AWS SDK for managing config objects in AWS Secrets Manager. Exports both CLI and Node versions and is distributed via an NPM Package.

## Pre-Requisits

You must have valid AWS IAM credentials in your current bash / zsh profile specifically, variables in the following format:

`export AWS_ACCESS_KEY_ID="<<SOME_ID_HERE>>"`

`export AWS_SECRET_ACCESS_KEY="<<SOME_KEY_HERE>>"`

## Installation

- `yarn install @reapit/config-manager --dev` if you are working in a JS project.
- `git clone git@github.com:reapit/config-manager.git && cd config-manager && yarn` If you want to modify / upload / delete / view secrets locally

## Methods

The project exports 5 methods; 4 to perfom CRUD operations and a 5th to set the specified secret to the local environment. All 5 methods accept a single string parameter `<<secretName>>` which maps to the named secret in AWS secrets manager. 

The name of the secret for Cloud app project config is `reapit-marketplace-app-config`

- `getSecret` Fetches a secret by name and outputs to a local JSON file called `reapit.config.json` at the root of your project. **BE SURE TO ADD THIS TO YOUR LOCAL .gitignore**. You can see an example of the output file at  `reapit.config.example.json`
- `createSecret` Stores a new secret by name, with the value of the secret string set to whatever is in the `reapit.config.json` at the root of your project.
- `updateSecret` Updates a secret by name, with the value of the secret string set to whatever is in the `reapit.config.json` at the root of your project. Suggest very strongly that you should use `getSecret` first then only update the values you need to change.
- `deleteSecret` Deletes a secret by name - it is stored for a default of 7 days should you ever need to recover it before being hard deleted.
- `setEnv` Works like `getSecret` but rather than storing to JSON, writes the values of to your `proces.env` object.

## Usage with Node / JS

Assuming you have installed the package, you can simply require and call the methods in the normal way eg

```js
const getSecret = require('@reapit/config-manager').getSecret

//

const mySecret = getSecret('my-cool-secret-name')

// >> reapit.config.json

```
The async requests are intentionally blocking to make it easier to work on the command line with them so if you are using them in your code, consider wrapping in a promise.

## Usage on the CLI

The script `config-manager` is available in the bin dir if you have used yarn to install. You can call this with the name of the method as your first arg and secret name as the second eg:

`yarn config-manager getSecret reapit-marketplace-app-config`

If you are working locally, you can just call the CLI script in the same way eg

`./cli.js getSecret reapit-marketplace-app-config`