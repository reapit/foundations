import { Command } from "./../../decorators";
import { AbstractCommand } from "../../abstract.command"
import fs from 'fs'
import path from 'path'
import inquirer from "inquirer"
import AdmZip from 'adm-zip'
import chalk from "chalk";

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
  async bumpVersion(): Promise<void | never> {
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

    if (workingPackage.version === answers.version) {
      console.warn(chalk.yellow('Overriding existing verison: rollback disabled'))
    }

    workingPackage.version = answers.version

    await fs.promises.writeFile(fileName, JSON.stringify(workingPackage, null, 2))
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

    const zip = new AdmZip()
    zip.addLocalFolder(path.resolve(process.cwd(), 'dist'))
    return zip.toBuffer()
  }

  /**
   * send zip to reapit
   * 
   */
  async sendZip(buffer: Buffer): Promise<void | never> {
    await (await this.axios()).post(`deployment/release`, buffer)
  }

  /**
   * Run command
   */
  async run () {
    await this.bumpVersion()
    const zip = await this.pack()
    await this.sendZip(zip)
  }
}
