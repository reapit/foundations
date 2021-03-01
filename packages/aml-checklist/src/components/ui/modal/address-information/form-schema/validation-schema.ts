import * as Yup from 'yup'
import errorMessages from '@/constants/error-messages'
import { isValidUploadForm } from '@/utils/validates'
import formFields from './form-fields'

const { FIELD_REQUIRED } = errorMessages
const secondaryAddressFields = formFields('secondaryAddress')

/* istanbul ignore next */
const validationSchema = Yup.object().shape({
  metadata: Yup.object().shape({
    primaryAddress: Yup.object().shape({
      documentImage: Yup.string()
        .required(FIELD_REQUIRED)
        .test('isValidBase64', 'Wrong file type', (value) => isValidUploadForm(value as string)),
    }),
    secondaryAddress: Yup.object().shape({
      documentImage: Yup.string().when([secondaryAddressFields.line1Field.name], {
        is: (line1) => line1,
        then: Yup.string()
          .required(FIELD_REQUIRED)
          .test('isValidBase64', 'Wrong file type', (value) => isValidUploadForm(value as string)),
      }),
    }),
  }),
})

export default validationSchema
