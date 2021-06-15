import { AbstractCommand } from './../abstract.command'
import { ParentCommand } from './../parent.command'

export class HelpCommand extends AbstractCommand {
  commands: (AbstractCommand | ParentCommand)[] = []

  sortCommands(a: ParentCommand | AbstractCommand): number {
    return a instanceof ParentCommand ? 1 : -1
  }

  setCommands(commands: (AbstractCommand | ParentCommand)[]) {
    this.commands = commands
  }
  async run() {
    this.commands.sort(this.sortCommands).forEach((command) => {
      command.printConfig()
    })
  }
}
