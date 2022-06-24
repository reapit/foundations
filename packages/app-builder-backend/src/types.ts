import { CustomEntity } from './entities/custom-entity'
import { MetadataSchemaType } from './utils/extract-metadata'

export type Context = {
  accessToken: string
  idToken: string
  apiUrl: string
  customEntities: CustomEntity[]
  appId?: string
  webUrl: string
  operationMetadata: Record<MetadataSchemaType, any>
  storeCachedMetadata: (typeName: MetadataSchemaType, id: string, metadata: any) => void
  getCachedMetadata: (typeName: MetadataSchemaType, id: string, key: string) => any
}
