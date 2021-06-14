import { Command } from './../../decorators'
import { AbstractCommand } from '../../abstract.command'
import ora, { Ora } from 'ora'

@Command({
  name: 'list',
  description: 'List all releases',
})
export class ReleaseListCommand extends AbstractCommand {

  async projectInfo(): Promise<{[s: string]: any}> {
    const config = await this.resolveConfigFile<{[s: string]: string}>('package.json')

    if (!config) {
      throw new Error('package info not found')
    }

    return config
  }
 
  async listDeployments(spinner: Ora, project: string): Promise<any[]> {
    spinner.start('Fetching releases')
    const response = await (await this.axios()).get(`/deploy/release/${project}`)

    if (response.status !== 200) {
      spinner.fail('Failed to fetch deployments')
      throw new Error('Failed to fetch deployments')
    }

    spinner.succeed('Fetched deployments')

    return response.data
  }
  /**
   * Run command
   */
  async run() {
    const spinner = ora()

    spinner.start('fetching package info')
    const packageInfo = await this.projectInfo()
    spinner.succeed('found package info')

    const deploys = await this.listDeployments(spinner, packageInfo.name)

    console.table(deploys.map((deploy) => {
      const parts = deploy.split('/')

      const filenameParts = parts[parts.length - 1].split('.zip')

      return filenameParts[0]
    }))
  }
}
