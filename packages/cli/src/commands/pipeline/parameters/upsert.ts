import { AbstractCommand } from '../../../abstract.command'
import { Command } from '../../../decorators'
import { REAPIT_PIPELINE_CONFIG_FILE } from '../constants'
import ora, { Ora } from 'ora'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import inquirer from 'inquirer'
import { injectable } from 'tsyringe'

@injectable()
@Command({
  name: 'param-configure',
  description: 'Create or update an environment parameter',
})
export class PipelineParameterUpsertCommand extends AbstractCommand {
  async findExistingConfig(): Promise<PipelineModelInterface | never> {
    const pipelineConfig = (await this.resolveConfigFile(REAPIT_PIPELINE_CONFIG_FILE)) as PipelineModelInterface

    if (!pipelineConfig) {
      this.writeLine('Pipeline config not found')
      process.exit(1)
    }

    return pipelineConfig
  }

  async createParameter(spinner: Ora, pipelineId: string, param: { key: string; value: string }): Promise<void> {
    const response = await (await this.axios(spinner)).put<string[]>(`/pipeline/${pipelineId}/parameter`, param)

    if (response.status !== 200) {
      spinner.fail('Failed to fetch parameters')
      this.writeLine(response.statusText)
      this.resolveAxiosResponseError(response)
      process.exit(1)
    }

    spinner.succeed('Upserted environment variable')
  }

  async run() {
    const pipeline = await this.findExistingConfig()
    const answers = await inquirer.prompt<{
      key: string
      value: string
    }>([
      {
        name: 'key',
        type: 'input',
        validate: (key) => {
          console.log(key, !/^[a-zA-Z_]+$/.test(key))
          return !/^[a-zA-Z_]+$/.test(key) ? 'Invalid key, letters and underscores only' : true
        },
      },
      {
        name: 'value',
        type: 'input',
      },
    ])

    const spinner = ora('Creating environment variable').start()

    await this.createParameter(spinner, pipeline.id as string, {
      ...answers,
    })
  }
}
