import { ReapitCliConfigResolve, resolveConfig } from './utils'
import axios, { AxiosInstance } from 'axios'
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

  async axios(): Promise<AxiosInstance> {
    // TODO get login creds from config or whatever is required
    const config = await this.getConfig()

    if (!config || !config.config) {
      console.log(chalk.red('No config found. Please use the config command before running this command'))
      throw new Error()
    }

    const instance = axios.create({
      baseURL: config ? config.config.baseUrl : 'https://developer.reapit.com/',
      headers: {
        'x-api-key': config.config['api-key'],
        'Content-Type': 'application/json',
      },
    })

    instance.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      return Promise.resolve(error)
    })
  
    instance.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      return Promise.resolve(error)
    })

    return instance
  }

  printConfig() {
    const config: CommandOptions = Reflect.getOwnMetadata(COMMAND_OPTIONS, this.constructor)
    console.log(`
      ${chalk.bold.white(config.name)}
      ${config.description}
    `)
  }
}
