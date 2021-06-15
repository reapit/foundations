import { Command } from './../../decorators'
import { AbstractCommand } from '../../abstract.command'
import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import AdmZip from 'adm-zip'
import chalk from 'chalk'
import ora, { Ora } from 'ora'
var FormData = require('form-data')

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
      console.warn(chalk.yellow('Overriding existing verison: rollback disabled'))
    }

    workingPackage.version = answers.version

    await fs.promises.writeFile(fileName, JSON.stringify(workingPackage, null, 2))
    spinner.succeed('bumping package version')

    return [workingPackage.name, answers.version]
  }

  /**
   * create zip pack
   *
   * @returns
   */
  async pack(): Promise<Buffer> {
    // TODO cp serverless + reapit.config.json to /dist

    if (!fs.existsSync(path.resolve(process.cwd(), 'dist'))) {
      throw new Error('Dist not found. Be sure to build in the dist dir')
    }

    const files = ['serverless.yml', 'package.json', 'yarn.lock', 'package-lock.json']

    const zip = new AdmZip()
    zip.addLocalFolder(path.resolve(process.cwd(), 'dist'))
    files.forEach(file => {
      if (fs.existsSync(path.resolve(process.cwd(), file))) {
        zip.addLocalFile(path.resolve(process.cwd(), file))
      }
    })
    return zip.toBuffer()
  }

  /**
   * send zip to reapit
   *
   */
  async sendZip(buffer: Buffer, project: string, version: string, spinner: Ora): Promise<void | never> {
    spinner.start('Sending zip')
    const form = new FormData()
    form.append('file', buffer.toString())

    const response = await (await this.axios()).post(`deploy/release/${project}/${version}`, form, {
      headers: form.getHeaders(),
    })

    if (response.status !== 200) {
      spinner.fail('Failed to publish zip to reapit')
    }

    spinner.succeed('Successfully published to reapit')
  }

  /**
   * Run command
   */
  async run() {
    const spinner = ora()

    const [project, version] = await this.bumpVersion(spinner)
    spinner.start('packing zip file')
    const zip = await this.pack()
    spinner.succeed('Created zip')
    await this.sendZip(zip, project, version, spinner)
  }
}
