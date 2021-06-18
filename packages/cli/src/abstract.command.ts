import { ReapitCliConfigResolve, resolveConfig } from './utils'
import axios, { AxiosInstance } from 'axios'
import { CommandOptions, COMMAND_OPTIONS, ARGUMENT_OPTIONS, ArgsType } from './decorators'
import chalk from 'chalk'
import { Ora } from 'ora'
import { resolve } from 'path'
import * as fs from 'fs'

export interface Command {
  run(): Promise<any> | any
}

export abstract class AbstractCommand {
  protected baseUrl: string = 'https://h2r8e8wbd4.execute-api.eu-west-2.amazonaws.com/dev/'

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
  protected async axios(spinner?: Ora): Promise<AxiosInstance> {
    const config = await this.getConfig()

    if (!config || !config.config) {
      console.log(chalk.red('No config found. Please use the config command before running this command'))
      spinner?.stop()
      process.exit(1)
    }

    const instance = axios.create({
      baseURL: config?.config?.baseUrl || this.baseUrl,
      headers: {
        'x-api-key': config.config['api-key'],
        'Content-Type': 'application/json',
      },
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

  printConfig(parent?: AbstractCommand) {
    const config: CommandOptions = Reflect.getOwnMetadata(COMMAND_OPTIONS, this.constructor)
    const args: ArgsType[] | undefined = Reflect.getOwnMetadata(ARGUMENT_OPTIONS, this.constructor)

    this.writeLine(`${chalk.bold.white(config.name)}\t${config.description}`, parent ? 2 : 1, '  ')
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

    // console.log(`
    // ${parent ? '\t' : ''}${chalk.bold.white(config.name)}\t${config.description}
    // ${parent ? '\t' : ''}$ ${chalk.green('reapit')} ${
    //   parent ? `${chalk.whiteBright(parent.commandOptions.name)} ` : ''
    // }${chalk.white(config.name)} ${
    //   !Array.isArray(args)
    //     ? ''
    //     : args
    //         .filter((arg) => arg.type === 'parameter')
    //         .map((arg) => chalk.white(`{${arg.name}}`))
    //         .join(' ')
    // } ${
    //   !Array.isArray(args)
    //     ? ''
    //     : args
    //         .filter((arg) => arg.type === 'option')
    //         .map((arg) => `[--${arg.name}${arg.shortName ? `|-${arg.shortName}` : ''}]`)
    //         .join(' ')
    // }
    // `)
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
}
