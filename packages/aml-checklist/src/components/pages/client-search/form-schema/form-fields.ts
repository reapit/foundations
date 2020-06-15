import { FormFieldInfo } from '@reapit/elements'

type Field = 'nameField' | 'addressField' | 'identityCheckField'

const formFields: Record<Field, FormFieldInfo> = {
  nameField: {
    name: 'name',
    label: 'Search by name',
    placeHolder: 'Firstname or Surname',
  },
  addressField: {
    name: 'address',
    label: 'Search by address',
    placeHolder: 'Streetname, Village, Town or Postcode',
  },
  identityCheckField: {
    name: 'identityCheck',
    label: 'Search by ID Status',
  },
}

export default formFields
