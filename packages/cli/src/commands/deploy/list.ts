import { Command } from './../../decorators'
import { AbstractCommand } from '../../abstract.command'
import ora, { Ora } from 'ora'
import { Pagination } from 'nestjs-typeorm-paginate'

@Command({
  name: 'list',
  description: 'List all releases',
})
export class ReleaseListCommand extends AbstractCommand {
  async projectInfo(): Promise<{ [s: string]: any }> {
    const config = await this.resolveConfigFile<{ [s: string]: string }>('package.json')

    if (!config) {
      throw new Error('package info not found')
    }

    return config
  }

  async listReleases(spinner: Ora, project: string): Promise<Pagination<any>> {
    spinner.start('Fetching releases')
    const response = await (await this.axios()).get(`/api/deploy/release/${project}`)

    if (response.status !== 200) {
      spinner.fail('Failed to fetch releases')
      process.exit(1)
    }

    spinner.succeed('Fetched releases')

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

    const deploys = await this.listReleases(spinner, packageInfo.name)

    console.table(
      deploys.items.map((deploy) => {
        const parts = deploy.split('/')

        const filenameParts = parts[parts.length - 1].split('.zip')

        return filenameParts[0]
      }),
    )
  }
}
