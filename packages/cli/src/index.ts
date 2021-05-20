#!/usr/bin/env node

import chalk from 'chalk'
import 'reflect-metadata'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { AbstractCommand } from './abstract.command'
import { ConfigCommand } from './config'
import { COMMAND_OPTIONS } from './decorators'
import { IntroCommand } from './intro'

const boot = async (defaultCommand: AbstractCommand, commands: AbstractCommand[]) => {
  const {_: params, options} = yargs(hideBin(process.argv)).argv

  if (params.length === 0) {
    defaultCommand.run(params, options);
    return;
  }

  const command = commands.find(command => {
    const commandConfig = Reflect.getOwnMetadata(COMMAND_OPTIONS, command.constructor);

    return commandConfig && !commandConfig.default && commandConfig.name === params[0];
  });

  if (!command) {
    console.log(chalk.red('Command not found'))
  }
  else command.run(params, options)
}

boot(
  new IntroCommand(),
  [
    new ConfigCommand(),
  ],
)
