import { FormFieldInfo } from '@reapit/elements'

type Field = 'typeIdField' | 'detailsField' | 'expiryField' | 'documentIdField'

const formFields: Record<Field, FormFieldInfo> = {
  typeIdField: {
    name: 'typeId',
    label: 'ID Type',
  },
  detailsField: {
    name: 'details',
    label: 'ID Reference',
    placeHolder: 'ID Reference',
  },
  expiryField: {
    name: 'expiry',
    label: 'Expiry Date',
  },
  documentIdField: {
    name: 'documentId',
    label: 'Upload File',
  },
}

export default formFields
