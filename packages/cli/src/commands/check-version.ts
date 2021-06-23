import { AbstractCommand } from './../abstract.command'
import packageInfo from './../../package.json'
import chalk from 'chalk'

export class CheckVersionCommand extends AbstractCommand {
  async fetchTags(): Promise<number[] | false> {
    const npmInfo = await (await this.axios()).get<{
      'dist-tags': { [s: string]: string }
    }>(packageInfo.name, {
      baseURL: 'https://registry.npmjs.org/',
      headers: {
        Accept: 'application/vnd.npm.install-v1+json',
      }
    })

    if (npmInfo.status !== 200) {
      return false
    }

    return Object.values(npmInfo.data['dist-tags']).map((tag) => Number(tag.split('.').join('')))
  }

  async run() {
    const availableVersions = await this.fetchTags()

    if (!Array.isArray(availableVersions)) {
      // kill silently
      // npm not available
      return
    }

    const packageNumber = Number(packageInfo.version.split('.').join(''))

    if (Math.ceil(packageNumber / 10) < Math.ceil(availableVersions[0] / 10)) {
      this.writeLine(chalk.yellow(`Newer version of ${packageInfo.name} is available!`))
      this.writeLine(`${chalk.yellow('You can update using')} ${chalk.bgGreenBright.black('npm update -g @reapit/cli')}`)
    }
  }
}
