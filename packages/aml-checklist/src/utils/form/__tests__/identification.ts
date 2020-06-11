import { IdentityDocumentModel } from '@reapit/foundations-ts-definitions'
import { PartialRecord } from '@reapit/elements'
import { validate, IdentificationFormErrorKeys } from '../identification'

type InputOutput = [IdentityDocumentModel, PartialRecord<IdentificationFormErrorKeys, string>]

const invalidValues: InputOutput[] = [
  [
    { documentId: 'data:application/pdf;base64,iVBORw0KGgoAAAANSUhEUg' },
    {
      documentId: 'Wrong file type',
    },
  ],
  [
    { documentId: 'data:video/quicktime;base64,AAAAFGZ0eXBxdCAgAAAAAH' },
    {
      documentId: 'Wrong file type',
    },
  ],
]

const validValues: IdentityDocumentModel[] = [
  {
    documentId: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABS8A',
  },
]

describe('validate', () => {
  it('invalid values', () => {
    invalidValues.forEach(([input, output]) => {
      expect(validate(input)).toEqual(output)
    })
  })

  it('valid values', () => {
    validValues.forEach(input => {
      expect(validate(input)).toEqual({})
    })
  })
})
