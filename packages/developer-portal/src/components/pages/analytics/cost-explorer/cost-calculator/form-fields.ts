import { FormFieldInfo } from '@reapit/utils-common'

export type FieldKey = 'endpointsUsedField' | 'apiCallsField'

export const formFields: Record<FieldKey, FormFieldInfo> = {
  endpointsUsedField: {
    name: 'endpointsUsed',
  },
  apiCallsField: {
    name: 'apiCalls',
    placeHolder: 'Please enter a number',
    errorMessage: 'Invalid Monthly API calls',
  },
}
