import { Command } from './../../decorators'
import { AbstractCommand } from '../../abstract.command'
import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import AdmZip from 'adm-zip'
import ora, { Ora } from 'ora'
import chalk from 'chalk'

@Command({
  name: 'release',
  description: 'Release a simple deployment',
})
export class ReleaseCommand extends AbstractCommand {
  /**
   * bump package version
   *
   * @param version
   */
  async bumpVersion(spinner: Ora): Promise<[string, string] | never> {
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

    return [workingPackage.name, answers.version]
  }

  /**
   * create zip pack
   *
   * @returns
   */
  async pack(spinner: Ora): Promise<Buffer> {
    // TODO cp serverless + reapit.config.json to /dist
    spinner.start('packing zip file')

    if (!fs.existsSync(path.resolve(process.cwd(), 'build'))) {
      spinner.fail('Cannot find build folder')
      console.log(chalk.yellow('Be sure your project has been built'))
      console.log(chalk.yellow("And you've used reapit's react template"))
      process.exit(1)
    }

    const files = ['serverless.yml', 'package.json', 'yarn.lock', 'package-lock.json']

    const zip = new AdmZip()
    zip.addLocalFolder(path.resolve(process.cwd(), 'build'), 'build')
    files.forEach((file) => {
      if (fs.existsSync(path.resolve(process.cwd(), file))) {
        zip.addLocalFile(path.resolve(process.cwd(), file))
      }
    })

    spinner.succeed('Successfully packed project')
    return zip.toBuffer()
  }

  /**
   * send zip to reapit
   *
   */
  async sendZip(buffer: Buffer, project: string, version: string, spinner: Ora): Promise<void | never> {
    spinner.start('Sending zip')

    const response = await (
      await this.axios(spinner)
    ).post(`deploy/release/${project}/${version}`, {
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

    const [project, version] = await this.bumpVersion(spinner)
    const zip = await this.pack(spinner)
    await this.sendZip(zip, project, version, spinner)
  }
}
