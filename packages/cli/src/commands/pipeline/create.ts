import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import inquirer, { QuestionCollection } from 'inquirer'
import ora, { Ora } from 'ora'
import chalk from 'chalk'
import * as fs from 'fs'
import { resolve } from 'path'
import git from 'simple-git'
import { REAPIT_PIPELINE_CONFIG_FILE } from './constants'
import { serialisePipeline } from '../../utils'

@Command({
  name: 'create',
  description: 'Create a pipeline',
})
export class PipelineCreate extends AbstractCommand {
  private async fetchGitRemotes(): Promise<string[]> {
    try {
      const repositories = await git().remote(['-v'])
      if (repositories) {
        return repositories.split('\n').reduce<string[]>((repos: string[], repo: string) => {
          const urlParts = repo.split(' ')
          const [, gitUrl] = urlParts[0].split('\t')
          if (gitUrl === '') {
            return repos
          }

          const repoUrl = gitUrl.startsWith('http')
            ? gitUrl
            : `https://${gitUrl.split('@')[1].replace(/.git$/, '').replace(':', '/')}`

          if (!repos.includes(repoUrl)) {
            repos.push(repoUrl)
          }
          return repos
        }, [])
      }
    } catch (e) {
      return []
    }

    return []
  }

  async checkExistingPipeline(): Promise<void | never> {
    const pipelineConfig = await this.resolveConfigFile(REAPIT_PIPELINE_CONFIG_FILE)

    if (pipelineConfig) {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          message: 'Deployment config already exists for this project. Do you want to create a new config?',
          name: 'recreate',
        },
      ])

      if (!answers.recreate) {
        process.exit(1)
      }
    }
  }

  async createPipeline(
    {
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
    ).post<PipelineModelInterface>('/pipeline', {
      name: name,
      appType: appType.toLowerCase(),
      repository: repository,
      outDir,
      buildCommand,
      packageManager,
      appId,
      branch,
    })

    if (response.status === 201) {
      spinner.succeed(`Pipeline ${response.data.name} created`)

      if (create) {
        spinner.start('Creating local pipeline config')
        fs.writeFileSync(resolve(process.cwd(), REAPIT_PIPELINE_CONFIG_FILE), this.serialisePipelineJson(response.data))
        spinner.succeed('Created local pipeline config')
      }

      return response.data
    } else {
      spinner.fail('Failed to create pipeline')
      console.log(chalk.red('Check your internet connection'))
      console.log(chalk.red('Report this error if it persists'))
      console.log(`failure reason: ${response.statusText}`)
      process.exit(1)
    }
  }

  serialisePipelineJson = (pipeline: PipelineModelInterface): string => {
    return JSON.stringify(serialisePipeline(pipeline), null, 2)
  }

  async run() {
    await this.checkExistingPipeline()
    const repositories = await this.fetchGitRemotes()

    const questions: QuestionCollection<any>[] = [
      {
        type: 'input',
        message: "What's your App Id?",
        name: 'appId',
        validate: (value) => {
          if (!value || value.length <= 0) {
            return 'Please enter an app Id'
          }

          if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value)) {
            return 'Please enter a valid uuid (app Id)'
          }

          return true
        },
      },
      {
        type: 'input',
        message: "Your project's name",
        name: 'name',
        default: process.cwd().split('/').pop(),
        validate: (value) => {
          if (!value || value.trim().length <= 0) {
            return 'Please add a name'
          }

          if (value.length >= 256) {
            return 'Name too long, please make it less than 255 characters'
          }

          return true
        },
      },
      {
        type: 'input',
        message: 'Deployment branch (will deploy when merging to this branch)',
        name: 'branch',
        default: 'master',
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
        choices: ['Node', 'React'],
      },
    ]

    if (repositories.length >= 1) {
      questions.push({
        type: 'list',
        message: 'Please enter your repository',
        name: 'repository',
        choices: repositories,
      })
    } else {
      questions.push({
        type: 'input',
        message: 'Please add your repository url',
        name: 'repository',
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
    }

    questions.push({
      type: 'input',
      name: 'outDir',
      message: 'outDir - The output of your build command',
      default: 'build',
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
      default: 'build',
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
      choices: ['yarn', 'npm'],
    })

    const answers = await inquirer.prompt([...questions])

    const spinner = ora('Creating pipeline').start()

    const pipeline = await this.createPipeline(answers, spinner)

    if (pipeline.buildStatus === 'READY_FOR_DEPLOYMENT') {
      spinner.info('Existing pipeline reset & updated')
      await this.serialisePipelineJson(pipeline)
      this.end(spinner, pipeline)
      process.exit(0)
    }

    spinner.start('Connecting to socket...')
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

    spinner.succeed('Connection successful')
    const channel = pusher.subscribe(`private-${pipeline.developerId as string}`)
    channel.subscribe()
    spinner.info('awaiting architecture to be ready for deployment...')

    channel.bind('pipeline-update', async (event) => {
      if (event.id !== pipeline.id) {
        return
      }

      if (event.message) {
        spinner.info(event.message)
      }

      if (event.buildStatus === 'FAILED_TO_ARCHITECT') {
        spinner.fail('Architecturing failed. Please report to Reapit.')
        process.exit(1)
      } else if (event.buildStatus === 'READY_FOR_DEPLOYMENT') {
        fs.writeFileSync(resolve(process.cwd(), REAPIT_PIPELINE_CONFIG_FILE), this.serialisePipelineJson(event))
        this.end(spinner, event)
      }
    })
  }

  end(spinner, event) {
    spinner.succeed('🚀 Successfully architectured')
    this.writeLine('')
    this.writeLine("Now you're ready to deploy to your pipeline!")
    this.writeLine(`To do so, either use ${chalk.green('reapit release zip')} or ${chalk.green('reapit release repo')}`)
    this.writeLine('')
    this.writeLine(`You can visit your domain here ${chalk.green(`https://${event.subDomain}.dev.paas.reapit.cloud`)}`)
    process.exit(0)
  }
}
