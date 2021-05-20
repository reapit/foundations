import { Command, command, metadata } from 'clime'
import chalk from 'chalk'
import { resolveConfig } from './../../utils'
import inquirer from 'inquirer'


@command({
  description: 'Create a config file',
})
export default class extends Command {

  @metadata
  async execute(): Promise<void> {

    const config = await resolveConfig()

    if (config !== false) {
      console.log(chalk.bold(config.from === 'project' ? `Existing config found in project` : 'Existing config found globally'))
    } else {
      console.log(chalk.bold('No existing config found'))
    }

    const answers = await inquirer.prompt([
      "Do you want to create global or project specific config?",
      "",
    ]);

    console.log('answers', answers)
  }
}
