import { ContactModel } from '@reapit/foundations-ts-definitions'
import { PartialRecord } from '@reapit/elements'
import { validate, AddressInformationFormErrorKeys } from '../address-information'

type InputOutput = [
  Pick<ContactModel, 'primaryAddress' | 'secondaryAddress' | 'metadata'>,
  PartialRecord<AddressInformationFormErrorKeys, string | {}>,
]

const invalidValues: InputOutput[] = [
  [
    {
      metadata: {
        primaryAddress: {
          documentImage: 'data:application/pdf;base64,iVBORw0KGgoAAAANSUhEUg',
        },
      },
    },
    {
      metadata: {
        primaryAddress: {
          documentImage: 'Wrong file type',
        },
      },
    },
  ],
  [
    {
      metadata: {
        secondaryAddress: {
          documentImage: 'data:video/quicktime;base64,AAAAFGZ0eXBxdCAgAAAAAH',
        },
      },
    },
    {
      metadata: {
        secondaryAddress: {
          documentImage: 'Wrong file type',
        },
      },
    },
  ],
]

const validValues: Pick<ContactModel, 'primaryAddress' | 'secondaryAddress' | 'metadata'>[] = [
  {
    metadata: {
      primaryAddress: {
        documentImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABS8A',
      },
    },
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
