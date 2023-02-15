import { AbstractCommand } from './../abstract.command'
import packageInfo from './../../package.json'
import chalk from 'chalk'
import semver from 'semver'
import latestSemver from 'latest-semver'
import { Command } from '../decorators'

@Command({
  name: 'check-version',
  description: 'Used for checking the current version of @reapit/cli',
  show: false,
})
export class CheckVersionCommand extends AbstractCommand {
  async fetchTags(): Promise<string[] | false> {
    const npmInfo = await (
      await this.axios(undefined, false)
    ).get<{
      'dist-tags': { [s: string]: string }
    }>(packageInfo.name, {
      baseURL: 'https://registry.npmjs.org/',
      headers: {
        Accept: 'application/vnd.npm.install-v1+json',
      },
    })

    if (npmInfo.status !== 200) {
      return false
    }

    return Object.values(npmInfo.data['dist-tags'])
  }

  async run() {
    const availableVersions = await this.fetchTags()

    if (!Array.isArray(availableVersions)) {
      // kill silently
      // npm not available
      return
    }

    const latest = latestSemver(availableVersions) as string

    const diff = semver.diff(packageInfo.version, latest)

    if (diff && ['major', 'premajor', 'minor'].includes(diff)) {
      this.writeLine(chalk.yellow(`Newer version of ${packageInfo.name} is available!`))
      this.writeLine(chalk.greenBright(`${packageInfo.version} => ${latest}`))
      this.writeLine(
        `${chalk.yellow('You can update with the following command')} ${chalk.bgGreenBright.black(
          'npm update -g @reapit/cli',
        )}`,
      )
      this.writeLine('')
    }
  }
}
