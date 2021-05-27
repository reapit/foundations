import { AbstractCommand } from './../abstract.command'
import { ParentCommand } from './../parent.command'

export class HelpCommand extends AbstractCommand {
  commands: (AbstractCommand | ParentCommand)[] = []

  setCommands(commands: (AbstractCommand | ParentCommand)[]) {
    this.commands = commands
  }
  async run() {
    this.commands.forEach((command) => {
      command.printConfig()
    })
  }
}
