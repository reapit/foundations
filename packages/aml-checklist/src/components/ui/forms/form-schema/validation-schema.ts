import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'
import { isValidUploadForm } from '@/utils/validates'

const { documentId } = formFields

/* istanbul ignore next */
const validationSchema = Yup.object().shape({
  [documentId.name]: Yup.string()
    .required(errorMessages.FIELD_REQUIRED)
    .test('isValidBase64', 'Wrong file type', value => isValidUploadForm(value)),
})

export default validationSchema
