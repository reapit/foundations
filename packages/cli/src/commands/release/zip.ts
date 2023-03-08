import { Command, Optional, Param } from '../../decorators'
import { AbstractCommand } from '../../abstract.command'
import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import AdmZip from 'adm-zip'
import ora, { Ora } from 'ora'
import chalk from 'chalk'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { REAPIT_PIPELINE_CONFIG_FILE } from '../pipeline/constants'
import { injectable } from 'tsyringe'

@injectable()
@Command({
  name: 'zip',
  description: 'Start a deployment from a zip (zipped from a local build)',
})
export class ZipCommand extends AbstractCommand {
  /**
   * bump package version
   *
   * @param version
   */
  async bumpVersion(spinner: Ora, auto: boolean = false): Promise<string | never> {
    const fileName = path.resolve(process.cwd(), 'package.json')
    const workingPackageRaw = await fs.promises.readFile(fileName, {
      encoding: 'utf-8',
    })
    if (!workingPackageRaw) {
      spinner.fail('Working package.json not found. Please run in a javascript application')
      process.exit(1)
    }

    const workingPackage = JSON.parse(workingPackageRaw)
    let newPackageVersion: string

    if (!auto) {
      const preBuild = await inquirer.prompt<{ built: boolean }>([
        {
          type: 'confirm',
          message: 'Have you built your application before deploying?',
          name: 'built',
        },
      ])

      if (!preBuild.built) {
        this.writeLine(chalk.red('Please build your application before deploying a new version'))
        process.exit(1)
      }
      const answers = await inquirer.prompt<{ version: string }>([
        {
          type: 'input',
          message: 'Next release version',
          name: 'version',
          default: workingPackage.version,
        },
      ])
      newPackageVersion = answers.version
    } else {
      const versionParts = workingPackage.version.split('.').map((part) => parseInt(part))
      versionParts[versionParts.length - 1] += 1
      newPackageVersion = versionParts.join('.')
    }

    spinner.start('bumping package version')

    return newPackageVersion
  }

  updatePackageVersion = async (version: string, spinner: Ora) => {
    const fileName = path.resolve(process.cwd(), 'package.json')
    const workingPackageRaw = await fs.promises.readFile(fileName, {
      encoding: 'utf-8',
    })

    const workingPackage = JSON.parse(workingPackageRaw)

    const prevVersion = workingPackage.version

    workingPackage.version = version

    await fs.promises.writeFile(fileName, JSON.stringify(workingPackage, null, 2))
    spinner.succeed(`bumped package version ${prevVersion} -> ${version}`)
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
    zip.addLocalFolder(path.resolve(process.cwd(), pipeline.outDir as string))

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
    ).post(`pipeline/${pipeline.id}/pipeline-runner/release/${version}`, {
      file: buffer.toString('base64'),
    })

    if (response.status !== 201) {
      spinner.fail('Failed to publish zip to reapit')
      console.log(`Response: ${response.statusText}`)
      process.exit(1)
    }

    spinner.succeed('Successfully published to reapit')
    const url = `https://${pipeline.subDomain}.iaas.paas.reapit.cloud`
    console.log(`Check out your deployment: ${chalk.green(url)}`)
  }

  async fetchPipeline(id: string, spinner: Ora): Promise<PipelineModelInterface> {
    const response = await (await this.axios(spinner)).get<PipelineModelInterface>(`/pipeline/${id}`)

    if (response.status === 200) {
      spinner.succeed('Successfully found pipeline')
    } else {
      spinner.fail('No pipeline exists with id provided')
      console.log(`Response: ${response.statusText}`)
      process.exit(1)
    }

    return response.data
  }

  /**
   * Run command
   */
  async run(
    @Param({
      name: 'pipelineId',
      description: 'id of the pipeline to link with this dir/repo',
      required: false,
    })
    pipelineId,
    @Optional({
      shortName: 'y',
      name: 'accept',
      default: false,
    })
    accept: boolean,
  ) {
    const spinner = ora()

    const pipeline = pipelineId
      ? await this.fetchPipeline(pipelineId, spinner)
      : await this.resolveConfigFile<PipelineModelInterface>(REAPIT_PIPELINE_CONFIG_FILE)

    if (!pipeline) {
      this.writeLine(chalk.red('Pipeline config not found. Please run within a reapit pipeline enabled project'))
      process.exit(1)
    }

    const version = await this.bumpVersion(spinner, accept)
    const zip = await this.pack(spinner, pipeline)
    await this.sendZip(zip, pipeline, version, spinner)
    await this.updatePackageVersion(version, spinner)
  }
}
