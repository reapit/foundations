import chalk from 'chalk'
import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import { DeploymentModelInterface } from '@reapit/foundations-ts-definitions'
import ora from 'ora'

@Command({
  name: 'list',
  description: 'List deployments',
})
export class DeploymentList extends AbstractCommand {
  async run() {
    const spinner = ora('Fetching deployments').start()
    const response = await (await this.axios()).get<{ items: DeploymentModelInterface[] }>('/deployment')
    spinner.stop()

    if (response.status !== 200) {
      console.log(chalk.red('Error fetching results: ', response.status, response.statusText))
    }

    if (!response.data || !response.data.items || response.data.items.length === 0) {
      console.log(chalk.redBright('No deployments found'))
      return
    }

    console.table(
      response.data.items.map((deployment) => ({
        id: deployment.id,
        name: deployment.name,
        appType: deployment.appType,
        repository: deployment.repository,
      })),
      ['id', 'name', 'appType', 'repository'],
    )
  }
}
