import * as fs from 'fs'
import { resolve } from 'path'
import { CLI_CONFIG_FILENAME } from './../constants'

export type ReapitCliConfig = {
  ['api-key']: string
  baseUrl?: string
}

export type ReapitCliConfigResolve = {
  config: ReapitCliConfig
  from: 'project' | 'global'
}

/**
 * Resolves given config path
 *
 * @param relativePath
 * @returns
 */
const findConfig = async (relativePath: string): Promise<false | ReapitCliConfig> => {
  if (!fs.existsSync(resolve(relativePath, CLI_CONFIG_FILENAME))) return Promise.resolve(false)

  const config = await fs.promises.readFile(resolve(relativePath, CLI_CONFIG_FILENAME), 'utf-8')

  return JSON.parse(config)
}

/**
 * resolves local or global cli config
 *
 * @returns ReapitCliConfig | false
 */
export const resolveConfig = async (): Promise<false | ReapitCliConfigResolve> => {
  const configs = await Promise.all([findConfig(process.cwd()), findConfig(homeDir())])

  if (configs[0] !== false) return { config: configs[0], from: 'project' }
  return configs[1] !== false ? { config: configs[1], from: 'global' } : false
}

/**
 * Create config file
 *
 * @param path
 * @param config
 */
export const createConfig = async (path: string, config: ReapitCliConfig): Promise<void> => {
  fs.writeFileSync(resolve(path, CLI_CONFIG_FILENAME), JSON.stringify(config), {
    encoding: 'utf-8',
  })
}

export const homeDir = (): string => process.env.HOME || process.env.USERPROFILE || ''
