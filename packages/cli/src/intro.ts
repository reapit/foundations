import { Command } from './decorators'
import { AbstractCommand } from './abstract.command'
import chalk from 'chalk'
import figlet from 'figlet'
import pack from './../package.json'

@Command({
  default: true,
})
export class IntroCommand extends AbstractCommand {
  run() {
    console.log('here we are?')
    console.log(
      chalk.blue(
        figlet.textSync('Reapit', {
          font: 'Larry 3D',
        }),
      ),
    )
    console.log(pack.description as string)
    console.log(`Version: ${pack.version}`)
  }
}
