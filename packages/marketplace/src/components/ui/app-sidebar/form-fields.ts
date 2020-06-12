import { FormFieldInfo } from '@reapit/elements'

export type FieldKeys = 'search' | 'searchBy'
export type FormFields = Partial<Record<FieldKeys, string>>

export const formFields: Record<FieldKeys, FormFieldInfo> = {
  search: {
    name: 'search',
    errorMessage: 'Invalid input',
  },
  searchBy: {
    name: 'searchBy',
    errorMessage: 'Invalid searchBy input',
  },
}
