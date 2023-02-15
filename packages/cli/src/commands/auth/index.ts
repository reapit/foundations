import { LoginService } from '../../services'
import { inject } from 'tsyringe'
import { Command } from '../../decorators'
import { ParentCommand } from '../../parent.command'
import { LoginCommand } from './login'
import { LogoutCommand } from './logout'

@Command({
  name: 'auth',
  description: 'For managing authentication sessions with reapit connect',
})
export class AuthCommand extends ParentCommand {
  commands = [LoginCommand, LogoutCommand]

  constructor(
    @inject('devMode') protected readonly devMode: boolean,
    @inject(LoginService)
    protected readonly loginService: LoginService,
  ) {
    super(devMode, loginService)
  }
}
