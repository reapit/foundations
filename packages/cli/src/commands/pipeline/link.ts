import { Command, Param } from '../../decorators'
import { AbstractCommand } from '../../abstract.command'
import {
  PipelineModelInterface,
  PipelineRunnerModelInterface,
} from '@reapit/foundations-ts-definitions'
import ora from 'ora'
import { REAPIT_PIPELINE_CONFIG_FILE } from './constants'
import inquirer from 'inquirer'
import * as fs from 'fs'
import { resolve } from 'path'
import chalk from 'chalk'
import { injectable } from 'tsyringe'

@injectable()
@Command({
  name: 'link',
  description: 'setup repo with pipeline/app',
})
export class LinkPipelineCommand extends AbstractCommand {
  async run(
    @Param({
      name: 'pipelineId',
      description: 'id of the pipeline to link with this dir/repo',
      required: false,
    })
    pipelineId,
  ) {
    const pipeline = await this.resolveConfigFile<PipelineModelInterface>(REAPIT_PIPELINE_CONFIG_FILE)

    if (pipeline) {
      this.writeLine(chalk.red('Pipeline config already exists in this repo'))
      process.exit(1)
    }

    let answers: { id: string } = { id: '' }

    if (!pipelineId) {
      answers = await inquirer.prompt<{ id: string }>([
        {
          type: 'input',
          message: 'Pipeline id to link',
          name: 'id',
        },
      ])
    } else {
      answers.id = pipelineId
    }

    const spinner = ora('Fetching pipeline...').start()

    const response = await (await this.axios(spinner)).get<PipelineRunnerModelInterface>(`/pipeline/${answers.id}`)

    if (response.status === 200) {
      spinner.succeed('Successfully found pipeline')
      fs.writeFileSync(resolve(process.cwd(), REAPIT_PIPELINE_CONFIG_FILE), JSON.stringify(response.data, null, 2))
    } else {
      console.log('response', response)
      console.log(`Repsonse: ${response.statusText}`)
      this.resolveAxiosResponseError(response)
      spinner.fail(
        (response.data as any)?.message ? (response.data as any).message : 'No pipeline exists with id provided',
      )
    }
  }
}
