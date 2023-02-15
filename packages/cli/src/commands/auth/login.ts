import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import chalk from 'chalk'
import { inject, injectable } from 'tsyringe'
import { LoginService } from '../../services'

@injectable()
@Command({
  name: 'login',
  description: 'test command for logging in via reapit connect',
})
export class LoginCommand extends AbstractCommand {
  constructor(
    @inject('devMode') protected readonly devMode: boolean,
    @inject(LoginService)
    protected readonly loginService: LoginService,
  ) {
    super(devMode, loginService)
  }

  async run() {
    const session = await this.loginService.getSession()

    this.writeLine(chalk.green('Logged in to reapit connect ✅'))
    this.writeLine('')

    this.writeLine(`Logged in as: ${chalk.blue(session.loginIdentity.name)}`)
    this.writeLine(`Your Organisation: ${chalk.blue(session.loginIdentity.orgName)}`)
    this.writeLine('Access groups:')
    session.loginIdentity.groups.forEach((group) => this.writeLine(chalk.blue(`- ${group}`), 1))
  }
}
