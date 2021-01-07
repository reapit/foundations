import { FormFieldInfo } from '@reapit/utils'

export type FieldType = 'name' | 'officeIds'

export const formFields: Record<FieldType, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'Name',
  },
  officeIds: {
    name: 'officeIds',
    label: 'Offices',
  },
}
