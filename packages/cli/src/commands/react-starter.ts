import { Command, Param } from './../decorators'
import { AbstractCommand } from './../abstract.command'
import { exec } from 'child_process'
import ora, { Ora } from 'ora'
import chalk from 'chalk'

type ReapitConfig = {
  connectClientId: string
  connectUserPoolId: string
  [s: string]: any
}


@Command({
  name: 'react-template',
  description: 'Creates a Reapit react app template setup',
})
export class ReactStarterCommand extends AbstractCommand {
  async createReactApp(spinner: Ora, name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      spinner.start('Creating app with create-react-app')
      exec(
        `npx create-react-app ${name} --template @reapit/cra-template-foundations`,
        { maxBuffer: 1024 * 10000 },
        (err) => {
          if (err !== null) {
            console.error(err)
            spinner.stop()
            reject()
          }
          spinner.stop()
          resolve()
        },
      )
    })
  }

  /**
   * Update the reapit.config.json file in the react template
   * 
   * @param path 
   * @param clientId 
   * @param userPool 
   */
  protected async updateConfigValues(
    path: string,
    clientId: string,
    userPool: string,
  ): Promise<void | never> {
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

    try {
      await this.createReactApp(spinner, name)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }

    spinner.start('Replacing reapit config params')

    await this.updateConfigValues(name, clientId, userPool)

    spinner.succeed('Finished param config setup')

    console.log(`


    ${chalk.green('Happy hacking commrade!')}

      cd into ${name} and start coding!

      If you use visual studio, use \`code ${name}\`
    `)
  }
}
