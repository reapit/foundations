import { Command, command, metadata } from 'clime'
import figlet from 'figlet'
import chalk from 'chalk'
import * as pack from './../../package.json'

@command({
  description: 'This is a command for printing a help message',
})
export default class extends Command {
  @metadata
  execute() {
    return `${chalk.blue(figlet.textSync('Reapit', {
        font: 'Chunky',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }))}

    ${chalk.white.bold(`Version ${pack.version}`)}
    `
  }
}
