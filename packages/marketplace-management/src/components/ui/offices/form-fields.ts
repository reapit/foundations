import { FormFieldInfo } from '@reapit/utils-common'

export type FieldType = 'name' | 'officeIds'

export const formFields: Record<FieldType, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'Name',
  },
  officeIds: {
    name: 'officeIds',
    label: 'Offices (Type to search)',
  },
}
