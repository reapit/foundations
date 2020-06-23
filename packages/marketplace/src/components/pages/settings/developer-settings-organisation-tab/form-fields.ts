import errorMessages from '@/constants/error-messages'

import { FormFieldInfo } from '@reapit/elements'

export type FieldKeys = 'name' | 'officeEmail'
export type FormFields = Partial<Record<FieldKeys, string>>

export const formFields: Record<FieldKeys, FormFieldInfo> = {
  name: {
    name: 'name',
  },
  officeEmail: {
    name: 'officeEmail',
  },
}
