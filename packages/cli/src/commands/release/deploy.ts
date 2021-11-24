import { Command } from '../../decorators'
import { AbstractCommand } from '../../abstract.command'
import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import AdmZip from 'adm-zip'
import ora, { Ora } from 'ora'
import chalk from 'chalk'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { REAPIT_PIPELINE_CONFIG_FILE } from '../pipeline/constants'

@Command({
  name: 'deploy',
  description: 'Deploy a simple release',
})
export class DeployCommand extends AbstractCommand {
  /**
   * bump package version
   *
   * @param version
   */
  async bumpVersion(spinner: Ora): Promise<string | never> {
    const fileName = path.resolve(process.cwd(), 'package.json')
    const workingPackageRaw = await fs.promises.readFile(fileName, {
      encoding: 'utf-8',
    })
    if (!workingPackageRaw) {
      throw new Error('Package not found')
    }

    const workingPackage = JSON.parse(workingPackageRaw)

    const answers = await inquirer.prompt([
      {
        type: 'input',
        message: 'Next release version',
        name: 'version',
        default: workingPackage.version,
      },
    ])
    spinner.start('bumping package version')

    if (workingPackage.version === answers.version) {
      spinner.warn('Overriding existing verison: rollback disabled')
    }

    const prevVersion = workingPackage.version

    workingPackage.version = answers.version

    await fs.promises.writeFile(fileName, JSON.stringify(workingPackage, null, 2))
    spinner.succeed(
      prevVersion === answers.version
        ? `Replacing current version ${answers.version}`
        : `bumped package version ${prevVersion} -> ${answers.version}`,
    )

    return answers.version
  }

  /**
   * create zip pack
   *
   * @returns
   */
  async pack(spinner: Ora, pipeline: PipelineModelInterface): Promise<Buffer> {
    spinner.start('packing zip file')
    spinner.info(`using [${pipeline.outDir}] for deployment`)

    if (!fs.existsSync(path.resolve(process.cwd(), pipeline.outDir as string))) {
      spinner.fail(`Cannot find build [${pipeline.outDir}] folder`)
      console.log(chalk.yellow('Be sure your project has been built'))
      console.log(chalk.yellow("And you've used reapit's react template"))
      process.exit(1)
    }

    const zip = new AdmZip()
    zip.addLocalFolder(path.resolve(process.cwd(), pipeline.outDir as string), '')

    spinner.succeed('Successfully packed project')
    return zip.toBuffer()
  }

  /**
   * send zip to reapit
   *
   */
  async sendZip(
    buffer: Buffer,
    pipeline: PipelineModelInterface,
    version: string,
    spinner: Ora,
  ): Promise<void | never> {
    spinner.start('Sending zip')

    const response = await (
      await this.axios(spinner)
    ).post(`release/${pipeline.id}/${version}`, {
      file: buffer.toString('base64'),
    })

    if (response.status !== 200) {
      spinner.fail('Failed to publish zip to reapit')
      process.exit(1)
    }

    spinner.succeed('Successfully published to reapit')
  }

  /**
   * Run command
   */
  async run() {
    const spinner = ora()

    const pipeline = await this.resolveConfigFile<PipelineModelInterface>(REAPIT_PIPELINE_CONFIG_FILE)

    if (!pipeline) {
      throw new Error('no pipeline config found')
    }

    const version = await this.bumpVersion(spinner)
    const zip = await this.pack(spinner, pipeline)
    await this.sendZip(zip, pipeline, version, spinner)
  }
}
