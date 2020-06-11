import { IdentityDocumentModel } from '@reapit/foundations-ts-definitions'
import { PartialRecord } from '@reapit/elements'

export type IdentificationFormErrorKeys = 'documentId'

export const validate = (values: IdentityDocumentModel) => {
  const errors: PartialRecord<IdentificationFormErrorKeys, string> = {}
  if (values.documentId && values.documentId.indexOf('data:image') < 0) {
    errors.documentId = 'Wrong file type'
  }
  return errors
}
