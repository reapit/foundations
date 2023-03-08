import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import inquirer, { QuestionCollection } from 'inquirer'
import ora, { Ora } from 'ora'
import chalk from 'chalk'
import * as fs from 'fs'
import { resolve } from 'path'
import { REAPIT_PIPELINE_CONFIG_FILE } from './constants'
import { serialisePipeline } from '../../utils'
import { injectable } from 'tsyringe'

@injectable()
@Command({
  name: 'edit',
  description: 'Edit a pipeline',
})
export class PipelineEditCommand extends AbstractCommand {
  async checkExistingPipeline(): Promise<PipelineModelInterface | never> {
    const pipelineConfig = (await this.resolveConfigFile(REAPIT_PIPELINE_CONFIG_FILE)) as PipelineModelInterface

    if (!pipelineConfig) {
      this.writeLine('Pipeline config not found')
      process.exit(1)
    }

    return pipelineConfig
  }

  async updatePipeline(
    {
      id,
      name,
      appType,
      repository,
      create,
      outDir,
      buildCommand,
      packageManager,
      appId,
      branch,
    }: {
      id: string
      name: string
      appType: string
      repository: string
      create: boolean
      outDir: string
      buildCommand: string
      packageManager: string
      appId: string
      branch: string
    },
    spinner: Ora,
  ): Promise<PipelineModelInterface> {
    const response = await (
      await this.axios(spinner)
    ).put<PipelineModelInterface>(`/pipeline/${id}`, {
      id,
      name,
      appType: appType.toLowerCase(),
      repository,
      outDir,
      buildCommand,
      packageManager,
      appId,
      branch,
    })

    if (response.status === 200) {
      spinner.succeed(`Pipeline ${response.data.name} updated`)

      if (create) {
        spinner.start('Creating local pipeline config')
        fs.writeFileSync(resolve(process.cwd(), REAPIT_PIPELINE_CONFIG_FILE), this.serialisePipelineJson(response.data))
        spinner.succeed('Updated local pipeline config')
      }
      // console.log('Now make a commit to your project or use `reapit pipeline deploy` to start a deployment manually')

      return response.data
    } else {
      spinner.fail('Failed to update pipeline')
      console.log(chalk.red('Check your internet connection'))
      console.log(chalk.red('Report this error if it persists'))
      console.log(`Response: ${response.statusText}`)
      process.exit(1)
    }
  }

  serialisePipelineJson = (pipeline: PipelineModelInterface): string => {
    return JSON.stringify(serialisePipeline(pipeline), null, 2)
  }

  async run() {
    const pipeline = await this.checkExistingPipeline()

    const questions: QuestionCollection<any>[] = [
      {
        type: 'input',
        message: 'Deployment branch (will deploy when merging to this branch)',
        name: 'branch',
        default: pipeline.branch,
        validate: (value) => {
          if (!value || value.trim().length <= 0) {
            return 'Please add a branch for deployment'
          }

          if (value.length >= 256) {
            return 'Branch name too long, please make it less than 255 characters'
          }

          return true
        },
      },
      {
        type: 'list',
        message: 'App Type',
        name: 'appType',
        default: pipeline.appType,
        choices: ['Node', 'React'],
      },
    ]

    questions.push({
      type: 'input',
      message: 'Please add your repository url',
      name: 'repository',
      default: pipeline.repository,
      validate: (value) => {
        if (!value || value.trim().length <= 0) {
          return 'Please add a repository url'
        }

        if (
          !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/.test(
            value,
          )
        ) {
          return 'Please enter a valid repository url'
        }

        return true
      },
    })

    questions.push({
      type: 'input',
      name: 'outDir',
      message: 'outDir - The output of your build command',
      default: pipeline.outDir,
      validate: (value) => {
        if (!value || value.trim().length <= 0) {
          return 'Please add an ourDir for deployment'
        }

        if (!/^[\w+/]+$/.test(value)) {
          return 'Please enter a valid folder location (no file names)'
        }

        if (value.length >= 256) {
          return 'OutDir location too long, please make it less than 255 characters'
        }

        return true
      },
    })

    questions.push({
      type: 'input',
      name: 'buildCommand',
      message: 'buildCommand - The build command of your project',
      default: pipeline.buildCommand,
      validate: (value) => {
        if (!value || value.trim().length <= 0) {
          return 'Please add a buildCommand for deployment'
        }

        if (value.length >= 256) {
          return 'buildCommand too long, please make it less than 255 characters'
        }

        return true
      },
    })

    questions.push({
      type: 'list',
      name: 'packageManager',
      message: 'packageManager',
      default: pipeline.packageManager,
      choices: ['yarn', 'npm'],
    })

    const answers = await inquirer.prompt([...questions])

    const spinner = ora('Updating pipeline').start()

    const updatedPipeline = await this.updatePipeline(
      {
        ...pipeline,
        ...answers,
      },
      spinner,
    )

    fs.writeFileSync(resolve(process.cwd(), REAPIT_PIPELINE_CONFIG_FILE), this.serialisePipelineJson(updatedPipeline))
    this.end(spinner, updatedPipeline)
    process.exit(0)
  }

  end(spinner, event) {
    spinner.succeed('🚀 Successfully Updated')
    this.writeLine('')
    this.writeLine("Now you're ready to deploy to your pipeline!")
    this.writeLine(`To do so, either use ${chalk.green('reapit release zip')} or ${chalk.green('reapit release repo')}`)
    this.writeLine('')
    this.writeLine('Or use commits from your repo')
    this.writeLine('')
    this.writeLine(`You can visit your domain here ${chalk.green(`https://${event.subDomain}.iaas.paas.reapit.cloud`)}`)
    process.exit(0)
  }
}
