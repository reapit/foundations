import { Command } from '../../decorators'
import { AbstractCommand } from '../../abstract.command'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import ora from 'ora'
import { REAPIT_PIPELINE_CONFIG_FILE } from './constants'
import chalk from 'chalk'
import inquirer from 'inquirer'
import * as fs from 'fs'
import axios from 'axios'
import { injectable } from 'tsyringe'

@injectable()
@Command({
  name: 'delete',
  description: 'Deletes given pipeline',
})
export class DeletePipelineCommand extends AbstractCommand {
  async confirmation(pipeline: PipelineModelInterface) {
    this.writeLine(chalk.red('!! This will delete your pipeline, deployments and hosting of your application. !!'))
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        message: `Please confirm deletion of [${pipeline.id}](${pipeline.name})`,
        name: 'confirm',
      },
    ])

    if (!answers.confirm) {
      process.exit(0)
    }
  }

  async run() {
    const pipeline = await this.resolveConfigFile<PipelineModelInterface>(REAPIT_PIPELINE_CONFIG_FILE)

    if (!pipeline) {
      this.writeLine(chalk.red('no pipeline config found'))
      process.exit(1)
    }

    await this.confirmation(pipeline)

    const spinner = ora('Initiating Deletion...').start()

    const response = await (await this.axios(spinner)).delete(`/pipeline/${pipeline.id}`)

    if (axios.isAxiosError(response)) {
      if (response?.response?.status === 200) {
        spinner.succeed('Deletion started')
      } else if (response?.response?.status === 409) {
        spinner.fail('Cannot delete pipeline, deployment or deletion already in progress')
        process.exit(1)
      } else if (response?.response?.status === 404) {
        spinner.fail("Pipeline doesn't exist")
        process.exit(1)
      } else {
        console.log(response.response)
        spinner.fail('Pipeline deletion failed')
        console.log(`response: ${response.statusText}`)
        process.exit(1)
      }
    }

    spinner.start('Awaiting confirmation of deletion')
    const pusher = await this.pusher()

    await new Promise<void>((resolve) => {
      pusher.connection.bind('state_change', (states) => {
        switch (states.current) {
          case 'connected':
            resolve()
            break
          default:
            console.log('current state', states.current)
        }
      })
    })

    const channel = pusher.subscribe(`private-${pipeline.developerId as string}`)
    channel.subscribe()

    this.writeLine('Watching deletion stream...')
    this.writeLine("You're free to skip this command")
    this.writeLine('')
    this.writeLine(`However, please delete your './${REAPIT_PIPELINE_CONFIG_FILE}' file`)

    channel.bind('pipeline-update', (event) => {
      if (event.id !== pipeline.id) {
        return
      }

      if (event.buildStatus === 'DELETING') {
        // Do nothing. continuing in progress
      } else if (event.buildStatus === 'DELETED') {
        fs.rmSync(REAPIT_PIPELINE_CONFIG_FILE)
        spinner.succeed('Deletion successful')
        process.exit(0)
      } else {
        // TODO resolve other status'
      }
    })
  }
}
