import { Context } from '../types'

type MetadataSchemaType =
  | 'applicant'
  | 'appointment'
  | 'company'
  | 'contact'
  | 'conveyancing'
  | 'identityCheck'
  | 'landlord'
  | 'negotiator'
  | 'offer'
  | 'office'
  | 'property'
  | 'task'
  | 'vendor'
  | 'worksOrder'

export const extractMetadata = <T>(
  context: Context,
  metadataSchemaType: MetadataSchemaType,
  object: T,
): T & { metadata?: any } => {
  const metadataFields = context.metadataSchemas.find(
    (metadataSchema) => metadataSchema.id === metadataSchemaType,
  )?.schema

  if (!metadataFields) {
    return object
  }

  const metadata = {}

  const fields = Object.keys(JSON.parse(metadataFields).properties)
  fields.forEach((field) => {
    metadata[field] = object[field]
    delete object[field]
  })

  return { ...object, metadata }
}
