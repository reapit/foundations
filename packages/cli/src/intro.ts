import { Command } from './decorators'
import { AbstractCommand } from './abstract.command'
import chalk from 'chalk'
import pack from './../package.json'
import { injectable } from 'tsyringe'

@injectable()
@Command({
  default: true,
})
export class IntroCommand extends AbstractCommand {
  run() {
    this.writeLine(
      chalk.blueBright(`
    ____                   _ __ 
   / __ \\___  ____ _____  (_) /_
  / /_/ / _ \\/ __ \`/ __ \\/ / __/
 / _, _/  __/ /_/ / /_/ / / /_  
/_/ |_|\\___/\\__,_/ .___/_/\\__/  
                /_/`),
    )
    this.writeLine(pack.description as string)
    this.writeLine(`Version: ${pack.version}`)
  }
}
