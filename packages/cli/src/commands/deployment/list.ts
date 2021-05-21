import chalk from 'chalk'
import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import { DeploymentModelInterface } from '@reapit/foundations-ts-definitions'
import ora from 'ora'

@Command({
  name: 'list',
  parent: 'deployment',
  description: 'List deployments',
})
export class DeploymentList extends AbstractCommand {
  async run() {
    const spinner = ora('Fetching deployments').start()
    const response = await (await this.axios()).get<DeploymentModelInterface[]>('/', {
      // deployments
      headers: {
        authorization: '',
      },
    })
    spinner.stop()

    if (response.status !== 200) {
      console.log(chalk.red('Error fetching results: ', response.status, response.statusText))
    }

    if (response.data.length === 0) {
      console.log(chalk.redBright('No deployments found'))
      return
    }

    console.table(
      response.data.map((deployment) => [
        chalk.blue(deployment.id),
        chalk.blue(deployment.name),
        chalk.blue(deployment.appType),
      ]),
      ['id', 'name', 'deployment type'],
    )
  }
}
