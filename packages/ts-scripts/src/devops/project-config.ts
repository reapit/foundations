import path from 'path'
import fs from 'fs/promises'
import Ajv from 'ajv'

import schema from './devops.schema.json'

const ajv = new Ajv()

type DevopsAsset = {
  devopsKey: string
  filePath: string
}

export type DevopsConfig = {
  devopsProjectName: string
  assets: DevopsAsset[]
}

const validateConfig = ajv.compile(schema)

const isValidProjectConfig = (config: any): config is DevopsConfig => validateConfig(config)

export const getProjectConfig = async (): Promise<DevopsConfig> => {
  const loc = path.resolve('devops.json')
  const contents = await fs.readFile(loc, 'utf-8')
  const projectConfig = JSON.parse(contents)
  if (isValidProjectConfig(projectConfig)) {
    return projectConfig
  }

  throw new Error('Invalid devops.json')
}
