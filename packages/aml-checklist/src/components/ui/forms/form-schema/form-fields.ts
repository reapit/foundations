import { FormFieldInfo } from '@reapit/elements'

type Field = 'typeId' | 'details' | 'expiry' | 'documentId'

const formFields: Record<Field, FormFieldInfo> = {
  typeId: {
    name: 'typeId',
    label: 'ID Type',
  },
  details: {
    name: 'details',
    label: 'ID Reference',
    placeHolder: 'ID Reference',
  },
  expiry: {
    name: 'expiry',
    label: 'Expiry Date',
  },
  documentId: {
    name: 'documentId',
    label: 'Upload File',
  },
}

export default formFields
