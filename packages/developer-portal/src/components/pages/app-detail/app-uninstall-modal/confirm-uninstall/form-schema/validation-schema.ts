import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'

const { FIELD_REQUIRED, MINIMUM_CHARACTER_LENGTH } = errorMessages

const { terminatedReasonField } = formFields

const confirmUninstallValidationSchema = Yup.object().shape({
  [terminatedReasonField.name]: Yup.string().trim().required(FIELD_REQUIRED).min(10, MINIMUM_CHARACTER_LENGTH(10)),
})

export default confirmUninstallValidationSchema
