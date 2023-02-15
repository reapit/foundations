import { LoginService } from '../services'
import { inject } from 'tsyringe'
import { AbstractCommand } from './../abstract.command'
import { ParentCommand } from './../parent.command'
import { Command } from './../decorators'

@Command({
  name: 'help',
  description: '',
})
export class HelpCommand extends AbstractCommand {
  constructor(
    @inject('commands')
    private readonly commands: (ParentCommand | AbstractCommand)[],
    @inject('devMode')
    devMode:boolean,
    @inject(LoginService) loginService: LoginService,
  ) {
    super(
      devMode,
      loginService,
    )
  }

  sortCommands(a: ParentCommand | AbstractCommand): number {
    return a instanceof ParentCommand ? 1 : -1
  }

  async run() {
    this.writeLine('')
    this.commands.sort(this.sortCommands).forEach((command) => {
      command.printConfig({})
    })
  }
}
