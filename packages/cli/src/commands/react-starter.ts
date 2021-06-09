import { Command, Param } from './../decorators'
import { AbstractCommand } from './../abstract.command'
import { exec } from 'child_process'
import ora, { Ora } from 'ora'
import chalk from 'chalk'
import * as path from 'path'

@Command({
  name: 'react-template',
  description: 'Creates a Reapit react app template setup',
})
export class ReactStarterCommand extends AbstractCommand {
  
  async createReactApp(spinner: Ora, name: string): Promise<void> {
    console.log('react')
    return new Promise((resolve, reject) => {
      console.log('inside promise')
      spinner.start('Creating app with create-react-app')
      exec(`npx create-react-app ${name} --template @reapit/cra-template-foundations`,
      {maxBuffer: 1024 * 10000},
      (err) => {
        if (err !== null) {
          console.error(err)
          spinner.stop()
          reject()
        }
        spinner.stop()
        resolve()
      })
    })
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

    spinner.succeed('Finished param config setup')

    console.log(`


    ${chalk.green('Happy hacking commrade!')}

      cd into ${name} and start coding!

      If you use visual studio, use \`code ${name}\`
    `)
  }
}
