import { SchemaModel } from './platform'

export type Context = {
  accessToken: string
  idToken: string
  apiUrl: string
  metadataSchemas: SchemaModel[]
}
