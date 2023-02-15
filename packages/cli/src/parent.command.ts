import chalk from 'chalk'
import { container } from 'tsyringe'
import { constructor } from 'tsyringe/dist/typings/types'
import { AbstractCommand } from './abstract.command'
import { CommandOptions, COMMAND_OPTIONS } from './decorators'
import { resolveArgs } from './utils/resolveArgs'

export abstract class ParentCommand extends AbstractCommand {
  abstract commands: constructor<AbstractCommand>[]

  run() {
    this.printConfig()
  }

  isChildRunnable(params: string[]): boolean {
    return this.commands
      .map<string>((command) => Reflect.getOwnMetadata(COMMAND_OPTIONS, command).name)
      .includes(params[1])
  }

  private getCommand(params: string[]): AbstractCommand | undefined {
    const command = container.resolve<AbstractCommand>(params[1])

    if (!command || !this.commands.includes(command.constructor as constructor<AbstractCommand>)) {
      return undefined
    }

    return command
  }

  private getAllCommands(): AbstractCommand[] {
    return this.commands.map((command) => {
      const config: CommandOptions = Reflect.getOwnMetadata(COMMAND_OPTIONS, command)

      return container.resolve<AbstractCommand>(config.name)
    })
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
    this.getAllCommands()
      .sort(this.sortCommands)
      .forEach((command) => command.printConfig({ parent: this }))
  }
}
