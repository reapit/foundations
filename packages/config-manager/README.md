# Config Manager

A thin wrapper around AWS Systems Mananger, Parameter Store for keeping remote config secure. For usage visit [here](https://foundations-documentation.reapit.cloud/app-development#config-manager).

The package is intended to act as a convenient CLI tool for updating remote configuration in AWS and for use in a CI environment for pulling configuration into build processes.

## For use with `aws sso`
Ensure the `AWS_PROFILE` env var is set before you run your command, for instance:
```bash 
AWS_PROFILE=paas-dev yarn conf
```

## Pre-Requisites:

You should have an AWS Access Key Id and AWS Secret Access Key in your bash / shell profile. For instructions on this [visit here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html).

## Usage:

For basic usage, with NodeJS installed, run `npm install -g @reapit/config-manager`.

You will need to create a source file for your parameter if creating or updating. The default source file is `config.json` in your current working directory however, it is likely you will want to provide a custom source file. See below `--file-path` flag for more information.

Then with either yarn run `yarn config-manager` or with NPM run `npx config-manager`.

This will load a CLI that will walk you through the process of config management.

For CI usage, you will need to pass flags and values to the Yarn or NPM task as below:

`--mode` Either `create`, `update`, `delete` or `fetch`. Each mode will select the corresponding CRUD method in Parameter Store.

`--namespace` The base key of your parameter - e.g. name of team or owner. Will be PascalCased by the lib.

`--entity` The next level key of your parameter - e.g. application, service name, db-name. Will be PascalCased by the lib.

`--name` Optional next level key of your parameter - e.g. enviroment name or a specific variable name.

`--file-path` A relative or absolute path to your source file if you are updating or creating a parameter. If you are fetching a parameter, this is desired target file for the returned resource. Defaults to `./config.json` for JSON format and `./config.txt` for strings (see format below) however, it can be any filetype that can be parsed by Node / CommonJS as a string.

`--format` Either `string` or `json`, defaults to `json`. Parameter store considers any value to be a string but if you provide an object or JSON as your source file, we will `JSON.stringify` it before saving. If fetching, we will `JSON.parse` the returned value before writing to target file.

## Examples

A sample query to fetch a parameter in the format of `/Cloud/DeveloperPortal/Production` writing to a custom JSON file would look like `yarn config-manger --mode fetch --namespace cloud --entity developerPortal --name production --file-path ./custom.json --format json`

You can also override values by adding additional flags, useful if you want to pass in a different filename or variable name based on a CI enviroment. To do this, just add an additional named flag and the library will apply the last value specified eg `yarn config-manger --mode fetch --namespace cloud --entity marketplace --name production --name local` will return a parameter in the format `/Cloud/Marketplace/Local`