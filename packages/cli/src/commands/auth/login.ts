import { AbstractCommand } from '../../abstract.command'
import { Command, Param } from '../../decorators'
import chalk from 'chalk'

@Command({
  name: 'login',
  description: 'test command for logging in via reapit connect',
})
export class LoginCommand extends AbstractCommand {
  async run(
    @Param({
      name: 'clientId',
      description: 'clientId of your app',
      required: true,
    })
    clientId: string,
  ) {
    const session = await this.loginService.getSession(clientId)

    this.writeLine(chalk.green('Logged in to reapit connect ✅'))
    this.writeLine('')

    this.writeLine(`Logged in as: ${chalk.blue(session.loginIdentity.name)}`)
    this.writeLine(`Your Organisation: ${chalk.blue(session.loginIdentity.orgName)}`)
    this.writeLine('Access groups:')
    session.loginIdentity.groups.forEach((group) => this.writeLine(chalk.blue(`- ${group}`), 1))
  }
}
