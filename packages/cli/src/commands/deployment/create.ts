import { AbstractCommand } from '../../abstract.command'
import { Command } from '../../decorators'
import { DeploymentModelInterface } from '@reapit/foundations-ts-definitions'
import inquirer from 'inquirer'
import ora from 'ora'
import chalk from 'chalk'
import * as fs from 'fs'
import { resolve } from 'path'
import git from 'simple-git'

@Command({
  name: 'create',
  description: 'Create a deployment',
})
export class DeploymentCreate extends AbstractCommand {

  private async fetchGitRemotes(): Promise<string[]> {
    try {
      const repositories = await git().remote(['-v'])
      if (repositories) {
        return repositories.split('\n').reduce<string[]>((repos: string[], repo: string) => {
          const urlParts = repo.split(' ')
          if (!repos.includes(urlParts[0])) {
            repos.push(urlParts[0])
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

    const questions = [
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
        type: "list",
        message: "Please enter your repository",
        name: "repository",
        choices: repositories,
      })
    }

    const answers = await inquirer.prompt([
      ...questions,
      {
        type: 'confirm',
        message: 'Would you like to create a deployment config in this directory?',
        name: 'create',
      },
    ])

    const spinner = ora('Creating deployment').start()
    const response = await (await this.axios()).post<DeploymentModelInterface>('/deployment', {
      name: answers.name,
      appType: answers.appType.toLowerCase(),
      repository: answers.repository,
    }) // /deployment

    if (response.status === 200) {
      spinner.succeed(`Successfully created deployment [${response.data.id}]`)

      if (answers.create) {
        spinner.start('Creating local deployment config')
        fs.writeFileSync(resolve(process.cwd(), 'reapit-deployment.json'), JSON.stringify(response.data))
        spinner.succeed('Created local deployment config')
      }
    } else {
      spinner.fail('Failed to create deployment')
      console.log(chalk.red('Check your internet connection'))
      console.log(chalk.red('Report this error if it persists'))
      process.exit(1)
    }
  }
}
