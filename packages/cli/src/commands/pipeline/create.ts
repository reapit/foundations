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
          if (!repos.includes(gitUrl[gitUrl.length - 1])) {
            repos.push(gitUrl[gitUrl.length - 1])
          }
          return repos
        }, [])
      }
    } catch (e) {
      return []
    }

    return []
  }

  async run() {
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

    const answers = await inquirer.prompt([
      ...questions,
      {
        type: 'confirm',
        message: 'Would you like to create a pipeline config in this directory?',
        name: 'create',
      },
    ])

    const spinner = ora('Creating pipeline').start()
    const response = await (await this.axios(spinner)).post<PipelineModelInterface>('/pipeline', {
      name: answers.name,
      appType: answers.appType.toLowerCase(),
      repository: answers.repository,
    }) // /deployment

    if (response.status === 200) {
      spinner.succeed(`Pipeline ${response.data.name} created`)

      if (answers.create) {
        spinner.start('Creating local pipeline config')
        fs.writeFileSync(resolve(process.cwd(), REAPIT_PIPELINE_CONFIG_FILE), JSON.stringify(response.data))
        spinner.succeed('Created local pipeline config')
      }
      console.log('Now use reapit pipeline run to start a pipeline')
    } else {
      spinner.fail('Failed to create pipeline')
      console.log(chalk.red('Check your internet connection'))
      console.log(chalk.red('Report this error if it persists'))
      process.exit(1)
    }
  }
}
