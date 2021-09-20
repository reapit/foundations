import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import inquirer, { QuestionCollection } from 'inquirer'
import ora from 'ora'
import chalk from 'chalk'
import * as fs from 'fs'
import { resolve } from 'path'
import git from 'simple-git'
import { REAPIT_PIPELINE_CONFIG_FILE } from './constants'

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
          const gitUrl = urlParts[0].split('\t')
          const repoUrl = `https://github.com/${gitUrl[gitUrl.length - 1].split(':').pop()?.replace('.git', '')}`
          if (!repos.includes(repoUrl) && gitUrl[gitUrl.length - 1] !== '') {
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
        console.log()
        process.exit(1)
      }
    }
  }

  async createPipeline({
    name,
    appType,
    repository,
    create,
    outDir,
    buildCommand,
    packageManager,
  }: {
    name: string
    appType: string
    repository: string
    create: boolean
    outDir: string
    buildCommand: string
    packageManager: string
  }) {
    const spinner = ora('Creating pipeline').start()
    const response = await (
      await this.axios(spinner)
    ).post<PipelineModelInterface>('/pipeline', {
      name: name,
      appType: appType.toLowerCase(),
      repository: repository,
      outDir,
      buildCommand,
      packageManager,
    })

    if (response.status === 200) {
      spinner.succeed(`Pipeline ${response.data.name} created`)

      if (create) {
        spinner.start('Creating local pipeline config')
        fs.writeFileSync(resolve(process.cwd(), REAPIT_PIPELINE_CONFIG_FILE), JSON.stringify(response.data, null, 2))
        spinner.succeed('Created local pipeline config')
      }
      console.log('Now make a commit to your project or use `reapit pipeline deploy` to start a deployment manually')
    } else {
      spinner.fail('Failed to create pipeline')
      console.log(chalk.red('Check your internet connection'))
      console.log(chalk.red('Report this error if it persists'))
      process.exit(1)
    }
  }

  async run() {
    await this.checkExistingPipeline()
    const repositories = await this.fetchGitRemotes()

    const questions: QuestionCollection<any>[] = [
      {
        type: 'input',
        message: "Your project's name",
        name: 'name',
        default: process.cwd().split('/').pop(),
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
      })
    }

    questions.push({
      type: 'input',
      name: 'outDir',
      message: 'outDir - The output of your build command',
      default: 'build',
    })

    questions.push({
      type: 'input',
      name: 'buildCommand',
      message: 'buildCommand - The build command of your project',
      default: 'build',
    })

    questions.push({
      type: 'list',
      name: 'packageManager',
      message: 'packageManager',
      choices: ['yarn', 'npm'],
    })

    const answers = await inquirer.prompt([
      ...questions,
      {
        type: 'confirm',
        message: 'Would you like to create a pipeline config in this directory?',
        name: 'create',
      },
    ])

    await this.createPipeline(answers)
  }
}
