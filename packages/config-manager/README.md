# Config Manager

A thin wrapper around AWS Systems Mananger, Parameter Store for keeping remote config secure. For usage visit [here](https://foundations-documentation.reapit.cloud/app-development#config-manager).

The package is intended to act as a convenient CLI tool for updating remote configuration in AWS and for use in a CI environment for pulling configuration into build processes.

For basic usage, with NodeJS installed, run `npm install -g @reapit/config-manager`.

Then with either yarn run `yarn config-manager` or with NPM run `npx config-manager`.

This will load a CLI that will walk you through the process of config management.

For CI usage, you will need to pass flags and values to the Yarn or NPM task as below:

- `--mode` Either `create`, `update`, `delete` or `fetch`. Each mode will select the corresponding CRUD method in Parameter Store.
- `--namespace` The base key of your parameter - e.g. name of team or owner. Will be PascalCased by the lib.
- `--entity` The next level key of your parameter - e.g. application, service name, db-name. Will be PascalCased by the lib.
- `--name` Optional next level key of your parameter - e.g. enviroment name or a specific variable name.
- `--file-path` A relative or absolute path to your source file if you are updating or creating a parameter. If you are fetching a parameter, this is desired target file for the returned resource. Defaults to `./config.json` however, it can be any filetype that can be parsed by Node / CommonJS eg `.txt, .js, .ts`
- `--format` Either `string` or `json`, defaults to `json`. Parameter store considers any value to be a string but if you provide an object or JSON as your source file, we will `JSON.stringify` it before saving. If fetching, we will `JSON.parse` the returned value before writing to target file.
