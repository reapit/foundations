#!/usr/bin/env node

import chalk from 'chalk'
import 'reflect-metadata'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { AbstractCommand } from './abstract.command'
import { ConfigCommand } from './commands/config'
import { DeploymentList } from './commands/deployment/list'
import { COMMAND_OPTIONS } from './decorators'
import { IntroCommand } from './intro'

const boot = async (defaultCommand: AbstractCommand, commands: AbstractCommand[]) => {
  const { _: params, options } = yargs(hideBin(process.argv)).argv

  if (params.length === 0 && Object.keys(options as Array<any>).length === 0) {
    defaultCommand.run(params, options);
    return;
  } 
  // TODO figure out how to add help command stuffs
  // else if (params.length === 0 && options) {
  //   commands.forEach(command => {
  //     const config: CommandOptions = Reflect.getOwnMetadata(COMMAND_OPTIONS, command.constructor);

  //     console.log(
  //       `
  //         ${chalk.bold.white([config.parent, config.name].filter(sub => typeof sub !== 'undefined').join(' '))}
  //         ${chalk.white(config.description)}
  //       `,
  //     )
  //   })
  // }

  const command = commands.find(command => {
    const commandConfig = Reflect.getOwnMetadata(COMMAND_OPTIONS, command.constructor);

    return commandConfig && !commandConfig.default && commandConfig.name === params[0];
  });

  if (!command) {
    console.log(chalk.red('sub command not found'))
  }
  else command.run(params, options)
}

boot(
  new IntroCommand(),
  [
    new ConfigCommand(),
    new DeploymentList(),
  ],
)
