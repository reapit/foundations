import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'
import { isValidUploadForm } from '@/utils/validates'

const { documentIdField } = formFields

/* istanbul ignore next */
const validationSchema = Yup.object().shape({
  [documentIdField.name]: Yup.string()
    .required(errorMessages.FIELD_REQUIRED)
    .test('isValidBase64', errorMessages.WRONG_FILE_TYPE, (value) => isValidUploadForm(value)),
})

export default validationSchema
