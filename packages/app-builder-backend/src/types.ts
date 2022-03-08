import { CustomEntity } from './entities/custom-entity'
import { MetadataSchemaType } from './utils/extract-metadata'

export type Context = {
  accessToken: string
  idToken: string
  apiUrl: string
  customEntities: CustomEntity[]
  appId?: string
  operationMetadata: Record<MetadataSchemaType, any>
}
