import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'

const { documentIdField } = formFields

/* istanbul ignore next */
const validationSchema = Yup.object().shape({
  [documentIdField.name]: Yup.string().required(errorMessages.FIELD_REQUIRED),
})

export default validationSchema
