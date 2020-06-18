import * as Yup from 'yup'
import errorMessages from '@/constants/error-messages'
import { isValidUploadForm } from '@/utils/validates'

/* istanbul ignore next */
const validationSchema = Yup.object().shape({
  metadata: Yup.object().shape({
    primaryAddress: Yup.object().shape({
      documentImage: Yup.string()
        .required(errorMessages.FIELD_REQUIRED)
        .test('isValidBase64', 'Wrong file type', value => isValidUploadForm(value)),
    }),
    secondaryAddress: Yup.object().shape({
      documentImage: Yup.string()
        .required(errorMessages.FIELD_REQUIRED)
        .test('isValidBase64', 'Wrong file type', value => isValidUploadForm(value)),
    }),
  }),
})

export default validationSchema
