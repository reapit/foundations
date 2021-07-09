import { Command, Param } from './../../decorators'
import { AbstractCommand } from '../../abstract.command'
import fs from 'fs'
import path from 'path'
import ora, { Ora } from 'ora'
import chalk from 'chalk'

@Command({
  name: 'version',
  description: 'Release a specific version previously uploaded',
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
  async deployVersion(project: string, version: string, spinner: Ora): Promise<void | never> {
    const response = await (await this.axios(spinner)).post(`/deploy/version/${project}/${version}`)

    if (response.status !== 200) {
      let message: string
      switch (response.status) {
        case 404:
          message = `version [${version}] was not found for project ${project}`
          break
        default:
          message = `Unexpected error [${response.status}]`
      }

      spinner.fail(message)
      process.exit(1)
    }

    spinner.succeed(`Successfully deployed version [${version}] on reapit cloud`)
  }

  /**
   * Run command
   */
  async run(
    @Param({
      name: 'version',
      description: 'specific version to deploy',
    })
    version,
  ) {
    const spinner = ora()
    spinner.start(`Deploying verison [${version}]`)
    spinner.info('Obtaining project info')

    const projectInfo = await this.projectInfo()

    if (!projectInfo || !projectInfo.name) {
      spinner.fail('Project not found')
      process.exit(1)
    }

    if (!version) {
      this.writeLine(chalk.red('Error: Version param required'))
      this.writeLine('')
      this.writeLine(
        `use ${chalk.bgGreen.black('reapit deploy list')} to view your projects avaiable versions to deploy`,
      )

      process.exit(1)
    }

    spinner.info(`Project found ${projectInfo.name}`)
    spinner.start(`Deploying [${version}]`)

    await this.deployVersion(projectInfo.name, version, spinner)
  }
}
