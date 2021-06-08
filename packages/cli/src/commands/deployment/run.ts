import { AbstractCommand } from '../../abstract.command'
import { Command, Param } from '../../decorators'
import { DeploymentModelInterface } from '@reapit/foundations-ts-definitions'
import ora from 'ora'
import chalk from 'chalk'
import { REAPIT_DEPLOYMENT_CONFIG_FILE } from './constants'

@Command({
  name: 'run',
  description: 'Run a deployment',
})
export class DeploymentRun extends AbstractCommand {
  async resolveDeploymentId(deploymentId?: string): Promise<string | undefined> {
    if (deploymentId) {
      return Promise.resolve(deploymentId)
    }

    const config = await this.resolveConfigFile<DeploymentModelInterface>(REAPIT_DEPLOYMENT_CONFIG_FILE)

    if (!config) {
      return undefined
    }

    return config.id
  }

  async run(
    @Param({
      name: 'deploymentId',
    })
    deploymentId: string,
  ) {
    if (!deploymentId) {
      console.log(chalk.red('Deployment Id is required'))
      process.exit(1)
    }

    const spinner = ora('Creating deployment').start()
    const response = await (await this.axios()).post<DeploymentModelInterface>(`/deployment/${deploymentId}/run`) // /deployment

    if (response.status === 200) {
      spinner.succeed(`App ${response.data.name} deployed to Reapit Cloud at https://${response.data.name}reapit.cloud`)
    } else {
      spinner.fail('Failed to run deployment')
      console.log(chalk.red('Check your internet connection'))
      console.log(chalk.red('Report this error if it persists'))
      process.exit(1)
    }
  }
}
