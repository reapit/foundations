import { Command } from '../../decorators'
import { AbstractCommand } from '../../abstract.command'
import fs from 'fs'
import path from 'path'
import ora, { Ora } from 'ora'
import chalk from 'chalk'
import { Pagination } from 'nestjs-typeorm-paginate'
import { PipelineModelInterface, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import { REAPIT_PIPELINE_CONFIG_FILE } from '../pipeline/constants'
import inquirer from 'inquirer'
import { shleemy } from 'shleemy'
import { injectable } from 'tsyringe'

@injectable()
@Command({
  name: 'version',
  description: 'Release a specific version previously deployed',
})
export class VersionCommand extends AbstractCommand {
  async projectInfo(): Promise<{ name: string }> {
    const fileName = path.resolve(process.cwd(), 'package.json')
    const workingPackageRaw = await fs.promises.readFile(fileName, {
      encoding: 'utf-8',
    })
    if (!workingPackageRaw) {
      throw new Error('Package not found')
    }

    return JSON.parse(workingPackageRaw)
  }

  /**
   * deploy version to reapit
   *
   */
  async deployVersion(pipelineId: string, pipelineRunnerId: string, spinner: Ora): Promise<void | never> {
    const response = await (
      await this.axios(spinner)
    ).post(`pipeline/${pipelineId}/pipeline-runner/${pipelineRunnerId}/deploy`)

    if (response.status !== 201) {
      let message: string
      switch (response.status) {
        case 404:
          message = 'Selected deployment was not found'
          break
        default:
          message = `Unexpected error [${response.status}]`
      }

      spinner.fail(message)
      console.log(`Response: ${response.statusText}`)
      process.exit(1)
    }

    spinner.succeed('Successfully deployed version on reapit cloud')
  }

  /**
   *
   * @param spinner
   * @param pipelineId
   * @returns
   */
  async listReleases(spinner: Ora, pipelineId: string): Promise<Pagination<PipelineRunnerModelInterface>> {
    spinner.start('Fetching releases')
    const response = await (
      await this.axios()
    ).get<Pagination<PipelineRunnerModelInterface>>(`/pipeline/${pipelineId}/pipeline-runner`)

    if (response.status !== 200) {
      spinner.fail('Failed to fetch releases')
      process.exit(1)
    }

    spinner.succeed('Fetched releases')

    return response.data
  }

  /**
   * Run command
   */
  async run() {
    const spinner = ora()
    spinner.start('Fetching previous deployments')

    const pipeline = await this.resolveConfigFile<PipelineModelInterface>(REAPIT_PIPELINE_CONFIG_FILE)

    if (!pipeline) {
      spinner.fail()
      this.writeLine(chalk.red('Pipeline config not found. Please run within a reapit pipeline enabled project'))
      process.exit(1)
    }

    const runners = await this.listReleases(spinner, pipeline.id as string)

    if (!runners.items.length) {
      spinner.fail('No previous deployments found for this pipeline')
      this.writeLine("you'll need to start a deployment before you can deploy a specific version")
      process.exit(0)
    }

    const answers = await inquirer.prompt<{ version: string }>([
      {
        name: 'version',
        type: 'list',
        message: 'Select a version to rollback to',
        choices: runners.items.map(
          (runner) =>
            `v${runner.buildVersion || '-none'} (${chalk.blue(runner.id)})[${chalk.yellow(
              shleemy(runner.created as string).forHumans,
            )}]{${runner.buildStatus}}${runner.currentlyDeployed ? ' (currently deployed)' : ''}`,
        ),
      },
    ])

    if (!answers.version) {
      this.writeLine(chalk.red('Error: Version required'))

      process.exit(1)
    }

    spinner.info(`Deploying version [${answers.version}]`)
    spinner.start('Deploying...')

    const version = runners.items.find((runner) => answers.version.includes(runner.id as string))

    if (version?.currentlyDeployed) {
      spinner.fail('Cannot deploy, currently deployed release')
      process.exit(1)
    }

    if (!version) {
      spinner.fail('Version not found. Please report to reapit')
      process.exit(1)
    }

    await this.deployVersion(pipeline.id as string, version.id as string, spinner)
  }
}
