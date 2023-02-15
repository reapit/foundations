import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import { unlinkSync, existsSync } from 'fs'
import { LoginService } from '../../services'
import chalk from 'chalk'
import { inject, injectable } from 'tsyringe'

@injectable()
@Command({
  name: 'logout',
  description: 'Deletes the current stored session',
})
export class LogoutCommand extends AbstractCommand {
  constructor(
    @inject('devMode') protected readonly devMode: boolean,
    @inject(LoginService)
    protected readonly loginService: LoginService,
  ) {
    super(devMode, loginService)
  }

  async run() {
    if (!existsSync(LoginService.storageLocation)) {
      this.writeLine(chalk.green('No session found, no need to logout'))
      return
    }

    unlinkSync(LoginService.storageLocation)
    this.writeLine(chalk.green('Successfully logged out ✅'))
  }
}
