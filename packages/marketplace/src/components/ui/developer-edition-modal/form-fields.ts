import { FormFieldInfo } from '@reapit/elements'

// values to populate to form
export type FieldKeys = 'developerList'

export type FormFields = Record<FieldKeys, FormFieldInfo>

export const formFields: FormFields = {
  developerList: {
    name: 'developerList',
    placeHolder: 'Developer List',
  },
}

// values when submit form
export type FormValues = {
  developerList: string[]
}
