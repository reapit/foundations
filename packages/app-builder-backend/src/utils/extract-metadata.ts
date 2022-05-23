import { Context } from '../types'

export type MetadataSchemaType =
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
  | 'propertyImage'
  | 'task'
  | 'vendor'
  | 'worksOrder'

const metadataTypes = [
  'applicant',
  'appointment',
  'company',
  'contact',
  'conveyancing',
  'identityCheck',
  'landlord',
  'negotiator',
  'offer',
  'office',
  'property',
  'propertyImage',
  'task',
  'vendor',
  'worksOrder',
]

export const isIdEntityType = (id: string): id is MetadataSchemaType => {
  return metadataTypes.includes(id)
}

export const extractMetadata = <T>(
  context: Context,
  metadataSchemaType: MetadataSchemaType,
  object: T,
): T & { metadata?: any } => {
  const metadataFields = context.customEntities.find(
    (metadataSchema) => metadataSchema.id.toLowerCase() === metadataSchemaType,
  )

  if (!metadataFields) {
    return object
  }

  const metadata = {}

  metadataFields.fields.forEach((field) => {
    metadata[field.name] = object[field.name]
    delete object[field.name]
  })

  return { ...object, metadata }
}
