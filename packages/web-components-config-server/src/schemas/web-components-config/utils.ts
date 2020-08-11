import { WebComponentConfig } from './schema'

export const generateSchemaItem = (data: Partial<WebComponentConfig>) =>
  Object.assign(new WebComponentConfig(), { ...data })
