import { ReapitCliConfigResolve, resolveConfig } from './utils'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { CommandOptions, COMMAND_OPTIONS, ARGUMENT_OPTIONS, ArgsType } from './decorators'
import chalk from 'chalk'
import { Ora } from 'ora'
import { resolve } from 'path'
import * as fs from 'fs'
import Pusher from 'pusher-js'
import globalConfig from '../config.json'
import { LoginService } from './services'

export interface Command {
  run(): Promise<any> | any
}

export abstract class AbstractCommand {
  protected baseUrl: string = 'https://deployments.prod.paas.reapit.cloud/api/'

  constructor(protected readonly devMode: boolean, protected readonly loginService: LoginService) {}

  get commandOptions(): CommandOptions {
    return Reflect.getOwnMetadata(COMMAND_OPTIONS, this.constructor)
  }

  get argOptions(): ArgsType[] {
    return Reflect.getOwnMetadata(ARGUMENT_OPTIONS, this.constructor)
  }

  abstract run(...params: any)

  /**
   * Get custom config file for command
   *
   * @param fileName
   * @returns
   */
  protected async resolveConfigFile<T>(fileName: string): Promise<T | false> {
    if (!fs.existsSync(resolve(process.cwd(), fileName))) return Promise.resolve(false)

    const config = await fs.promises.readFile(resolve(process.cwd(), fileName), 'utf-8')

    return JSON.parse(config) as T
  }

  /**
   * Write a custom config file
   * @param path
   * @param config
   */
  protected async writeConfigFile(path: string, config: { [s: string]: any }): Promise<void> {
    await fs.promises.writeFile(resolve(process.cwd(), path), JSON.stringify(config, null, 2), {
      encoding: 'utf8',
    })
  }

  /**
   * Resolves reapit cli config from local dir or root
   *
   * @returns
   */
  async getConfig(): Promise<ReapitCliConfigResolve | false> {
    return resolveConfig()
  }

  /**
   * Creates axios instance
   *
   * @param spinner Ora spinner for errors
   * @returns
   */
  protected async axios(spinner?: Ora, requireConfig: boolean = true): Promise<AxiosInstance> {
    const config = await this.getConfig()

    if ((!config || !config.config) && requireConfig) {
      console.log(chalk.red('No config found. Please use the config command before running this command'))
      spinner?.stop()
      process.exit(1)
    }

    if (requireConfig && config && !config?.config['api-key']) {
      this.writeLine(
        `${chalk.red('No api-key found. Please run')} ${chalk.bold.green('reapit config')} ${chalk.red(
          'and enter your api-key',
        )}`,
      )
      spinner?.stop()
      process.exit(1)
    }

    const headers = {
      'Content-Type': 'application/json',
    }

    if (requireConfig && config && config.config['api-key']) {
      headers['x-api-key'] = config.config['api-key']
    }

    const instance = axios.create({
      baseURL: requireConfig && config ? config?.config?.baseUrl : this.baseUrl,
      headers,
    })

    instance.interceptors.request.use(
      function (config) {
        return config
      },
      function (error) {
        return Promise.resolve(error)
      },
    )

    instance.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        return Promise.resolve(error)
      },
    )

    return instance
  }

  resolveAxiosResponseError(response: AxiosResponse): void {
    switch (response.status) {
      case 401:
        this.writeLine(chalk.red.bold('Api-key expired or invalid'))
        break
      case 403:
        this.writeLine(chalk.red.bold("The api-key supplied doesn't have access to the requested resource"))
        break
      case 404:
        this.writeLine(chalk.red.bold('Not Found:'))
        console.log(JSON.stringify(response.data))
        break
      case 400:
        this.writeLine(chalk.red.bold('Validation errors:'))
        console.log(JSON.stringify(response.data))
        break
      case 500:
      case 502:
        this.writeLine(chalk.red.bold('Unkown error, please report to Reapit'))
    }
  }

  printConfig({ parent, singular = false }: { parent?: AbstractCommand; singular?: boolean }) {
    const config: CommandOptions = Reflect.getOwnMetadata(COMMAND_OPTIONS, this.constructor)
    const args: ArgsType[] | undefined = Reflect.getOwnMetadata(ARGUMENT_OPTIONS, this.constructor)

    this.writeLine(
      `${parent && singular ? `${chalk.green(parent.commandOptions.name)} ` : ''}${chalk.bold.white(config.name)}\t${
        config.description
      }`,
      parent ? 2 : 1,
      '  ',
    )
    this.writeLine(
      `$ ${chalk.green('reapit')} ${parent ? `${chalk.whiteBright(parent.commandOptions.name)} ` : ''}${chalk.white(
        config.name,
      )} ${
        !Array.isArray(args)
          ? ''
          : args
              .filter((arg) => arg.type === 'parameter')
              .map((arg) => chalk.white(`{${arg.name}}`))
              .join(' ')
      } ${
        !Array.isArray(args)
          ? ''
          : args
              .filter((arg) => arg.type === 'option')
              .map((arg) => `[--${arg.name}${arg.shortName ? `|-${arg.shortName}` : ''}]`)
              .join(' ')
      }`,
      parent ? 2 : 1,
      '  ',
    )
    this.writeLine('')
  }

  protected writeLine(text: string, tabbed: number = 0, tabValue: string = '\t'): void {
    console.log(
      `${
        tabbed
          ? Array.from(Array(tabbed).keys())
              .map(() => tabValue)
              .join('')
          : ''
      }${text}`,
    )
  }

  protected async pusher(): Promise<Pusher> {
    const config = await this.getConfig()

    if (!config) {
      this.writeLine(chalk.red('Unable to fetch local config'))
      process.exit(1)
    }

    // @ts-ignore
    return new Pusher(globalConfig.PUSHER_KEY, {
      cluster: 'eu',
      authEndpoint: `${this.baseUrl}pusher/auth`,
      auth: {
        headers: {
          ['x-api-key']: config.config['api-key'],
          ['Content-Type']: 'application/json',
        },
      },
    })
  }
}
