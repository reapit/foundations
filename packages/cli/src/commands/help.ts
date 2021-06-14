import { AbstractCommand } from './../abstract.command'
import { ParentCommand } from './../parent.command'

export class HelpCommand extends AbstractCommand {
  commands: (AbstractCommand | ParentCommand)[] = []

  setCommands(commands: (AbstractCommand | ParentCommand)[]) {
    this.commands = commands
  }
  async run() {
    this.commands.sort((a, b) => a instanceof ParentCommand ? 1 : -1).forEach((command) => {
      command.printConfig()
    })
  }
}
