import { ReapitCliConfigResolve, resolveConfig } from './utils'
import axios from 'axios'
import { CommandOptions, COMMAND_OPTIONS } from './decorators'
import chalk from 'chalk'

export interface Command {
  run(): Promise<any> | any
}

export abstract class AbstractCommand {
  abstract run(params: { [s: string]: any }, options: unknown)

  async getConfig(): Promise<ReapitCliConfigResolve | false> {
    return resolveConfig()
  }

  async axios() {
    // TODO get login creds from config or whatever is required
    const config = await this.getConfig();

    if (!config || !config.config) {
      console.log(chalk.red('No config found. Please use the config command before running this command'))
      throw new Error()
    }

    return axios.create({
      baseURL: config ? config.config.baseUrl : 'https://developer.reapit.com/',
      headers: {
        'reapit-customer': config.config['customer'], // TODO get these from config etc
        'reapit-connect-token': config.config['connect-token'], // TODO get these from config etc
      },
    })
  }



  printConfig() {
    const config: CommandOptions = Reflect.getOwnMetadata(COMMAND_OPTIONS, this.constructor)
    console.log(`
      ${chalk.white(config.name)}
      ${config.description}
    `)
  }
}
