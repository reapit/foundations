#!/usr/bin/env node

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
import { ReleaseCommand } from './commands/release'
// TODO upcomment with @reapit/cli has been published
// import { CheckVersionCommand } from './commands/check-version'

const checkVersion = async () => {
  // TODO upcomment with @reapit/cli has been published
  // const checkVersion = new CheckVersionCommand()
  // await checkVersion.run()
}

const boot = async (defaultCommand: AbstractCommand, commands: (AbstractCommand | ParentCommand)[]) => {
  const processArgv = argv(process.argv.slice(2))
  const commandsArgs = processArgv<any>({})

  const params = commandsArgs['--']
  const options = commandsArgs
  const helpCommand = new HelpCommand()
  helpCommand.setCommands(commands)

  if (!params && Object.keys(options).length === 0) {
    defaultCommand.run(params, options)
    await checkVersion()
    helpCommand.run()
    return
  } else if (!params || (params.length === 0 && options)) {
    defaultCommand.run(params, options)
    await checkVersion()
    helpCommand.run()
    return
  }

  await checkVersion()

  const command = commands.find((command) => {
    const commandConfig = Reflect.getOwnMetadata(COMMAND_OPTIONS, command.constructor)

    return commandConfig && !commandConfig.default && commandConfig.name === params[0]
  })

  if (!command) {
    console.log('Command not found, were you looking for one of these?')

    helpCommand.run()
    return
  } else {
    if (command instanceof ParentCommand && command.isChildRunnable(params)) {
      if (options.help) {
        command.runChildHelp(params)
        return
      }

      command.runChild(params)
      return
    }

    params.shift()
    const args = resolveArgs(params, command.argOptions)

    if (options.help) {
      command.printConfig({})
      return
    }

    command.run(...args)
  }
}

boot(new IntroCommand(), [new ConfigCommand(), new PipelineCommand(), new ReactStarterCommand(), new ReleaseCommand()])
