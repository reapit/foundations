import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import { DeploymentModelInterface } from '@reapit/foundations-ts-definitions'
import inquirer from 'inquirer'
import ora from 'ora'
import chalk from 'chalk'
import * as fs from 'fs'
import { resolve } from 'path'

@Command({
  name: 'create',
  parent: 'deployment',
  description: 'List deployments',
})
export class DeploymentCreate extends AbstractCommand {
  async run() {
    // TODO use inquirer for questions and anwser blocks

    const answers = await inquirer.prompt([
      {
        type: 'input',
        message: "Your project's name",
        name: 'name',
        default: process.cwd().split('/').pop(),
      },
      {
        type: 'list',
        message: 'App Type',
        name: 'appType',
        choices: ['Node', 'React'],
      },
      {
        type: 'confirm',
        message: 'Would you like to create a deployment config in this directory?',
        name: 'create',
      },
    ])

    const spinner = ora('Creating deployments').start()
    const response = await (await this.axios()).post<DeploymentModelInterface>('/', {
      name: answers.name,
      appType: answers.appType.toLowerCase(),
    }) // /deployment
    spinner.stop()

    if (response.status === 200) {
      console.log(chalk.green('Successfully created deployment'))

      fs.writeFileSync(resolve(process.cwd(), 'reapit-deployment.json'), JSON.stringify(response.data))

      if (answers.create) {
        // TODO generate local config schema
      }
    }
  }
}
