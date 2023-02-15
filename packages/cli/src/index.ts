#!/usr/bin/env node

import 'reflect-metadata'
import argv from 'process.argv'
import { AbstractCommand } from './abstract.command'
import { ConfigCommand } from './commands/config'
import { CommandOptions, COMMAND_OPTIONS } from './decorators'
import { IntroCommand } from './intro'
import { HelpCommand } from './commands/help'
import { ParentCommand } from './parent.command'
import { PipelineCommand } from './commands/pipeline'
import { resolveArgs } from './utils/resolveArgs'
import { BootstrapCommand } from './commands/bootstrap'
import { ReleaseCommand } from './commands/release'
import { CheckVersionCommand } from './commands/check-version'
import { AuthCommand } from './commands/auth'
import { container } from 'tsyringe'
import { constructor } from 'tsyringe/dist/typings/types'
import { LoginService } from './services'

const checkVersion = async () => {
  const checkVersion = container.resolve(CheckVersionCommand)
  await checkVersion.run()
}

const isCommandConfig = (config: CommandOptions | { default: true }): config is CommandOptions => config.hasOwnProperty('name')

const boot = async (defaultCommand: constructor<AbstractCommand>, commands: (constructor<AbstractCommand | ParentCommand>)[]) => {
  const processArgv = argv(process.argv.slice(2))
  const commandsArgs = processArgv<any>({})

  const params = commandsArgs['--']
  const options = commandsArgs

  container.register(LoginService, LoginService)
  container.register('commands', {
    useValue: commands,
  })
  container.register('devMode', {
    useValue: Object.keys(options).includes('dev')
  });

  [
    ...commands,
    defaultCommand,
    HelpCommand,
  ].forEach(command => {
    const commandConfig: CommandOptions | { default: true } = Reflect.getOwnMetadata(COMMAND_OPTIONS, command)

    container.register(isCommandConfig(commandConfig) ? commandConfig.name : 'default', command)
  })

  const helpCommand = container.resolve<AbstractCommand>('help')

  let showHelpCommand = false
  if (!params && Object.keys(options).length === 0) {
    showHelpCommand = true
  } else if (!params || (params.length === 0 && options)) {
    showHelpCommand = true
  }

  if (showHelpCommand) {
    const intro = container.resolve<AbstractCommand>('default')
    intro.run(params, options)
    await checkVersion()
    helpCommand.run()
    return
  }

  await checkVersion()

  const command = container.resolve<AbstractCommand | ParentCommand>(params[0])

  if (!command) {
    console.log('Command not found, were you looking for one of these?')

    helpCommand.run()
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

boot(IntroCommand, [
  AuthCommand,
  ConfigCommand,
  PipelineCommand,
  BootstrapCommand,
  ReleaseCommand,
])
