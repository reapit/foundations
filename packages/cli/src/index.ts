#!/usr/bin/env node

import chalk from 'chalk'
import 'reflect-metadata'
import argv from 'process.argv'
import { AbstractCommand } from './abstract.command'
import { ConfigCommand } from './commands/config'
import { COMMAND_OPTIONS } from './decorators'
import { IntroCommand } from './intro'
import { HelpCommand } from './commands/help'
import { ParentCommand } from './parent.command'
import { PipelineCommand } from './commands/pipeline'
import { resolveArgs } from './utils/resolveArgs'
import { ReactStarterCommand } from './commands/react-starter'
import { DeployCommand } from './commands/deploy'
import { CheckVersionCommand } from './commands/check-version'

const checkVersion = async () => {
  const checkVersion = new CheckVersionCommand()

  await checkVersion.run()
}

const boot = async (defaultCommand: AbstractCommand, commands: (AbstractCommand | ParentCommand)[]) => {
  const processArgv = argv(process.argv.slice(2))
  const commandsArgs = processArgv({})

  const params = commandsArgs['--']
  const options = commandsArgs

  if (!params && Object.keys(options).length === 0) {
    defaultCommand.run(params, options)
    await checkVersion()
    return
  } else if (!params || (params.length === 0 && options)) {
    defaultCommand.run(params, options)
    await checkVersion()
    const helpCommand = new HelpCommand()
    helpCommand.setCommands(commands)
    helpCommand.run()
    return
  }

  await checkVersion()

  const command = commands.find((command) => {
    const commandConfig = Reflect.getOwnMetadata(COMMAND_OPTIONS, command.constructor)

    return commandConfig && !commandConfig.default && commandConfig.name === params[0]
  })

  if (!command) {
    console.log(chalk.red('sub command not found'))
  } else {
    if (command instanceof ParentCommand && command.isChildRunnable(params)) {
      command.runChild(params)
      return
    }
    params.shift()
    const args = resolveArgs(params, command.argOptions)
    command.run(...args)
  }
}

boot(new IntroCommand(), [new ConfigCommand(), new PipelineCommand(), new ReactStarterCommand(), new DeployCommand()])
