import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { LoginCommand } from './login'
import { LogoutCommand } from './logout'

@Command({
  name: 'auth',
  description: 'For managing authentication sessions with reapit connect',
})
export class AuthCommand extends ParentCommand {
  commands = [new LoginCommand(), new LogoutCommand()]
}
