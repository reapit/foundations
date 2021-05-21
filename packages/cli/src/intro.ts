import { Command } from './decorators'
import { AbstractCommand } from './abstract.command'
import chalk from 'chalk'
import figlet from 'figlet'

@Command({
  default: true,
})
export class IntroCommand extends AbstractCommand {
  run() {
    console.log(
      chalk.blue(
        figlet.textSync('Reapit', {
          font: 'Basic',
        }),
      ),
    )
  }
}
