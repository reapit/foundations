import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import { unlinkSync, existsSync } from 'fs'
import { LoginService } from '../../services'
import chalk from 'chalk'

@Command({
  name: 'logout',
  description: 'Deletes the current stored session',
})
export class LogoutCommand extends AbstractCommand {
  async run() {
    if (!existsSync(LoginService.storageLocation)) {
      this.writeLine(chalk.green('No session found, no need to logout'))
      return
    }

    unlinkSync(LoginService.storageLocation)
    this.writeLine(chalk.green('Successfully logged out ✅'))
  }
}
