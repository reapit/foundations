import { FormFieldInfo } from '@reapit/utils'

type Field = 'customers' | 'properties' | 'description'

export const formFields: Record<Field, FormFieldInfo> = {
  customers: {
    name: 'customers',
    label: 'Customers',
  },
  properties: {
    name: 'properties',
    label: 'Properties',
  },
  description: {
    name: 'description',
    label: 'Description',
  },
}

export default formFields
