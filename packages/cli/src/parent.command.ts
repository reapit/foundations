import chalk from 'chalk'
import { AbstractCommand } from './abstract.command'
import { COMMAND_OPTIONS } from './decorators'

export abstract class ParentCommand extends AbstractCommand {
  abstract commands: AbstractCommand[]
  run() {
    this.printConfig()
  }

  isChildRunnable(params: string[]): boolean {
    return this.commands
      .map<string>((command) => Reflect.getOwnMetadata(COMMAND_OPTIONS, command.constructor).name)
      .includes(params[1])
  }

  runChild(params: string[], options) {
    const command = this.commands.find(
      (command) => Reflect.getOwnMetadata(COMMAND_OPTIONS, command.constructor).name === params[1],
    )
    if (!command) return
    delete params[0]
    delete params[1]
    command.run(params, options)
  }

  printConfig() {
    const parentConfig = Reflect.getOwnMetadata(COMMAND_OPTIONS, this.constructor)
    console.log(`
    ${chalk.green(parentConfig.name)}
      ${parentConfig.description}
    `)
    this.commands.forEach((command) => command.printConfig())
  }
}
