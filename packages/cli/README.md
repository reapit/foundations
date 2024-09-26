# Reapit-cli
Command line interface tool for reapit 

![Deployment gif](https://raw.githubusercontent.com/reapit/foundations/master/packages/cli/reapit-deploy.gif)

## Available commands

Use `reapit --help` to see all commands in the terminal.
Or use `reapit config --help` to describe an individual command.

Command | description
--- | ---
`reapit auth login` | Start the process of logging in with your Reapit SSO account
`reapit auh logout` | Clears your logged in session
`reapit config` | Starts a prompt to configure Reapit cli
`reapit pipeline create` | Starts the process of creating a new pipeline
`reapit pipeline edit` | Used to edit a given pipeline
`reapit pipeline delete` | Deletes a given pipeline
`reapit pipeline link` | Links repo with existing pipeline (downloads pipeline config to cwd)
`reapit pipeline list` | List all pipelines for developer account
`reapit release repo` | Starts a deployment using the github repo
`reapit release zip` | Starts a deployment using a locally built directory as source
`reapit release list` | List all pipeline releases/deployments
`reapit release version` | Deploys a specific previously deployed version (rollback)
`reapit pipeline params` | List all environment param keys configured for pipeline
`reapit pipeline param-configure` | Create or update a new or existing environment parameter

> The above is subject to updates

## Install

Installing requires the below steps

- [Obtain npm token](#obtaining-npm-token)
- [Create `.npmrc` file](#create-the-npmrc-file)
- [Installing the cli](#installing-the-cli)
- [Log in with Reapit](#login)


### Obtaining NPM Token

Ask the reapit developers for an NPM token

### Create the `.npmrc` file

In your computer's root, create the file `.npmrc`, here is a method using bash

```bash
touch ~/.npmrc
```
Without a global `.npmrc` file with your provided token, you will not be able to download the cli

Below is the following that needs to be added to the `.npmrc` file. Make sure to replace `NPM_TOKEN` with your npm token.

```
//registry.npmjs.org/:_authToken=NPM_TOKEN
```

### Installing the cli

Simply run the below command to install the reapit cli globally on your machine.

```bash
$ npm i -g @reapit/cli
```

### Login

In order to be authenticated with the cli you can run the `login` command like below.

```bash
$ reapit auth login
```

You can also logout using

```bash
$ reapit auth logout
```

## Terminology

Below is a table of terminologies used in the cli with some descriptions

Term | Description
--- | ---
Pipeline | A configuration for a deployment process
Pipeline Runner, Deployment | A running/individual deployment of a pipeline
Release | almost synonymous with deployment, can be used to describe a method of triggering a deployment
Rollback | The ability to make a previously deployed version live

## Deployment

> First make sure you've created a pipeline by either the UI or the cli using `reapit pipeline create`.

Start the deployment by running the following command

This will start a manual deployment by uploading a zip of your locally built application.

```bash
$ reapit pipeline deploy-zip
```

answer the following questions and the deployment will start.

![Deploy zip Snapsot](https://raw.githubusercontent.com/reapit/foundations/master/packages/cli/snapshots/deploy-zip.png)

## Deployment via github actions

First install the cli as a dev dependant

```bash
$ yarn add --dev @reapit/cli
```

Once you've done that, add the following to the file `.github/workflows/deply.yml`

This will run a deployment every time you make a push to master

```yml
name: Deploy with Reapit cli

on:
  push:
    branches:
      - master

env:
  NPM_TOKEN: ${{secrets.NPM_TOKEN}}
  REAPIT_API_KEY: ${{secrets.REAPIT_API_KEY}}
  PIPELINE_ID: ${{secrets.PIPELINE_ID}}

  CI: true

jobs:
  deploy-with-reapit-cli:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Set Node
        uses: actions/setup-node@v1
        with:
          node-version: '14.x'

      - name: Install
        run: yarn
        env:
          NPM_TOKEN: ${{secrets.NPM_TOKEN}}

      - name: Build
        run: |
          yarn build

      - name: Deploy
        run: |
          echo $PIPELINE_ID &&
          yarn reapit pipeline deploy-zip $PIPELINE_ID -y
        env:
          PIPELINE_ID: ${{secrets.PIPELINE_ID}}
      - name: Commit & Push changes
        uses: actions-js/push@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branch: 'master'

```

> Note: you'll notice there is a commit & push action here. This is important to keep the version up to date with deployments. Otherwise deployments will fail after the first successful one.

# Development

This section is for the development of the reapit cli

## Creating commands

Commands are written in an OOP method and are bootstraped with the `AbstractCommand` class which provides some helpful functions for creating commands

```ts
@Command({
  name: "example", // reapit example
  description: "An example command on how to build a reapit cli command", // for the help option
})
export class ExampleCommand extends AbstractCommand {
  run(
    @Param({
      name: 'param', // name for help
      default: 'default value',
    })
    param: string,
  ) {
    console.log(param) // inputted arg or 'default value'
  }
}
```

> All commands must use the `Command` decorator so that the command can be found to be ran

### Add new command

When adding a command to the cli, it will need to be added to the runnable commands array in the bootstrap func which lives in the `index.ts` file

```ts
boot(new IntroCommand(), [new ConfigCommand(), new DeploymentCommand(), /* add new command here*/])
```

### Parent commands

Parent commands are grouped commands for running as sub commands. Below is an example of a sub command

```bash
$ reapit pipeline create
```

where `pipeline` is the command group and `create` is the sub command.

Parent commands will extends the `ParentCommand` class

```ts
@Command({
  name: 'pipeline',
  description: 'For managing deployments',
})
export class PipelineCommand extends ParentCommand {
  commands = [new PipelineCreate(), new PipelineList(), new PipelineRun()]
}
```

### Params and Options

In the run function, `Param` and `Option` decorators can be used to description incomming arguments and options.

#### Param

```ts
@Command({
  name: 'example',
})
class ExampleCommand extends AbstractCommand {
async run(
    @Param({
      name: 'param', // name for help
      default: 'default value',
    })
    param: string,
  ) {
    console.log(param) // inputted arg or 'default value'
  }
}
```

Params in the run function should be ordered in the same order as expected input args. Example `reapit example first second third`

```ts
@Command({
  name: 'example',
})
class ExampleCommand extends AbstractCommand {
async run(
    @Param({
      name: 'uno',
    })
    uno: string,
    @Param({
      name: 'due',
    })
    due: string,
    @Param({
      name: 'tre',
    })
    tre: string,
  ) {
    console.log('order', uno, due, tre) // order first second third
  }
}
```

#### Options

Options are similar to params but used as booleans. Example `reapit example this-is-the-id -f` and `reapit example --fetch this-is-the-id` will result in the `fetch` parameter being true. If these options are not supplied, `fetch` is false.

```ts
@Command({
  name: 'example',
})
class ExampleCommand extends AbstractCommand {
async run(
    @Param({
      name: 'id',
    })
    id: string,
    @Option({
      name: 'fetch',
      shortName: 'f',
    })
    fetch: boolean,
  ) {
    console.log('fetch?', fetch) // fetch? true
  }
}
```
