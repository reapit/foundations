import { Command } from '../../decorators'
import { AbstractCommand } from '../../abstract.command'
import ora, { Ora } from 'ora'
import { Pagination } from 'nestjs-typeorm-paginate'
import chalk from 'chalk'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { REAPIT_PIPELINE_CONFIG_FILE } from '../pipeline/constants'
import { shleemy } from 'shleemy'
import { injectable } from 'tsyringe'

@injectable()
@Command({
  name: 'list',
  description: 'List all releases',
})
export class ReleaseListCommand extends AbstractCommand {
  async listReleases(spinner: Ora, pipelineId: string): Promise<Pagination<PipelineRunnerModelInterface>> {
    spinner.start('Fetching releases')
    const response = await (
      await this.axios()
    ).get<Pagination<PipelineRunnerModelInterface>>(`/pipeline/${pipelineId}/pipeline-runner`)

    if (response.status !== 200) {
      spinner.fail('Failed to fetch releases')
      console.log(`Response: ${response.statusText}`)
      process.exit(1)
    }

    spinner.succeed('Fetched releases')

    return response.data
  }

  /**
   * Run command
   */
  async run() {
    const pipeline = await this.resolveConfigFile<PipelineModelInterface>(REAPIT_PIPELINE_CONFIG_FILE)

    if (!pipeline) {
      this.writeLine(chalk.red('Pipeline config not found. Please run within a reapit pipeline enabled project'))
      process.exit(1)
    }

    const spinner = ora()

    const deploys = await this.listReleases(spinner, pipeline.id as string)

    deploys.items.forEach((deploy) => {
      this.writeLine(
        `${deploy.buildVersion || 'master release'} (${chalk.blue(deploy.id)})[${chalk.yellow(
          shleemy(deploy.created as string).forHumans,
        )}]{${deploy.buildStatus}}${deploy.currentlyDeployed ? chalk.green(' (current)') : ''}`,
      )
    })
  }
}
