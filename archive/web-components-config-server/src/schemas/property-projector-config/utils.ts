import { PropertyProjectorConfig } from './schema'

export const generateSchemaItem = (data: Partial<PropertyProjectorConfig>) =>
  Object.assign(new PropertyProjectorConfig(), { ...data })
