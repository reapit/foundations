import * as Yup from 'yup'
import errorMessages from '@/constants/error-messages'
import { FormFieldInfo, reapitRefRegex } from '@reapit/utils'

export type FieldKey = 'status' | 'reapitReference'
export const formFields: Record<FieldKey, FormFieldInfo> = {
  status: {
    name: 'status',
    label: 'Status',
  },
  reapitReference: {
    name: 'reapitReference',
    label: 'Reapit Reference',
    placeHolder: 'Please enter reference',
    errorMessage: 'Reapit Reference must be 6 characters, e.g. "HJP092"',
  },
}

const { status, reapitReference } = formFields

export const validationSchema = Yup.object().shape({
  [status.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED),
  [reapitReference.name]: Yup.string()
    .trim()
    .when(status.name, {
      is: val => val == 'confirmed',
      then: Yup.string()
        .required(errorMessages.FIELD_REQUIRED)
        .matches(reapitRefRegex, reapitReference.errorMessage),
    }),
})
