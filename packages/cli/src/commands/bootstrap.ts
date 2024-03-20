import { Command, Param } from '../decorators'
import { AbstractCommand } from '../abstract.command'
import { spawn } from 'child_process'
import ora, { Ora } from 'ora'
import chalk from 'chalk'
import fs from 'fs'
import { injectable } from 'tsyringe'

type ReapitConfig = {
  connectClientId: string
  connectUserPoolId: string
  [s: string]: any
}

@injectable()
@Command({
  name: 'bootstrap',
  description: 'Create application templates to start a new project',
})
export class BootstrapCommand extends AbstractCommand {
  async checkFolderExists(path: string, spinner: Ora): Promise<void | never> {
    if (fs.existsSync(path)) {
      spinner.fail(`Folder already exists [${path}]`)
      process.exit(1)
    }
  }

  async createReactApp(spinner: Ora, name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      spinner.start('Creating app with create-react-app (this might take a while)')
      const proc = spawn('npx', ['degit', 'reapit/foundations-react-vite-template', name], {
        shell: true,
      })
      proc.stdout.on('data', (data) => console.log(data.toString()))
      proc.stderr.on('data', (data) => console.log(data.toString()))

      proc.on('error', (error) => {
        console.error(error)
        reject(error)
      })

      proc.on('close', () => {
        resolve()
      })
    })
  }

  private async reactBoostrap(spinner: Ora, name: string, clientId: string, userPool: string) {
    try {
      await this.createReactApp(spinner, name)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }

    spinner.start('Replacing reapit config params')

    await this.updateConfigValues(name, clientId, userPool)

    spinner.info('Finished param config setup')

    console.log(`


    ${chalk.green('Happy hacking commrade!')}

      cd into ${name} and start coding!

      If you use visual studio, use \`code ${name}\`
    `)
  }

  private async nodeBootstrap() {
    this.writeLine(chalk.red('Unfortunately, bootstrap node has not yet been implemented'))
  }

  /**
   * Update the reapit.config.json file in the react template
   *
   * @param path
   * @param clientId
   * @param userPool
   */
  protected async updateConfigValues(path: string, clientId: string, userPool: string): Promise<void | never> {
    const reapitConfig = await this.resolveConfigFile<ReapitConfig>(`${path}/src/reapit.config.json`)

    if (!reapitConfig) {
      throw new Error('file not found')
    }

    reapitConfig.connectClientId = clientId
    reapitConfig.connectUserPoolId = userPool

    await this.writeConfigFile(`${path}/src/reapit.config.json`, reapitConfig)
  }

  async run(
    @Param({
      name: 'name',
      required: true,
    })
    name: string,
    @Param({
      name: 'type',
      required: true,
    })
    type: string,
    @Param({
      name: 'clientId',
      required: true,
    })
    clientId: string,
    @Param({
      name: 'userPool',
      required: true,
    })
    userPool: string,
  ) {
    const spinner = ora()

    await this.checkFolderExists(name, spinner)

    if (type === 'react') {
      await this.reactBoostrap(spinner, name, clientId, userPool)
      return
    } else if (type === 'node') {
      await this.nodeBootstrap()
      return
    }

    this.writeLine('Only [react] or [node] are accepted bootstrap types')
    process.exit(127)
  }
}
