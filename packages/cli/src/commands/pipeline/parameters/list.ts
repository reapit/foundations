import { AbstractCommand } from '../../../abstract.command'
import { Command } from '../../../decorators'
import { REAPIT_PIPELINE_CONFIG_FILE } from '../constants'
import ora, { Ora } from 'ora'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import chalk from 'chalk'
import { injectable } from 'tsyringe'

@injectable()
@Command({
  name: 'params',
  description: 'List existing environment parameter keys',
})
export class PipelineParametersListCommand extends AbstractCommand {
  async findExistingConfig(): Promise<PipelineModelInterface | never> {
    const pipelineConfig = (await this.resolveConfigFile(REAPIT_PIPELINE_CONFIG_FILE)) as PipelineModelInterface

    if (!pipelineConfig) {
      this.writeLine('Pipeline config not found')
      process.exit(1)
    }

    return pipelineConfig
  }

  async fetchEnvironmentKeys(spinner: Ora, pipelineId: string): Promise<string[]> {
    const response = await (await this.axios(spinner)).get<string[]>(`/pipeline/${pipelineId}/parameter`)

    if (response.status !== 200) {
      spinner.fail('Failed to fetch parameters')
      console.log(response)
      this.writeLine(response.statusText)
      this.resolveAxiosResponseError(response)
      process.exit(1)
    }

    spinner.succeed('Crurently configured environment variables')

    return response.data
  }

  async run() {
    const pipeline = await this.findExistingConfig()

    const spinner = ora('Fetching Parameters').start()

    const keys = await this.fetchEnvironmentKeys(spinner, pipeline.id as string)

    keys.forEach((key) => this.writeLine(chalk.green.bold(key)))
  }
}
