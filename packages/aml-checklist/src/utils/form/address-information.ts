import { ContactModel } from '@reapit/foundations-ts-definitions'
import { PartialRecord } from '@reapit/elements'

export type AddressInformationFormErrorKeys = 'metadata'

export const validate = (values: Pick<ContactModel, 'primaryAddress' | 'secondaryAddress' | 'metadata'>) => {
  const errors: PartialRecord<AddressInformationFormErrorKeys, String | {}> = {}
  if (
    values.metadata?.primaryAddress?.documentImage &&
    values.metadata?.primaryAddress?.documentImage.indexOf('data:image') < 0
  ) {
    errors.metadata = {
      primaryAddress: {
        documentImage: 'Wrong file type',
      },
    }
  }

  if (
    values.metadata?.secondaryAddress?.documentImage &&
    values.metadata?.secondaryAddress?.documentImage.indexOf('data:image') < 0
  ) {
    errors.metadata = {
      secondaryAddress: {
        documentImage: 'Wrong file type',
      },
    }
  }

  return errors
}
