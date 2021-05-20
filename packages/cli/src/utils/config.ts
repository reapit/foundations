import * as fs from 'fs'
import { resolve } from 'path'

const fileName = 'reapit-cli.json'

export type ReapitCliConfig = {
  authKey: string
  baseUrl?: string
}

const findConfig = async (relativePath: string): Promise<false | ReapitCliConfig> => {
  if (!fs.existsSync(resolve(relativePath, fileName))) return Promise.resolve(false)

  const config = await fs.promises.readFile(resolve(relativePath, fileName), 'utf-8')

  return JSON.parse(config)
}

export const resolveConfig = async (): Promise<false | {config: ReapitCliConfig; from: 'project' | 'global'}> => {
  const configs = await Promise.all([
    findConfig(process.cwd()),
    findConfig(resolve('~')),
  ])

  if (configs[0] !== false) return { config: configs[0], from: 'project' }
  return (configs[1] !== false) ? { config: configs[1], from: 'global' } : false
}

export const createConfig = async (path: string, config: ReapitCliConfig): Promise<void> => {
  fs.writeFileSync(resolve(path, fileName), JSON.stringify(config), {
    encoding: 'utf-8',
  });
}
