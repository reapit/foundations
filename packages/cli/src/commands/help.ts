import { LoginService } from '../services'
import { container, inject } from 'tsyringe'
import { AbstractCommand } from './../abstract.command'
import { ParentCommand } from './../parent.command'
import { Command, CommandOptions, COMMAND_OPTIONS } from './../decorators'
import { constructor } from 'tsyringe/dist/typings/types'

@Command({
  name: 'help',
  description: '',
})
export class HelpCommand extends AbstractCommand {
  constructor(
    @inject('commands')
    private readonly commands: constructor<AbstractCommand | ParentCommand>[],
    @inject('devMode')
    devMode:boolean,
    @inject(LoginService) loginService: LoginService,
  ) {
    super(
      devMode,
      loginService,
    )
  }

  private getAllCommands(): AbstractCommand[] {
    return this.commands.map(command => {
      const config: CommandOptions = Reflect.getOwnMetadata(COMMAND_OPTIONS, command)

      return container.resolve<AbstractCommand>(config.name)
    })
  }

  sortCommands(a: ParentCommand | AbstractCommand): number {
    return a instanceof ParentCommand ? 1 : -1
  }

  async run() {
    this.writeLine('')
    this.getAllCommands().sort(this.sortCommands).forEach((command) => {
      command.printConfig({})
    })
  }
}
