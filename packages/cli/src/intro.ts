import { Command } from './decorators'
import { AbstractCommand } from './abstract.command'
import chalk from 'chalk'
import figlet from 'figlet'
import pack from './../package.json'
import { injectable } from 'tsyringe'

@injectable()
@Command({
  default: true,
})
export class IntroCommand extends AbstractCommand {
  run() {
    this.writeLine(
      chalk.blueBright(
        figlet.textSync('Reapit', {
          font: 'Larry 3D',
        }),
      ),
    )
    this.writeLine(pack.description as string)
    this.writeLine(`Version: ${pack.version}`)
  }
}
