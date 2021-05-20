import * as fs from 'fs'
import * as path from 'path'

type ReapitCliConfig = {
  authKey: string
  baseUrl?: string
}

const findConfig = async (relativePath: string): Promise<false | ReapitCliConfig> => {
  const fileName = 'reapit-cli.json'

  if (!fs.existsSync(path.resolve(relativePath, fileName))) return Promise.resolve(false)

  const config = await fs.promises.readFile(path.resolve(relativePath, fileName), 'utf-8')

  return JSON.parse(config)
}

export const resolveConfig = async (): Promise<false | {config: ReapitCliConfig; from: 'project' | 'global'}> => {
  const configs = await Promise.all([
    findConfig(process.cwd()),
    findConfig(path.resolve('~')),
  ])

  if (configs[0] !== false) return { config: configs[0], from: 'project' }
  return (configs[1] !== false) ? { config: configs[1], from: 'global' } : false
}
