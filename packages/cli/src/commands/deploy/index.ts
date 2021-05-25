import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import { DeploymentModelInterface } from '@reapit/foundations-ts-definitions'
import ora from 'ora'
import chalk from 'chalk'
import * as fs from 'fs'
import { resolve } from 'path'

@Command({
  name: 'deploy',
  description: 'List deployments',
})
export class DeployCommand extends AbstractCommand {
  async run() {
    if (!fs.existsSync(resolve(process.cwd(), 'reapit-deployment.json'))) {
      console.log(chalk.red('No deployment config found in cwd'))
      return
    }
    const deployment = JSON.parse(
      fs.readFileSync(resolve(process.cwd(), 'reapit-deployment.json'), {
        encoding: 'utf8',
      }),
    )

    console.log(deployment)

    const spinner = ora('Creating deployments').start()
    const response = await (await this.axios()).post<DeploymentModelInterface>(`/${deployment.id}`) // /pipeline
    // TODO receive updates on deployment via websocket
    spinner.stop()

    if (response.status === 200) {
      console.log(chalk.green('Successfully created deployment'))
    }
  }
}
