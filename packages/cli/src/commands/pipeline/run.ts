import { AbstractCommand } from '../../abstract.command'
import { Command, Param } from '../../decorators'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import ora from 'ora'
import chalk from 'chalk'
import { REAPIT_PIPELINE_CONFIG_FILE } from './constants'

@Command({
  name: 'run',
  description: 'Run a pipeline',
})
export class PipelineRun extends AbstractCommand {
  async resolvePipelineId(): Promise<string | undefined> {
    const config = await this.resolveConfigFile<PipelineModelInterface>(REAPIT_PIPELINE_CONFIG_FILE)

    if (!config) {
      return undefined
    }

    return config.id
  }

  async run(
    @Param({
      name: 'pipelineId',
    })
    pipelineId?: string,
  ) {
    const spinner = ora('Deploying')

    if (!pipelineId) {
      spinner.start('resolving pipelineId from ./ as not specified from parameter')
      pipelineId = await this.resolvePipelineId()

      if (!pipelineId) {
        spinner.fail('Cannot find pipelineId in project or parameter')
        process.exit(1)
      } else {
        spinner.info(`pipelineId resolved as ${pipelineId}`)
      }
    }

    spinner.info('Beginning deployment')
    const response = await (await this.axios(spinner)).post<PipelineModelInterface>(`/pipeline/${pipelineId}/run`) // /pipeline

    if (response.status === 200) {
      spinner.succeed(`Pipeline successfully deployed https://${response.data.name}reapit.cloud`)
    } else {
      spinner.fail('Failed to run pipeline')
      console.log(chalk.red('Check your internet connection'))
      console.log(chalk.red('Report this error if it persists'))
      process.exit(1)
    }
  }
}
