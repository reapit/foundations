import chalk from 'chalk'
import { AbstractCommand } from './abstract.command'
import { COMMAND_OPTIONS } from './decorators'
import { resolveArgs } from './utils/resolveArgs'

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

  private getCommand(params: string[]): AbstractCommand | undefined {
    return this.commands.find(
      (command) => Reflect.getOwnMetadata(COMMAND_OPTIONS, command.constructor).name === params[1],
    )
  }

  runChildHelp(params: string[]): void {
    const command = this.getCommand(params)
    if (!command) return

    command.printConfig({ singular: true, parent: this })
  }

  runChild(params: string[]) {
    const command = this.getCommand(params)

    if (!command) return
    params.shift()
    params.shift()
    const args = resolveArgs(params, command.argOptions)

    command.run(...args)
  }

  sortCommands(a: AbstractCommand, b: AbstractCommand): number {
    return a.commandOptions.name.localeCompare(b.commandOptions.name)
  }

  printConfig() {
    this.writeLine(`${chalk.bold.green(this.commandOptions.name)}`, 1, '  ')
    this.writeLine(`${this.commandOptions.description}`, 1, '  ')
    this.writeLine('')
    this.commands.sort(this.sortCommands).forEach((command) => command.printConfig({ parent: this }))
  }
}
